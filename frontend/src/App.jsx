// ===============================
// Root Application Component
// -------------------------------
// Configures global routing using
// React Router v6.
//
// All feature entry points are defined here.
// ===============================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Events from './events/pages/Events';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Events />} />

          {/* Fallback route for unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
