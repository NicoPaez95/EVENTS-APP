/**
 * @file Home.jsx
 * @description Routing entry point for the root landing path.
 * Adheres to the strict Thin Page Pattern by delegating all composition and logic to domain hubs.
 * @module pages/Home
 * @author Nico Paez
 */

import React from "react";
import HomeFeedHub from "../../events/features/HomeFeedHub";

/**
 * Home Page Component.
 *
 * This component serves strictly as a declarative layout entry wrapper for the routing tree.
 * Its sole responsibility is placing the unified HomeFeedHub into the global workspace.
 *
 * @component
 * @category Pages
 * @returns {React.JSX.Element} The clean structural shell hosting the main discovery feed.
 */
const Home = () => {
  return <HomeFeedHub />;
};

export default Home;
