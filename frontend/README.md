# 🎟️ Events App

Web application to explore, search, and save events, developed with **React 19** and a scalable, feature-oriented architecture.

This project is part of my practical projects and serves as a foundation for a real-world application, prioritizing organization, maintainability, and best practices.

---

## 🚀 Technologies Used

- **React 19** (Create React App)
- **JavaScript (ES6+)**
- **Context API**
- **Custom Hooks**
- **CSS / UI Components**
- **react-router-dom v6**
- **Git & GitHub**

---

## 📁 Project Structure

The application follows a **feature-based** architecture, separating logic by functional domains:

```

src/
├── App.jsx
├── index.js
├── events/
│   ├── components/
│   └── pages/
├── categories/
│   ├── components/
│   └── pages/
├── search/
│   ├── components/
│   └── pages/
├── user/
│   ├── components/
│   └── pages/
├── shared/
│   ├── components/
│   │   ├── UI/
│   │   ├── Layout/
│   │   └── Navigation/
│   ├── context/
│   ├── hooks/
│   └── util/

````

### 🧠 Advantages of This Architecture
- Scalable
- Easy to maintain
- Clear separation of responsibilities
- Ideal for real-world projects and teams

---

## ✨ Features (In Development)

- 📅 Event listing
- 🔍 Search and filters
- 🗂️ Event categories
- ⭐ Save events
- 👤 User authentication
- 🌦️ Contextual information (e.g., weather)
- 📆 Saved events calendar

---

## 🛠️ Installation and Setup

1. Clone the repository:
```bash
git clone https://github.com/NicoPaez95/EVENTS-APP.git
````

2. Install dependencies:

```bash
npm install
```

3. Run in development mode:

```bash
npm start
```

The application runs at:

```
http://localhost:3000
```

---

## 📌 Technical Notes

* The project uses **React 19** with **react-scripts v5** for modern compatibility.
* All application logic is located inside the `src/` directory.
* The `public/index.html` file serves as the entry point for React.
* Routing uses **react-router-dom v6**, so `Route` components now use `element` instead of `component`.

---

## 🧪 Project Status

🟡 **Actively in development**

Future enhancements will include:

* Advanced routing
* Global state management improvements
* Backend integration
* UX/UI enhancements

---

## 👨‍💻 Author

**Nico Páez**
Full Stack Web Developer, focused on building well-structured applications with purpose and long-term vision.

---

## 📄 License

This project is distributed under the MIT License.

