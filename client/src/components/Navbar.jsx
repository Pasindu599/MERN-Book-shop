import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { FaBarsStaggered, FaBlog, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../contexts/AuthProvider";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const { user } = useContext(AuthContext);

  // toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // nav items
  const navItems = [
    { link: "Home", path: "/" },
    { link: "Shop", path: "/shop" },
    { link: "About", path: "/about" },
    { link: "Sell Your Products", path: "/admin/dashboard/" },
  ];

  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300">
      <nav
        className={`py-4 lg:px-24 px-4 ${
          isSticky ? "sticky top-0 left-0 right-0 bg-orange-300  " : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <Link
            to="/"
            className="text-2xl font-bold text-orange-700 flex items-center gap-2 "
          >
            <FaBlog className="inline-block" />
            YardSale
          </Link>
          {/* for large devices -- nav items */}
          <ul className="md:flex space-x-12 hidden ">
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-base text-black uppercase cursor-pointer hover:text-orange-700"
              >
                {link}
              </Link>
            ))}
          </ul>

          <div className="space-x-12 hidden lg:flex items-center">
            <button className="md:hidden">
              <FaBarsStaggered className="w-5 hover:text-orange-700" />
            </button>
            <Link
              to={user ? "/logout" : "/login"}
              className="text-black hover:text-orange-700"
            >
              <button className="bg-orange-700 text-white px-4 py-2 rounded-lg">
                {user ? "Logout" : "Login"}
              </button>
            </Link>
          </div>

          {/* menu buuton for mobile */}

          <div className="md:hidden ">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isMenuOpen ? (
                <FaXmark className="h-5 w-5 text-black" />
              ) : (
                <FaBarsStaggered className="h-5 w-5 text-black" />
              )}
            </button>
          </div>

          {/* nav item for mobile */}
          <div
            className={`space-y-4 px-4 mt-16 py-7 bg-orange-700 ${
              isMenuOpen ? "block fixed top-0 right-0 left-0 " : "hidden"
            }`}
          >
            {navItems.map(({ link, path }) => (
              <Link
                key={path}
                to={path}
                className="block text-base text-white uppercase cursor-pointer hover:text-orange-700"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
