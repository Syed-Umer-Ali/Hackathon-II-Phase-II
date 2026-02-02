# Research Findings: Full-Stack Todo Application

**Date**: 2026-02-02
**Feature**: Full-Stack Todo Application (spec: `specs/1-fullstack-todo-app/spec.md`)
**Plan**: `specs/1-fullstack-todo-app/plan.md`

## 1. Best Practices for FastAPI with SQLModel and Neon DB

### Decision
Utilize SQLModel for ORM, managing sessions with FastAPI's `Depends` for dependency injection. Leverage Neon's serverless capabilities by ensuring efficient connection pooling and short-lived transactions.

### Rationale
SQLModel provides a powerful, type-safe way to interact with SQL databases, integrating seamlessly with FastAPI's Pydantic models. FastAPI's dependency injection system (`Depends`) is ideal for managing database sessions, ensuring they are properly closed. Neon Serverless PostgreSQL benefits from connection pooling and transactional integrity to minimize cold starts and optimize resource usage.

### Alternatives Considered
-   **SQLAlchemy Core**: More verbose, less type-safe than SQLModel.
-   **Raw psycopg2**: Lacks ORM benefits, prone to SQL injection without careful handling.

## 2. Next.js 16 App Router with Tailwind CSS Best Practices

### Decision
Adopt Server Components where possible for initial page loads and static content. Use Client Components for interactive UI elements. Implement a robust global state management solution (e.g., React Context API or Zustand/Jotai for larger needs) and use Tailwind CSS for all styling.

### Rationale
App Router's Server Components enhance performance by rendering on the server, reducing client-side JavaScript. Client Components provide interactivity. Tailwind CSS offers a utility-first approach for rapid and consistent styling.

### Alternatives Considered
-   **Pages Router**: Older Next.js routing, less performant for Server-Side Rendering.
-   **CSS Modules/Styled Components**: Can be more cumbersome for styling compared to utility-first Tailwind.

## 3. Integrating Better Auth with Next.js and FastAPI (JWT)

### Decision
Frontend (Next.js) will store JWTs securely (e.g., HTTP-only cookies or secure local storage). Backend (FastAPI) will implement a `Security` dependency (using `Depends`) to extract and validate JWTs from the `Authorization: Bearer` header against the shared `BETTER_AUTH_SECRET`. User `sub` claim will directly map to `user_id`.

### Rationale
HTTP-only cookies prevent client-side JavaScript access to tokens, mitigating XSS attacks. FastAPI's `Security` dependencies abstract JWT validation logic, promoting clean and reusable code. Direct `sub` claim mapping simplifies user identification and aligns with previous clarification.

### Alternatives Considered
-   **Session-based auth**: Less scalable for distributed systems.
-   **Storing JWTs in local storage**: Vulnerable to XSS attacks.

## 4. Monorepo Setup for Next.js and FastAPI

### Decision
Organize the project with `frontend/` and `backend/` directories at the root. Use npm/yarn workspaces (or pnpm) for shared dependencies if needed, but keep the core applications separate for distinct deployment. `.env` files will manage environment-specific configurations for each application.

### Rationale
This structure aligns with the Hackathon requirements and provides clear separation of concerns. While advanced monorepo tools like Turborepo can be beneficial, for this MVP, simple workspace management is sufficient.

### Alternatives Considered
-   **Separate repositories**: Introduces overhead for managing code changes across services.
-   **More complex monorepo tools (e.g., Turborepo)**: Overkill for an MVP with two primary applications.
