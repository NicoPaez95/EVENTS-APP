import AppRouter from './router/AppRouter';

/**
 * Root Application Component.
 * * This is the entry point of the React component tree.
 * * It delegates all navigation and routing logic to the 
 * AppRouter component to maintain a clean and modular architecture.
 * * @component
 * @returns {JSX.Element} The rendered application router.
 */
function App() {
  return <AppRouter />;
}

export default App;