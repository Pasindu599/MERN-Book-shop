import { Outlet } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar.jsx";
import MyFooter from "./components/MyFooter.jsx";
import ScrollToTop from "./contexts/ScrollToTop.jsx";

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <MyFooter />
    </>
  );
}

export default App;
