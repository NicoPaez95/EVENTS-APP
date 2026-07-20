# Application Architecture

## 📌 Overview

This application follows a **Domain-Driven Feature Architecture** designed to simulate high-level frontend engineering practices. It prioritizes scalability, strict documentation via JSDoc, and a clear separation between business logic and UI presentation.

The structure is designed to support:

- **Domain Isolation**: Logic is grouped by business area (Events, User, Cart).
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
├── cart/      # Shopping cart features, contexts, and handlers
├── events/    # Core Event Domain logic, maps, and UI components
├── i18n/      # Internationalization hooks and multi-language locales
├── user/      # User Domain (Profiles, Auth, Saved Events History)
├── pages/     # Route entry points (Home, Auth, Profile, Cart)
├── shared/    # Cross-domain reusable infrastructure and UI tokens
├── router/    # Centralized declarative routing system
└── App.jsx    # Application root & composition layer
```

---

## 🏷 Feature Module Pattern

Each domain (e.g., `events/`) implements a vertical internal structure:

```text
domain-folder/
├── components/ # Atomic, presentational UI
├── context/    # Domain-specific global state (e.g., EventsContext)
├── features/   # Business-use-case composition layer
├── hooks/      # Domain logic (Custom Hooks)
├── services/   # Data access layer & API communication
├── utils/      # Pure business functions
├── data/       # Domain-specific mock data / Fallbacks
└── README.md   # Domain technical documentation
```

### Layer Responsibilities

#### 🔹 components/

Purely presentational components.

- Receive data via `props`.
- Do not consume global contexts directly.
- Styled using Tailwind CSS utility classes.

#### 🔹 features/

Intermediate composition layer (Smart Containers).

- Combines multiple components to solve a specific use case (e.g., `EventsFeature` orchestrates header and grids).
- Encapsulates complex UI logic and asynchronous execution lifecycles.
- Acts as a bridge between data contexts/hooks and visualization.

#### 🔹 services/

Data Access Layer (DAL).

- Abstracts network communication (`fetch` / HTTP clients).
- Handles sanitization, formatting, and structural data normalization before the data enters the application flow.

#### 🔹 hooks/ & utils/

The application's engine.

- **Hooks** manage local state, functional effects, and context subscriptions.
- **Utils** contain pure logic (filtering, autocomplete suggestions) that is easy to test.

---

## 🔹 Shared Layer

The `shared/` layer acts as the project's infrastructure foundation:

```text
shared/
├── components/
│   ├── UI/         # Design System Primitives (Button, Card, Modal, EmptyState)
│   ├── Layout/     # Structural components (HomeLayout, Sidebar)
│   └── guards/     # Navigation route interception and security logic
├── context/        # Cross-domain global state (e.g., Global Auth, Weather)
├── hooks/          # Generic reusable hooks (useWeather, useAuth)
└── util/           # Global helpers (dateHelpers, validators)
```

---

## 🔄 Data Flow Strategy

```text
API Server -> Service Layer (Sanitization) -> Domain Context (State) -> Smart Feature -> Presentation UI
```

---

## 🧠 Routing & Layout Strategy

Navigation is centralized in `src/router/AppRouter.jsx` using **React Router v6**.

- **Layout Nesting**: `shared/components/Layout/HomeLayout` is used to wrap routes consistently.
- **Route Isolation**: Pages in `src/pages/` act as simple containers that inject the necessary **Features** based on the active route.

---

## 📈 Quality & Linting

The project uses a strict **ESLint** configuration with the `jsdoc` plugin to ensure:

1. **Redundancy Reduction**: `prop-types` are disabled in favor of JSDoc documentation.
2. **Type Safety**: JSDoc `typescript` mode is enabled to support complex types like `JSX.Element` and entity schemas.
3. **Maintainability**: Descriptions for parameters and return values are mandatory for critical functions.

---

## 🔮 Planned Evolution

- **Advanced Data Caching**: Implementation of tools like SWR or React Query inside the service layer to optimize client-side revalidation loops.
- **Code Splitting**: Implementation of `React.lazy()` per route to optimize the initial bundle payload.
- **Comprehensive Error Boundaries**: Declarative React Error Boundary wrappers around isolating smart features to gracefully catch unexpected runtime UI failures without crashing the entire layout thread.

---

## 🏁 Final Note

This architecture prioritizes **long-term maintainability**. It reflects an engineering mindset where code not only works but is organized to be scaled, refactored, and understood by other developers without technical debt.
