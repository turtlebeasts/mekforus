"use client";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex justify-center">
      <div className="hidden md:inline-grid text-center grid-cols-7 gap-4 items-center font-semibold">
        <img src="IMG_2678 1.png" alt="Logo" />
        <h1>HOME</h1>
        <h1>PROFILE</h1>
        <h1>SERVICES</h1>
        <h1>PRODUCTS</h1>
        <h1>CAREER</h1>
        <h1>SUPPORT</h1>
      </div>
      <div className="md:hidden flex items-center justify-end self-end w-full pr-4">
        <button onClick={toggleMenu} className="text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      <div
        className={`fixed inset-0 bg-black text-white flex flex-col justify-center items-center text-2xl space-y-8 font-semibold z-50 transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h1 onClick={toggleMenu}>HOME</h1>
        <h1 onClick={toggleMenu}>PROFILE</h1>
        <h1 onClick={toggleMenu}>SERVICES</h1>
        <h1 onClick={toggleMenu}>PRODUCTS</h1>
        <h1 onClick={toggleMenu}>CAREER</h1>
        <h1 onClick={toggleMenu}>SUPPORT</h1>
      </div>
    </div>
  );
}
