# Core Design System Rules

All UI must follow the shared design system.

---

# 1. Reusable UI Components

Reusable components must be placed in:

components/ui

Examples:

Button
Input
Select
Textarea
Card
Modal
Badge
Tabs
Dropdown
Avatar

---

# 2. Component Usage

Prefer reusable components instead of raw Tailwind styles.

Correct example:

<Button variant="primary" size="md">
Submit
</Button>

Incorrect example:

<button class="bg-blue-500 px-4 py-2 rounded">
Submit
</button>

---

# 3. Component API Pattern

Reusable components should follow a consistent prop pattern.

Example:

<Button variant="primary" size="md" />

Common props:

variant
size
state

---

# 4. Design Tokens

UI should follow shared tokens such as:

colors
spacing
radius
typography

Tokens should be stored in:

lib/design-tokens.ts

---

# 5. Consistency

Avoid creating multiple versions of the same UI element.

Incorrect:

PrimaryButton
MainButton
ActionButton

Correct:

<Button variant="primary" />
