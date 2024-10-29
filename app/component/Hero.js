"use client";
import { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const handleScroll = () => {
    // Update the scroll position
    setScrollY(window.scrollY);

    // Calculate the opacity based on scroll position
    const newOpacity = Math.max(1 - window.scrollY / 400, 0); // Adjust 400 for the fade distance
    setOpacity(newOpacity);
  };

  useEffect(() => {
    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Cleanup event listener on unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="hero-section text-center py-40 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed grayscale"
        style={{ backgroundImage: "url('background.png')" }}
      ></div>
      <div className="relative z-10" style={{ opacity: opacity }}>
        <h1 className="md:text-8xl text-6xl font-semibold">
          <ReactTyped
            strings={["MEKFORUS", "ASK", "BUILD", "GROW"]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </h1>
        <p className="text-2xl">
          <ReactTyped strings={["sample text about mekforus"]} typeSpeed={50} />
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-gray-500 text-white py-3 px-6 rounded hover:bg-gray-400 transition">
            action 1
          </button>
          <button className="bg-cyan-700 text-white py-3 px-6 rounded hover:bg-cyan-400 transition">
            action 2
          </button>
        </div>
      </div>
    </div>
  );
}
