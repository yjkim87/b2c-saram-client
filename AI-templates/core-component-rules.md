# Core Component Rules

Components should be organized into three categories.

---

# 1. UI Components

Reusable visual components.

Location:

components/ui

Examples:

Button
Input
Card
Modal
Badge

---

# 2. Feature Components

Components specific to a feature.

Location:

features/{feature-name}

Example:

features/reservation/reservation-form.tsx

---

# 3. Layout Components

Components that structure pages.

Location:

components/layout

Examples:

Header
Footer
Container
Section

---

# 4. Component Size

Avoid overly large components.

Split components if they contain:

Too much UI
Too much logic
Too many responsibilities

---

# 5. Props Design

Components should have clear and predictable props.

Example:

<Button variant="primary" size="md" />
