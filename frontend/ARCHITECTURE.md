# Application Architecture

## 📌 Overview

This application follows a **Domain-Driven Feature Architecture** designed to simulate high-level frontend engineering practices. It prioritizes scalability, strict documentation via JSDoc, and a clear separation between business logic and UI presentation.

The structure is designed to support:
- **Domain Isolation**: Logic is grouped by business area (Events, User).
- **Sub-feature Composition**: Complex UI sections are built as independent features.
- **Intelligent Documentation**: Enforced JSDoc standards for IDE-level type safety.
- **Production-level Scalability**: Ready for backend integration and state management growth.

---

## 🧱 Architectural Principles

- **Separation of Concerns**: UI components are decoupled from business logic.
- **Unidirectional Data Flow**: Explicit and predictable state propagation.
- **Feature Encapsulation**: Each domain contains its own hooks, utils, and data.
- **Shared Abstraction**: Reusable design tokens and logic reside in a centralized shared layer.
- **Scalability-first**: Independent growth of modules without tight coupling.

---

## 📂 High-Level Structure

```text
src/
├── events/    # Core Event Domain logic and UI
├── user/      # User Domain (Profiles, Saved Events)
├── pages/     # Route entry points (Home, Auth, Profile)
├── shared/    # Cross-domain reusable abstractions
├── router/    # Centralized routing system
└── App.jsx    # Application root & composition layer

```

---

## 🏷 Feature Module Pattern

Each domain (e.g., `events/`) implements a vertical internal structure:

```text
domain-folder/
├── components/ # Atomic, presentational UI
├── features/   # Business-use-case composition layer
├── hooks/      # Domain logic (Custom Hooks)
├── utils/      # Pure business functions
├── data/       # Domain-specific mock data
└── README.md   # Domain technical documentation

```

### Layer Responsibilities

#### 🔹 components/

Purely presentational components.

* Receive data via `props`.
* Do not consume global contexts directly.
* Styled using Tailwind CSS utility classes.

#### 🔹 features/

Intermediate composition layer.

* Combines multiple components to solve a specific use case (e.g., `EventDiscovery` orchestrates search and grid).
* Encapsulates complex UI logic.
* Acts as a bridge between data hooks and visualization.

#### 🔹 hooks/ & utils/

The application's engine.

* **Hooks** manage local state, effects, and context subscriptions.
* **Utils** contain pure logic (filtering, suggestions) that is easy to test.

---

## 🔹 Shared Layer

The `shared/` layer acts as the project's infrastructure foundation:

```text
shared/
├── components/
│   ├── UI/         # Design System (Button, Card, Modal)
│   ├── Layout/     # Structural components (HomeLayout, Sidebar)
│   └── Navigation/ # Navigation logic (Navbars)
├── context/        # Global state (AuthContext, EventsContext)
├── hooks/          # Generic reusable hooks (useWeather, useAuth)
└── util/           # Global helpers (dateHelpers, validators)

```

---

## 🔄 Data Flow Strategy

### Current (Mock-Driven)

```text
Mock Data -> Domain Hook -> Feature Component -> Presentation UI

```

### Future (Service-Ready)

```text
API Service -> Domain Hook (SWR/Query) -> Feature Component -> UI

```

---

## 🧠 Routing & Layout Strategy

Navigation is centralized in `src/router/AppRouter.jsx` using **React Router v6**.

* **Layout Nesting**: `shared/components/Layout/HomeLayout` is used to wrap routes consistently.
* **Route Isolation**: Pages in `src/pages/` act as simple containers that inject the necessary **Features** based on the route.

---

## 📈 Quality & Linting

The project uses a strict **ESLint** configuration with the `jsdoc` plugin to ensure:

1. **Redundancy Reduction**: `prop-types` are disabled in favor of JSDoc documentation.
2. **Type Safety**: JSDoc `typescript` mode is enabled to support complex types like `JSX.Element`.
3. **Maintainability**: Descriptions for parameters and return values are mandatory for critical functions.

---

## 🔮 Planned Evolution

* **Service Layer**: Abstraction of `fetch/axios` calls within each domain.
* **Code Splitting**: Implementation of `React.lazy()` per route to optimize the initial bundle.
* **State Normalization**: Refinement of Context data structures to prevent unnecessary re-renders.
* **Error Boundaries**: Feature-level error catching to improve UI resilience.

---

## 🏁 Final Note

This architecture prioritizes **long-term maintainability**. It reflects an engineering mindset where code not only works but is organized to be scaled and understood by other developers without technical debt.
