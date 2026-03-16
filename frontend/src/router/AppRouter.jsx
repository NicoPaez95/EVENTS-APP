import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import EventDetailPage from '../pages/events/EventDetailPage';


/**
 * Main Application Router.
 * * Centralizes the navigation logic using React Router v6.
 * * It wraps the application in a BrowserRouter and defines 
 * the mapping between URLs and Page components.
 * * @component
 * @returns {JSX.Element} The routing tree with defined paths and fallbacks.
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Entry Point: Home Page */}
        <Route path="/" element={<Home/>} />
        <Route path="/events/:id" element={<EventDetailPage/>}/>
        {/*<Route path="/category/:categoryName" element={<CategoryPage/>}/>*/}
        {/* * Wildcard Route (*): 
          * Redirects any unknown or undefined path back to the Home page 
          * to prevent 404 broken UI states.
        */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;