# Core v0 UI Generation Rules

These rules apply when generating UI using tools such as v0 or other AI UI generators.

The generated UI must follow the existing project architecture and design system.

---

# 1. Use Existing Design System

All UI must follow the shared design system.

Before creating new UI elements, check if a reusable component already exists.

Reusable components should come from:

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

Avoid creating custom UI styles if a shared component exists.

---

# 2. Component Usage

Generated UI should use reusable components.

Correct example:

<Button variant="primary" size="md">
Submit
</Button>

Incorrect example:

<button class="bg-blue-500 px-4 py-2 rounded">
Submit
</button>

---

# 3. Component Variants

Use component variants instead of creating new components.

Example:

<Button variant="primary" />
<Button variant="secondary" />
<Button variant="outline" />

Do NOT create separate components such as:

PrimaryButton
MainButton
ActionButton

---

# 4. Layout Structure

Generated UI must follow the layout structure defined in:

components/layout

Examples:

Header
Footer
Container
Section

Avoid generating full layouts inside a single page component.

---

# 5. Feature-Based Structure

UI related to a feature must be placed inside:

features/{feature-name}

Example:

features/reservation

reservation-card.tsx
reservation-form.tsx
calendar.tsx

---

# 6. Avoid Monolithic Pages

Do not generate pages with large inline UI blocks.

Instead:

Split UI into reusable components.

Example:

ReservationPage

ReservationForm
ReservationSummary
TimeSlotSelector

---

# 7. Styling Rules

Use Tailwind classes only when necessary.

Prefer shared UI components instead.

Avoid inline styles.

---

# 8. Consistency Rules

Generated UI must be consistent with:

core-design-system.md
core-component-rules.md
core-project-structure.md

Avoid introducing new UI patterns that conflict with the design system.

---

# 9. Naming Conventions

Component names should be descriptive and consistent.

Examples:

ReservationCard
ExpertCard
TimeSlotSelector

Avoid generic names such as:

Box
Wrapper
Container2

---

# 10. AI Generation Behavior

When generating UI:

1. Reuse existing components
2. Follow project structure
3. Follow the design system
4. Avoid random styling

UI must be modular and maintainable.

<!-- 임시 -->
