import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { auth, logout } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "py-3 bg-white/90 backdrop-blur-lg shadow-sm" : "py-5 bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-edu-dark font-poppins">EduLearnX</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {!(auth?.user?.role === "instructor") && (
              <Link
                to="/courses"
                className="text-edu-dark/80 hover:text-edu-primary transition-colors duration-300 font-medium"
              >
                Courses
              </Link>
            )}
            {auth.authenticate && !(auth?.user?.role === "instructor") && (
              <Link
                to="/my-learning"
                className="text-edu-dark/80 hover:text-edu-primary transition-colors duration-300 font-medium"
              >
                My Learning
              </Link>
            )}
            <Link
              to="/about"
              className="text-edu-dark/80 hover:text-edu-primary transition-colors duration-300 font-medium"
            >
              About
            </Link>

          </div>

          <div className="hidden md:flex items-center space-x-4">
            {auth.authenticate ? (
              <Button
                onClick={logout}
                className="rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="rounded-full border-edu-primary text-edu-primary hover:bg-edu-primary/10 transition-all duration-300"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="rounded-full bg-edu-primary text-white hover:bg-edu-primary/90 transition-all duration-300">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-edu-dark hover:bg-edu-secondary/10 transition-all duration-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 bg-white/95 backdrop-blur-lg shadow-lg rounded-b-xl">
          {!(auth?.user?.role === "instructor") && (
            <Link
              to="/courses"
              className="block px-4 py-3 rounded-lg text-base font-medium text-edu-dark hover:bg-edu-secondary/10 transition-all duration-300"
            >
              Courses
            </Link>
          )}
          {auth && !(auth?.user?.role === "instructor") && (
            <Link
              to="/my-learning"
              className="block px-4 py-3 rounded-lg text-base font-medium text-edu-dark hover:bg-edu-secondary/10 transition-all duration-300"
            >
              My Learning
            </Link>
          )}
          <Link
            to="/about"
            className="block px-4 py-3 rounded-lg text-base font-medium text-edu-dark hover:bg-edu-secondary/10 transition-all duration-300"
          >
            About
          </Link>

          <div className="pt-4 pb-3 border-t border-gray-100">
            {auth.authenticate ? (
              <Button
                onClick={logout}
                className="w-full rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </Button>
            ) : (
              <>
                <Link to="/login" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full rounded-full border-edu-primary text-edu-primary hover:bg-edu-primary/10 transition-all duration-300"
                  >
                    Log in
                  </Button>
                </Link>
                <Link to="/signup" className="w-full mt-3">
                  <Button className="w-full rounded-full bg-edu-primary text-white hover:bg-edu-primary/90 transition-all duration-300">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar