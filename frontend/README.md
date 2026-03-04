# 🎟️ Events App

A scalable event exploration web application built with **React 19** and a modular feature-based architecture.

This project simulates a real-world event platform (similar to ticketing platforms), focusing on:

- Clean architecture
- Domain isolation
- Scalability
- Maintainability
- Production-ready structure

---

## 🚀 Technologies Used

- React 19
- react-router-dom v6
- Context API
- Custom Hooks
- TailwindCSS
- Swiper (carousel system)
- JavaScript (ES6+)
- Create React App (react-scripts v5)

---

## 📁 Project Structure

```

src/
├── App.jsx
├── index.js
├── router/
│   └── AppRouter.jsx
├── events/
│   ├── components/
│   ├── data/
│   ├── features/
│   ├── pages/
│   └── README.md
├── home/
├── user/
├── shared/

````

---

## 🧠 Architecture Highlights

- Feature-driven modular structure
- Sub-feature composition inside domains
- Shared design system layer
- Context-based state management
- Clean routing separation
- Prepared for backend integration

---

## ✨ Current Features

### Events Domain

- Event grid
- Event detail view
- Featured events carousel (Swiper)
- Recommended events
- Upcoming events
- Category filtering
- Search functionality
- Weather widget integration (mock-based)

### User Domain

- Authentication (mock-based)
- Profile page
- Saved events calendar

---

## 🔄 Data Strategy

Currently using mock data inside feature folders.

Future transition plan:

- Replace mocks with API services
- Add service layer per feature
- Improve state normalization

---

## 🛠️ Installation

```bash
git clone https://github.com/NicoPaez95/EVENTS-APP.git
cd frontend
npm install
npm start
````

Runs at:

```
http://localhost:3000
```

---

## 📈 Project Status

🟡 Actively evolving toward production-level architecture.

Next planned upgrades:

* Backend integration
* Authentication refinement
* Event booking logic
* Payment system integration
* Lazy loading
* Performance optimization

---

## 👨‍💻 Author

**Nico Páez**
Full Stack Developer focused on scalable and well-structured applications.

---

## 📄 License

MIT License