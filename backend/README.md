# ⚙️ Events App — RESTful API Engine

Monolithic backend service built with **Node.js** and **Express**. It handles data persistence modeling, secure session verification routines, server-side content mapping, and third-party integration layers.

---

## 🏗️ Architectural Pattern: Controllers & Routes

The service utilizes a decoupled layer distribution to separate presentation routing pipelines from core data transformation logic:

```text
backend/
├── routes/       # HTTP Endpoints routing maps (methods declarations)
├── controllers/  # Business logic orchestrators and data resolution pipelines
├── middleware/   # Request interceptors (JWT Token Authentication checking)
└── models/       # Structural schemas and centralized error wrappers
```

---

## 🛠️ Endpoints Directory & Capabilities

- **Authentication Hub** (`/api/users`): Registration, verification login gates, and private session profile tracking.
- **Discovery Engine** (`/api/events`): Catalogs access routines, category parsing, and targeted ID lookups.
- **Environmental Proxies** (`/api/weather`): Real-time geolocation data normalization mappings.

---

## 🚀 Local Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure local variables (create a `.env` file referencing your connection credentials).

3. Populate database seeds (Optional):

   ```bash
   node config/seed-events.js
   ```

4. Fire up the execution script:

   ```bash
   npm run dev
   ```

---
