# 🎟️ Events App

A scalable event exploration web application built with **React 19** and a modular feature-based architecture.

This project simulates a real-world event platform (similar to ticketing platforms), focusing on clean architecture, domain isolation, and production-ready standards.

---

## 🚀 Technologies Used

- **React 19** (Latest features & concurrent rendering)
- **React Router v6** (Centralized routing & layout nesting)
- **TailwindCSS** (Utility-first styling & JIT engine)
- **PostCSS & Autoprefixer** (Cross-browser CSS processing)
- **Swiper** (Modern touch slider for featured events)
- **ESLint & JSDoc** (Enforced code quality and intelligent documentation)
- **JavaScript (ES6+)**
- **Create React App** (react-scripts v5)

---

## 📁 Project Structure

```text
src/
├── events/              # Events Domain (Core)
│   ├── components/      # Pure presentational UI components
│   ├── data/            # Mock data sources (Source of truth)
│   ├── features/        # Business logic & sub-feature composition
│   ├── hooks/           # Domain-specific logic (useEvents, useAutocomplete)
│   └── utils/           # Filtering, suggestions, and business helpers
├── shared/              # Cross-domain reusable logic
│   ├── components/      # UI Kit & Layouts
│   │   ├── Layout/      # HomeLayout, Sidebar
│   │   ├── Navigation/  # Navbars, Links
│   │   └── UI/          # Atomic components (Button, Card, Modal)
│   ├── context/         # Global state (AuthContext, EventsContext)
│   ├── hooks/           # Reusable generic hooks (useAuth, useWeather)
│   └── util/            # Global helpers (dateHelpers, validators)
├── pages/               # Route-level entry points
│   ├── home/            # Home page composition
│   └── user/            # Auth and Profile pages
├── user/                # User Domain specific components
│   └── components/      # SavedEventsCalendar, etc.
├── router/              # AppRouter configuration
├── App.jsx              # Application root
└── index.js             # Entry point

```

---

## 🧠 Architecture Highlights

* **Domain-Driven Modularization**: Isolation of concerns between `events`, `user`, and `shared` layers.
* **Feature Module Pattern**: Separation between atomic components and orchestrated business features.
* **Shared Design System**: Centralized UI primitives and layouts to ensure visual consistency.
* **Strict JSDoc Enforcement**: Full IDE intellisense and type-safety simulation without TypeScript overhead.
* **Facade Hook Pattern**: Complex logic encapsulation via custom hooks for clean component interfaces.

---

## ✨ Current Features

### Events Domain

* **Event Discovery**: Dynamic grid with multi-criteria filtering.
* **Featured Carousel**: High-impact promotional slider.
* **Smart Search**: Real-time autocomplete for titles, categories, and locations.
* **Weather Integration**: Local environmental data widget.
* **Upcoming & Recommended**: Curated sidebars for event discovery.

### User Domain

* **Auth Infrastructure**: Prepared for login and session management.
* **Personalized Calendar**: Visualization of saved events for the user.

---

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone [https://github.com/NicoPaez95/EVENTS-APP.git](https://github.com/NicoPaez95/EVENTS-APP.git)

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start

```

Runs at: `http://localhost:3000`

---

## 📈 Project Status & Roadmap

🟡 **Current Status**: Finalizing modular architecture and full documentation.

**Next Planned Upgrades:**

* [ ] Backend integration (Node.js/Express or Firebase)
* [ ] Performance optimization (Lazy loading & Code splitting)
* [ ] Booking and Payment system integration
* [ ] Advanced state normalization

---

## 👨‍💻 Author

**Nico Páez**
Full Stack Developer focused on scalable and well-structured applications.

---

## 📄 License

MIT License

