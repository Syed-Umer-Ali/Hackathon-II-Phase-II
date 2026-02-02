<!--
Sync Impact Report:
- Version Change: None -> 1.0.0
- Description: Initial creation of the project constitution based on user-defined principles.
- Added Principles:
  - I. Spec-Driven Governance
  - II. Technical Stack Enforcement
  - III. Security & User Isolation
  - IV. Monorepo Structure
  - V. API Standards
- Added Sections:
  - Definition of Done
  - Governance
- Templates Checked:
  - .specify/templates/plan-template.md (✅ No changes needed)
  - .specify/templates/spec-template.md (✅ No changes needed)
  - .specify/templates/tasks-template.md (✅ No changes needed)
-->
# Todo App Hackathon II Constitution

## Core Principles

### I. Spec-Driven Governance
No implementation code is permitted unless a Markdown specification exists in the `/specs` directory. Every feature specification MUST start with a 'User Story' and 'Acceptance Criteria'.

### II. Technical Stack Enforcement
The project MUST adhere to the following technical stack:
- **Frontend**: Next.js 16 (App Router), TypeScript, and Tailwind CSS.
- **Backend**: Python FastAPI with SQLModel ORM.
- **Database**: Neon Serverless PostgreSQL.

### III. Security & User Isolation
- **Authentication Provider**: Better Auth MUST be the designated authentication provider.
- **Security Layer**: A JWT-based security layer MUST be implemented. The FastAPI backend is required to verify tokens using a shared secret (`BETTER_AUTH_SECRET`).
- **Data Access**: All API endpoints and database queries MUST be designed to ensure users can only access their own data (tasks).

### IV. Monorepo Structure
The project MUST enforce the Spec-Kit folder structure, including:
- `/specs`: For all specification documents.
- `/frontend`: For the Next.js application.
- `/backend`: For the FastAPI application.
Each sub-directory (`/frontend`, `/backend`) MUST have its own `GEMINI.md` file to provide local context for the Gemini CLI agent.

### V. API Standards
All RESTful API endpoints MUST follow the `/api/{user_id}/tasks` pattern. Every request to these endpoints MUST include a valid `Authorization: Bearer <token>` header for authentication and authorization.

## Definition of Done

A feature or task is considered "Done" only when:
- It meets all acceptance criteria defined in its corresponding `/specs` file.
- It is fully compliant with all principles outlined in this constitution.
- All required tests (unit, integration) have been written and are passing.
- The implementation has been reviewed and approved.
- All related documentation has been updated.

## Governance

This Constitution is the authoritative source of governance for this project and supersedes all other practices. Amendments require a formal review, approval, and a documented migration plan. All development activities and code reviews MUST verify compliance with these principles.

**Version**: 1.0.0 | **Ratified**: 2026-02-02 | **Last Amended**: 