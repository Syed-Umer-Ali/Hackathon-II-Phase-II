# Quickstart Guide: Full-Stack Todo Application

**Date**: 2026-02-02
**Feature**: Full-Stack Todo Application (spec: `specs/1-fullstack-todo-app/spec.md`)
**Plan**: `specs/1-fullstack-todo-app/plan.md`

This guide provides instructions to quickly set up and run the Full-Stack Todo Application locally.

## Prerequisites

-   Python 3.12+ (managed via `uv`)
-   `uv` package manager
-   Node.js (LTS)
-   npm or yarn
-   Docker (for local database setup, optional, or use Neon DB directly)
-   Git
-   Access to a Neon Serverless PostgreSQL database (or local PostgreSQL instance)
-   A `BETTER_AUTH_SECRET` environment variable for JWT validation.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone [REPOSITORY_URL]
    cd [REPOSITORY_NAME]
    git checkout 1-fullstack-todo-app
    ```

2.  **Backend Setup (FastAPI):**
    ```powershell
    cd backend
    
    # 1. Install Python 3.12 and create virtual environment
    uv python install 3.12
    uv venv

    # 2. Install dependencies
    uv pip install -r requirements.txt
    
    # 3. Configure environment variables
    # Ensure you have a .env file with DATABASE_URL and BETTER_AUTH_SECRET
    
    # 4. Start the Server
    uv run uvicorn src.main:app --reload --port 8000
    ```
    The backend API will be available at `http://localhost:8000/api/v1`.

3.  **Frontend Setup (Next.js):**
    ```bash
    cd frontend
    npm install # or yarn install
    
    # Configure environment variables
    # Create a .env.local file:
    # NEXT_PUBLIC_BACKEND_URL="http://localhost:8000/api/v1"
    # NEXT_PUBLIC_BETTER_AUTH_CLIENT_ID="your_better_auth_client_id" # If applicable
    
    npm run dev
    ```
    The frontend application will be available at `http://localhost:3000`.

## Using the Application

1.  **Sign Up/Log In:** Access the frontend, create a new user account, and log in.
2.  **Manage Tasks:** Use the application's interface to add, view, update, complete, and delete your tasks.
3.  **API Access:** You can interact with the API directly using tools like Postman or curl, ensuring to include the JWT token in the `Authorization: Bearer <token>` header for authenticated requests.
