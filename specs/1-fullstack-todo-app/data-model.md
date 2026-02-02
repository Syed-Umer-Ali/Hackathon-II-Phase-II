# Data Model: Full-Stack Todo Application

**Date**: 2026-02-02
**Feature**: Full-Stack Todo Application (spec: `specs/1-fullstack-todo-app/spec.md`)
**Plan**: `specs/1-fullstack-todo-app/plan.md`

## Entities

### 1. User

Represents an authenticated user of the application. This entity is primarily managed by Better Auth, with its unique identifier (`user_id`) being crucial for associating tasks.

-   **Attributes:**
    -   `user_id`: String (Primary Key, derived from JWT `sub` claim). Unique identifier for the user.
    -   `email`: String (Unique). User's email address.
    -   `name`: String (Optional). User's display name.
    -   `created_at`: Datetime. Timestamp of user creation.
    -   `updated_at`: Datetime. Timestamp of last update.

-   **Relationships:**
    -   One-to-many with `Task` (a User can have many Tasks).

-   **Validation Rules:**
    -   `user_id` MUST be provided and unique (managed by Better Auth).
    -   `email` MUST be a valid email format and unique.

### 2. Task

Represents a single todo item belonging to a user.

-   **Attributes:**
    -   `id`: Integer (Primary Key, Auto-increment). Unique identifier for the task.
    -   `user_id`: String (Foreign Key -> User.user_id). Identifies the owner of the task.
    -   `title`: String (Required, max 200 characters). A brief description of the task.
    -   `description`: Text (Optional, max 1000 characters). Detailed description of the task.
    -   `completed`: Boolean (Default: `false`). Indicates if the task is finished.
    -   `created_at`: Datetime. Timestamp of task creation.
    -   `updated_at`: Datetime. Timestamp of last update.

-   **Relationships:**
    -   Many-to-one with `User` (many Tasks belong to one User).

-   **Validation Rules:**
    -   `title` MUST be provided and between 1 and 200 characters.
    -   `user_id` MUST correspond to an existing User.
    -   `description` max 1000 characters.
