# Tasks: Full-Stack Todo Application

**Input**: Design documents from `specs/1-fullstack-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL - only include them if explicitly requested in the feature specification. (Not explicitly requested, so general testing is deferred to implementation phase.)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 [P] Create `backend` directory and initialize Python project: `backend/`
- [X] T002 [P] Create `frontend` directory and initialize Next.js project: `frontend/`
- [X] T003 [P] Configure shared `.env` files and Git ignores for `backend` and `frontend`
- [X] T004 [P] Configure basic linting and formatting for Python (ruff, black) in `backend/`
- [X] T005 [P] Configure basic linting and formatting for TypeScript/React (ESLint, Prettier) in `frontend/`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 [P] **Backend**: Implement base SQLModel setup and database connection `backend/src/db.py`, `backend/src/models/base.py`
- [X] T007 [P] **Backend**: Define SQLModel `User` and `Task` models based on `data-model.md` in `backend/src/models/`
- [X] T008 [P] **Backend**: Implement JWT token validation middleware using `BETTER_AUTH_SECRET` in `backend/src/middleware/auth.py`
- [X] T009 [P] **Backend**: Setup FastAPI application instance and basic routing structure for `/api/v1` in `backend/src/main.py`
- [X] T010 [P] **Frontend**: Setup Better Auth integration for signup/signin flows in `frontend/src/lib/auth.ts`
- [X] T011 [P] **Frontend**: Create API client utility for backend communication with JWT inclusion in `frontend/src/lib/api.ts`
- [X] T012 [P] **Frontend**: Implement global error handling strategy based on `FR-012` in `frontend/src/components/common/ErrorHandler.tsx` or similar

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - User Authentication (Priority: P1) 🎯 MVP

**Goal**: Enable users to sign up, sign in, and obtain a JWT for authentication.

**Independent Test**: A user can create an account, log out, log back in, and receive a session token (JWT).

### Implementation for User Story 1

- [X] T013 [US1] **Backend**: Implement user registration endpoint (`POST /api/v1/register`) in `backend/src/api/auth.py`
- [X] T014 [US1] **Backend**: Implement user login endpoint (`POST /api/v1/login`) that issues JWT in `backend/src/api/auth.py`
- [X] T015 [US1] **Frontend**: Create signup UI component in `frontend/src/app/signup/page.tsx`
- [X] T016 [US1] **Frontend**: Create login UI component in `frontend/src/app/login/page.tsx`
- [X] T017 [US1] **Frontend**: Integrate Better Auth sign-up/sign-in flows with backend API `frontend/src/lib/auth.ts`

**Checkpoint**: User Authentication should be fully functional and testable independently

---

## Phase 4: User Story 2 - Task Creation (Priority: P1)

**Goal**: Allow authenticated users to add new tasks to their personal todo list.

**Independent Test**: A logged-in user can create a new task, and it appears in their task list.

### Implementation for User Story 2

- [X] T018 [US2] **Backend**: Implement create task endpoint (`POST /api/v1/{user_id}/tasks`) in `backend/src/api/tasks.py`
- [X] T019 [US2] **Backend**: Add logic to associate new tasks with the authenticated `user_id` from JWT in `backend/src/services/task_service.py`
- [X] T020 [US2] **Frontend**: Create task input form component in `frontend/src/components/tasks/TaskForm.tsx`
- [X] T021 [US2] **Frontend**: Integrate task creation form with backend API via `frontend/src/lib/api.ts`

**Checkpoint**: User Authentication and Task Creation should both work independently

---

## Phase 5: User Story 3 - View Tasks (Priority: P1)

**Goal**: Display a list of tasks for the authenticated user, ensuring user isolation.

**Independent Test**: A logged-in user can see all tasks associated with their account, and only their tasks.

### Implementation for User Story 3

- [X] T022 [US3] **Backend**: Implement list tasks endpoint (`GET /api/v1/{user_id}/tasks`) in `backend/src/api/tasks.py`
- [X] T023 [US3] **Backend**: Add database query filtering to retrieve only tasks belonging to the authenticated `user_id` in `backend/src/services/task_service.py`
- [X] T024 [US3] **Frontend**: Create task list display component in `frontend/src/components/tasks/TaskList.tsx`
- [X] T025 [US3] **Frontend**: Integrate task list display with backend API to fetch user's tasks in `frontend/src/app/dashboard/page.tsx`

**Checkpoint**: User Authentication, Task Creation, and Task Viewing should all work independently

---

## Phase 6: User Story 4 - Update & Complete Tasks (Priority: P2)

**Goal**: Allow authenticated users to modify task details and mark tasks as complete.

**Independent Test**: A logged-in user can change a task's title and toggle its completion status.

### Implementation for User Story 4

- [X] T026 [US4] **Backend**: Implement update task endpoint (`PUT /api/v1/{user_id}/tasks/{id}`) in `backend/src/api/tasks.py`
- [X] T027 [US4] **Backend**: Implement toggle task completion endpoint (`PATCH /api/v1/{user_id}/tasks/{id}/complete`) in `backend/src/api/tasks.py`
- [X] T028 [US4] **Backend**: Add logic to ensure only owner can update tasks in `backend/src/services/task_service.py`
- [X] T029 [US4] **Frontend**: Add edit functionality to `TaskItem` component in `frontend/src/components/tasks/TaskItem.tsx`
- [X] T030 [US4] **Frontend**: Add toggle completion functionality to `TaskItem` component in `frontend/src/components/tasks/TaskItem.tsx`
- [X] T031 [US4] **Frontend**: Integrate update/complete actions with backend API via `frontend/src/lib/api.ts`

**Checkpoint**: All P1 and P2 user stories implemented and functional

---

## Phase 7: User Story 5 - Delete a Task (Priority: P2)

**Goal**: Enable authenticated users to remove tasks from their list.

**Independent Test**: A logged-in user can permanently remove a task from their list.

### Implementation for User Story 5

- [X] T032 [US5] **Backend**: Implement delete task endpoint (`DELETE /api/v1/{user_id}/tasks/{id}`) in `backend/src/api/tasks.py`
- [X] T033 [US5] **Backend**: Add logic to ensure only owner can delete tasks in `backend/src/services/task_service.py`
- [X] T034 [US5] **Frontend**: Add delete functionality to `TaskItem` component in `frontend/src/components/tasks/TaskItem.tsx`
- [X] T035 [US5] **Frontend**: Integrate delete action with backend API via `frontend/src/lib/api.ts`

**Checkpoint**: All user stories should now be independently functional

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T036 [P] **Backend**: Implement comprehensive logging (e.g., using `loguru`) for API requests and errors in `backend/src/main.py`
- [X] T037 [P] **Backend**: Add input validation for all API request bodies using Pydantic in `backend/src/api/` endpoints
- [X] T038 [P] **Frontend**: Refine UI/UX for all task operations, ensuring responsiveness and accessibility in `frontend/src/`
- [X] T039 [P] **Frontend**: Implement client-side form validation for task input fields in `frontend/src/components/tasks/TaskForm.tsx`
- [X] T040 [P] Create `quickstart.md` validation by manually following steps and verifying functionality.
- [X] T041 [P] Review all documentation (`spec.md`, `plan.md`, `data-model.md`, `api.yaml`, `quickstart.md`) for consistency and completeness.

---

## Dependencies & Execution Order

### Phase Dependencies

-   **Setup (Phase 1)**: No dependencies - can start immediately
-   **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
-   **User Stories (Phase 3-7)**: All depend on Foundational phase completion
    -   User stories can then proceed in parallel (if staffed)
    -   Or sequentially in priority order (P1 → P2 → P3)
-   **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

-   **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
-   **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
-   **User Story 3 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
-   **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable
-   **User Story 5 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3/US4 but should be independently testable

### Within Each User Story

-   Models before services
-   Services before endpoints
-   Core implementation before integration
-   Story complete before moving to next priority

### Parallel Opportunities

-   All Setup tasks marked [P] can run in parallel
-   All Foundational tasks marked [P] can run in parallel (within Phase 2)
-   Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
-   All tasks within a user story marked [P] can run in parallel if they operate on different files/components without direct dependencies.

---

## Implementation Strategy

### MVP First (User Story 1, 2, 3)

1.  Complete Phase 1: Setup
2.  Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3.  Complete Phase 3: User Story 1
4.  Complete Phase 4: User Story 2
5.  Complete Phase 5: User Story 3
6.  **STOP and VALIDATE**: Test User Stories 1, 2, and 3 independently.
7.  Deploy/demo if ready.

### Incremental Delivery

1.  Complete Setup + Foundational → Foundation ready
2.  Add User Story 1 → Test independently → Deploy/Demo
3.  Add User Story 2 → Test independently → Deploy/Demo
4.  Add User Story 3 → Test independently → Deploy/Demo
5.  Add User Story 4 → Test independently → Deploy/Demo
6.  Add User Story 5 → Test independently → Deploy/Demo
7.  Each story adds value without breaking previous stories.

### Parallel Team Strategy

With multiple developers:

1.  Team completes Setup + Foundational together.
2.  Once Foundational is done:
    -   Developer A: User Story 1 (Authentication)
    -   Developer B: User Story 2 (Task Creation)
    -   Developer C: User Story 3 (View Tasks)
    -   Developer D: User Story 4 (Update & Complete)
    -   Developer E: User Story 5 (Delete Task)
3.  Stories complete and integrate independently.

---

## Notes

-   [P] tasks = different files, no dependencies
-   [Story] label maps task to specific user story for traceability
-   Each user story should be independently completable and testable
-   Commit after each task or logical group
-   Stop at any checkpoint to validate story independently
-   Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
-   **Important**: For all frontend UI implementation tasks, strictly use the `frontend-design` skill.
-   **Important**: For applying any themes or styling to the frontend, strictly use the `theme-factory` skill.
