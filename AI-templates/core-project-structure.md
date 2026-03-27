# Core Project Structure

All projects should follow a feature-based architecture.

---

# Root Structure

app/
components/
features/
hooks/
services/
types/
lib/
styles/

---

# Folder Responsibilities

app/
Next.js routes and pages

components/
shared components

components/ui
reusable UI components

components/layout
layout components

features/
feature-based modules

hooks/
custom React hooks

services/
API and data fetching logic

types/
TypeScript type definitions

lib/
utility functions and tokens

styles/
global styles

---

# Feature Module Example

features/reservation

reservation-form.tsx
reservation-card.tsx
useReservation.ts
reservation-service.ts
reservation-types.ts

---

# Page Responsibilities

Pages should focus on:

layout
data fetching
feature composition

Avoid placing complex UI logic directly inside pages.
