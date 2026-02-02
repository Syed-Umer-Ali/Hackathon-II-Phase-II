---
id: 3
title: Specify Fullstack Todo Application
stage: spec
date: 2026-02-02
surface: "agent"
model: "Gemini"
feature: "fullstack-todo-app"
branch: "1-fullstack-todo-app"
user: "user"
command: "/sp.specify"
labels: [specification, feature, todo-app]
links:
  spec: "specs/1-fullstack-todo-app/spec.md"
  ticket: "null"
  adr: "null"
  pr: "null"
files:
  - specs/1-fullstack-todo-app/spec.md
  - specs/1-fullstack-todo-app/checklists/requirements.md
tests:
  - "none"
---

## Prompt

/sp.specify Using the Spec-Driven Development approach, generate the following specifications and then implement the code using Claude Code: Core Features (The App): Implement the 5 Basic Level features: Add, Delete, Update, View, and Mark Complete. The UI must be a responsive Next.js frontend using Tailwind CSS. Backend & Persistence: Build a FastAPI server using SQLModel to interact with a Neon Serverless PostgreSQL database. Ensure all task data is persistent and not in-memory. The Logic of User Isolation: Integrate Better Auth with a JWT plugin. Every API request must include a JWT token in the header, and the backend must verify this token using a shared BETTER_AUTH_SECRET. Critical Requirement: The API must be filtered so that a user can only see and modify their own tasks. Ensure the user_id from the token matches the user_id in the task records. Deliverables: Create the /frontend (Next.js), /backend (FastAPI), and /specs (Markdown files) directories as defined in the Hackathon requirements. Execute this by first creating the specs, then the database models, then the API endpoints, and finally the frontend UI..

## Response snapshot

The specification `specs/1-fullstack-todo-app/spec.md` and the associated `requirements.md` checklist have been successfully created. The feature branch `1-fullstack-todo-app` was also created. The specification details the core features, technical stack, authentication, and user isolation requirements for the full-stack todo application.

## Outcome

- ✅ Impact: A detailed specification and checklist for the full-stack todo application have been created, setting the foundation for the next development phase.
- 🧪 Tests: N/A
- 📁 Files: `spec.md` and `requirements.md` created in `specs/1-fullstack-todo-app/`.
- 🔁 Next prompts: User is ready to proceed with `/sp.plan` for technical planning.
- 🧠 Reflection: Successfully parsed a complex feature description and translated it into a structured, validated specification. Handled manual creation of branch and directories due to script limitations.

## Evaluation notes (flywheel)

- Failure modes observed: Shell script `create-new-feature.sh` could not be executed directly, requiring manual Git and directory operations.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): N/A
- Next experiment: N/A
