# 🚀 Events App — Full-Stack Experience Platform

Welcome to **Events App**, a high-performance, modular web application designed to simulate a scalable event discovery, ticketing, and localization platform.

This repository showcases advanced frontend architecture practices, atomic design layouts, structured state management, and a robust micro-service API layers.

---

## 📂 Repository Structure

The project is strictly separated into two decoupled environments:

- **`backend/`**: Node.js & Express service handling user session management, event catalogs, token-based verification, and real-time weather integration.
- **`frontend/`**: React application featuring a Domain-Driven Feature Architecture, multi-language internationalization, customized design tokens, and optimized caching lifecycles.

---

## 🏎️ Quick Start (Local Monolith Execution)

To spin up the entire ecosystem concurrently, you need to initialize both layers:

### 1. Backend Service Initialization

```bash
cd backend
npm install
npm run dev
```

_The server will boot at `http://localhost:5000` with automated hot-reloading (Nodemon)._

### 2. Frontend Application Initialization

```bash
cd ../frontend
npm install
npm run start
```

_The development bundle engine will initialize at `http://localhost:3000`._

---

## ⚙️ Key System Capabilities

- **Domain Isolation**: Structural separation between core areas (`events`, `user`, `cart`).
- **Dynamic Localization**: Full `i18n` support with inline runtime language toggling.
- **Atomic UI Tokenization**: Style guides unifications using customized semantic variables inside Tailwind.
- **Resilient Context Flows**: Secure local persistence workflows for carts, favorites, and secure state handling.

---
