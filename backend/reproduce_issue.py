from __future__ import annotations
from sqlmodel import SQLModel, Field
from typing import Optional

print("Imported SQLModel")

class User(SQLModel, table=True):
    user_id: str = Field(primary_key=True)
    email: str = Field(unique=True, index=True)
    name: Optional[str] = None
    
print("Defined User")
