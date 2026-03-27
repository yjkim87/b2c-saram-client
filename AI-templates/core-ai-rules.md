# Core AI Development Rules

These rules apply to all projects that use AI tools such as ChatGPT, v0, Codex, or Claude.

All generated code must follow these rules.

---

# 1. Tech Stack (Default)

Framework: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS

---

# 2. Architecture Principles

Use component-based architecture.

Keep UI, logic, and state management separated.

Avoid large monolithic components.

Prefer reusable components.

---

# 3. Code Organization

Code should follow the project structure rules defined in:

core-project-structure.md

UI should follow the design system rules defined in:

core-design-system.md

Component patterns must follow:

core-component-rules.md

---

# 4. State Management

State logic should not be tightly coupled to page components.

Prefer:

Custom React Hooks
Context
Store (when needed)

---

# 5. Code Quality

Keep files small and focused.

Extract reusable logic into hooks.

Avoid duplicate UI or logic.

---

# 6. TypeScript

All components must include proper types.

Types should be stored in:

types/

---

# 7. AI Code Generation Behavior

Before generating code:

1. Follow the design system
2. Follow the project structure
3. Reuse existing components

Avoid generating random patterns or styles.
