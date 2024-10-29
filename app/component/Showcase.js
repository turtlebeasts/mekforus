"use client";
import { useEffect, useRef, useState } from "react";

function ShowcaseItem({ color, isVisible }) {
  return (
    <div
      className={`text-center py-44 ${color} transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h1 className="text-4xl">Showcase Item</h1>
      <p className="text-xl font-light">
        {color} <br />
        description and text
      </p>
      <button className="bg-gray-500 text-white py-3 px-6 rounded hover:bg-gray-400 transition mt-2">
        action 1
      </button>
    </div>
  );
}

export default function Showcase() {
  const [visibleItems, setVisibleItems] = useState([
    false,
    false,
    false,
    false,
  ]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px",
      threshold: 0.1, // Trigger when 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = itemRefs.current.indexOf(entry.target);
        if (entry.isIntersecting && index !== -1) {
          setVisibleItems((prev) => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
          observer.unobserve(entry.target); // Stop observing after it's visible
        }
      });
    }, options);

    itemRefs.current.forEach((item) => {
      if (item) observer.observe(item); // Start observing each item
    });

    return () => {
      itemRefs.current.forEach((item) => {
        if (item) observer.unobserve(item); // Cleanup observer on unmount
      });
    };
  }, []);

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
      {["bg-gray-300", "bg-gray-700", "bg-rose-300", "bg-red-800"].map(
        (color, index) => (
          <div key={index} ref={(el) => (itemRefs.current[index] = el)}>
            <ShowcaseItem color={color} isVisible={visibleItems[index]} />
          </div>
        )
      )}
    </div>
  );
}
