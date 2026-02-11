import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Events from './events/pages/Events';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
