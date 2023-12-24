"use client";
import React from "react";
import { useState, useEffect } from "react";

function Navbar() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      // if scroll down hide the navbar
      setShow(false);
    } else {
      // if scroll up show the navbar
      setShow(true);
    }

    // remember current page location to use in the next move
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);

    // cleanup function
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={
        "fixed top-0 left-0 w-full bg-orange-600 text-white p-4 z-50 " +
        (show
          ? // ? "opacity-90 transition-opacity duration-300 ease-in-out delay-75 backdrop-blur-xl"
            lastScrollY > 10
            ? "opacity-90 transition-opacity duration-300 ease-in-out delay-75 backdrop-blur-xl"
            : "opacity-100 transition-opacity duration-300 ease-in-out delay-75"
          : "opacity-0 transition-opacity duration-300 ease-in-out delay-75")
      }
    >
      <div className="flex justify-between px-12 box-border items-center">
        <div className="">
          <a href="/" className="text-white text-2xl font-bold">
            Logo
          </a>
        </div>
        <div className="flex items-center box-border gap-x-3 text-white text-sm font-light">
          <a
            href="/work"
            className="border-b-4 border-transparent hover:border-white p-1"
          >
            Work
          </a>
          <a
            href="/about"
            className="border-b-4 border-transparent hover:border-white p-1"
          >
            About
          </a>
          <a
            href="/services"
            className="border-b-4 border-transparent hover:border-white p-1"
          >
            Services
          </a>
          <a
            href="/ideas"
            className="border-b-4 border-transparent hover:border-white p-1"
          >
            Ideas
          </a>
          <a
            href="/careers"
            className="border-b-4 border-transparent hover:border-white p-1"
          >
            Careers
          </a>
          <a
            href="/contact"
            className="border-b-4 border-transparent hover:border-white p-1"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
