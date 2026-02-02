---
id: 1
title: Establish Project Constitution
stage: constitution
date: 2026-02-02
surface: "agent"
model: "Gemini"
feature: "none"
branch: "main"
user: "user"
command: "/sp.constitution"
labels: [governance, setup]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - .specify/memory/constitution.md
tests:
  - "none"
---

## Prompt

/sp.constitution This file must strictly enforce the following mandates:

Spec-Driven Governance: No implementation code is permitted unless a Markdown specification exists in the /specs directory. Every feature must start with a 'User Story' and 'Acceptance Criteria'.

Technical Stack Enforcement:

Frontend: Next.js 16 (App Router), TypeScript, and Tailwind CSS.

Backend: Python FastAPI with SQLModel ORM.

Database: Neon Serverless PostgreSQL.

Security & User Isolation: Better Auth must be the auth provider. You must implement a JWT-based security layer where the FastAPI backend verifies tokens using a shared secret (BETTER_AUTH_SECRET) to ensure users can only access their own tasks.

Monorepo Structure: Enforce the Spec-Kit folder structure: /specs, /frontend, and /backend. Each sub-directory must have its own CLAUDE.md for local context.

API Standards: All endpoints must follow the /api/{user_id}/tasks pattern and require a valid Authorization: Bearer <token> header.

Write this Constitution in a clear, professional, and binding tone. It should include a 'Definition of Done' section to ensure quality control."

## Response snapshot

The project constitution was successfully created and written to `.specify/memory/constitution.md` as version 1.0.0. It includes principles for Spec-Driven Governance, Technical Stack, Security, Monorepo Structure, and API Standards, along with a 'Definition of Done' section.

## Outcome

- ✅ Impact: The project now has a foundational governance document.
- 🧪 Tests: N/A
- 📁 Files: 1 file created/modified.
- 🔁 Next prompts: The user can now proceed with other commands like `/sp.specify`.
- 🧠 Reflection: The initial attempt to use the bash script failed due to the environment. The fallback to the native agent method was successful.

## Evaluation notes (flywheel)

- Failure modes observed: Shell command failed due to missing `bash` executable.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment: N/A
