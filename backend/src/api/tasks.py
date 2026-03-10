# backend/src/api/tasks.py
from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime
from sqlmodel import select
from ..models.base import Task, User
from ..db import get_session
from ..middleware.auth import get_current_user
from pydantic import BaseModel
from typing import List
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter()

class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    priority: str | None = "low"

class TaskUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None
    priority: str | None = None
    completed_at: datetime | None = None

@router.post("/{user_id}/tasks", response_model=Task, status_code=status.HTTP_201_CREATED)
async def create_task(
    user_id: str,
    task_data: TaskCreate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if user_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to create tasks for this user")

    new_task = Task(
        title=task_data.title,
        description=task_data.description,
        priority=task_data.priority or "low",
        user_id=current_user.user_id,
    )
    
    session.add(new_task)
    await session.commit()
    await session.refresh(new_task)
    
    return new_task

@router.get("/{user_id}/tasks", response_model=List[Task])
async def list_tasks(
    user_id: str,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if user_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to list tasks for this user")

    result = await session.exec(select(Task).where(Task.user_id == current_user.user_id))
    tasks = result.all()
    return tasks

@router.put("/{user_id}/tasks/{task_id}", response_model=Task)
async def update_task(
    user_id: str,
    task_id: int,
    task_data: TaskUpdate,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if user_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update tasks for this user")

    result = await session.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.user_id))
    task = result.first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    task_update_data = task_data.model_dump(exclude_unset=True)
    for key, value in task_update_data.items():
        setattr(task, key, value)
    
    session.add(task)
    await session.commit()
    await session.refresh(task)
    
    return task

@router.patch("/{user_id}/tasks/{task_id}/complete", response_model=Task)
async def toggle_task_completion(
    user_id: str,
    task_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if user_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update tasks for this user")

    result = await session.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.user_id))
    task = result.first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    task.completed = not task.completed
    task.completed_at = datetime.utcnow() if task.completed else None
    
    session.add(task)
    await session.commit()
    await session.refresh(task)
    
    return task

@router.delete("/{user_id}/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_task(
    user_id: str,
    task_id: int,
    session: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    if user_id != current_user.user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete tasks for this user")

    result = await session.exec(select(Task).where(Task.id == task_id, Task.user_id == current_user.user_id))
    task = result.first()
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")

    await session.delete(task)
    await session.commit()
    
    return


