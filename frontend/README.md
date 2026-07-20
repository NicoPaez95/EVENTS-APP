# 💻 Events App — Frontend Client

This is the presentational and client-side engineering hub of the application. Built on top of **React** and **Tailwind CSS**, it simulates a large-scale enterprise structure focusing on performance, modular component compositions, and clean decoupling guidelines.

---

## 🧱 Architectural Foundation

The source codebase shifts away from flat technical groupings, enforcing a **Domain-Driven Vertical Slices Pattern**.

For an in-depth technical analysis of data flows, rendering strategies, layout nested structures, and ESLint typing guardrails, please review our comprehensive architectural brief:

👉 **[Read the Full ARCHITECTURE.md Specification](./ARCHITECTURE.md)**

---

## 📂 Internal Directory Layout

```text
src/
├── cart/      # Shopping cart domain features, context wrappers, and state logic
├── events/    # Core event management, discovery matrices, maps, and carousels
├── user/      # Authentication workflows, profile states, and saved history
├── pages/     # Flat React-Router route views and feature injection endpoints
├── shared/    # System infrastructure foundation (Atomic Design Tokens, global contexts)
└── router/    # Centralized declarative application router tree
```

---

## 🎨 Quality & Documentation Standards

- **Self-Documented Intention**: Enforced **JSDoc TypeScript Mode** annotations across all smart features, custom hooks, and utility layers to provide IDE type safety without runtime performance costs.
- **Tailwind Design Tokens**: Standardized interfaces utilizing local design primitives (`danger`, `secondary-border`, custom utilities) rather than arbitrary color styles.

---
