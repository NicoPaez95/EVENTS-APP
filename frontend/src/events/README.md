# Events Domain

## 📌 Overview

The Events domain is the core of the application. It encapsulates all business logic, data management, and UI compositions related to event discovery and interaction.

It is designed using a **Vertical Slicing** approach, allowing this specific domain to grow, be tested, and be refactored without affecting other parts of the system.

---

## 📂 Internal Structure

```text
events/
├── components/ # Presentational UI units
├── features/   # Business logic composition layer
├── hooks/      # Domain-specific state & logic (useEvents, etc.)
├── utils/      # Pure helper functions (filtering, suggestions)
├── data/       # Domain mock data & schemas
└── README.md   # Domain documentation

```

---

## 🔹 Architecture Layers

### 1. components/

Pure presentational components.

* **Examples**: `EventCard`, `CategoryCard`, `WeatherWidget`, `SearchBar`.
* **Constraint**: They are "dumb" components; they receive data via props and emit events via callbacks.

### 2. features/

The composition layer where business use-cases come to life.

* **Examples**: `EventDiscovery`, `FeaturedEvents`, `WeatherFeature`.
* **Responsibility**: They orchestrate multiple components and connect them to domain hooks.

### 3. hooks/ & utils/

The functional engine of the domain.

* **hooks/**: Manage local state and side effects (e.g., `useAutocomplete` logic).
* **utils/**: Contain pure functions like `filterEvents.js`, which are decoupled from React and easy to unit test.

---

## 🔹 Key Domain Components

| Component | Responsibility |
| --- | --- |
| **EventDiscovery** | Main orchestration feature for searching and browsing events. |
| **FeaturedEvents** | High-level feature managing the promotional carousel. |
| **SearchBar** | Complex UI input handling autocomplete and multi-criteria filters. |
| **WeatherWidget** | Environmental data display integrated within the event flow. |

---

## 🔄 Data Flow (Current Implementation)

The domain currently follows a **Unidirectional Data Flow** assisted by documented mocks:

```text
data/*.mock.js (Source) 
   └── hooks/useEvents (Data Access)
       └── features/* (Orchestration)
           └── components/* (UI Rendering)

```

---

## 🔮 Roadmap & Improvements

* **API Integration**: Transition from `data/*.mock.js` to an asynchronous Service Layer.
* **Advanced Filtering**: Implementation of price ranges, geo-location, and complex date sorting.
* **Persistence**: Integration with local storage or a backend for "favoriting" events.
* **Unit Testing**: 100% coverage for `utils/filterEvents.js` and domain hooks.

---

## 🎯 Design Goal

The Events domain is built to simulate a high-traffic production platform, prioritizing **encapsulation**, **strict documentation via JSDoc**, and **architectural clarity**.
