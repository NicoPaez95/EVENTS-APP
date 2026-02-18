// ===============================
// Root Application Component
// -------------------------------
// Acts as the top-level component
// of the application.
//
// - Delegates all routing logic
//   to AppRouter.
// - Keeps this file clean and
//   architecture-focused.
// - Ensures a single routing source.
// ===============================

import AppRouter from './router/AppRouter';

function App() {
  return <AppRouter />;
}

export default App;
