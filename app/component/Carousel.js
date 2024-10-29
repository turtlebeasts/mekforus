"use client";
import { useState, useEffect, useRef } from "react";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [endX, setEndX] = useState(0);
  const carouselRef = useRef(null);
  const slides = [
    {
      url: "https://images.ctfassets.net/h6goo9gw1hh6/19lDBaGpVnQjqeKAO9kjZq/5de51aaf085df2d2c012e01da0c9d34a/12-2019-IG-Carousel-FB.jpg",
      alt: "Slide 1",
    },
    {
      url: "https://i.etsystatic.com/14866029/r/il/6def5c/2845473726/il_fullxfull.2845473726_8tke.jpg",
      alt: "Slide 2",
    },
    {
      url: "https://i.etsystatic.com/14866029/r/il/d9ba7f/3146691810/il_fullxfull.3146691810_6yed.jpg",
      alt: "Slide 3",
    },
    {
      url: "https://ganknow.com/blog/wp-content//uploads/2023/08/How-to-Make-Instagram-Carousel-Posts-to-Maximize-Engagement-scaled.webp",
      alt: "Slide 4",
    },
    {
      url: "https://i.pinimg.com/736x/90/e7/1d/90e71db56da44df7b38d77e4c5e07315.jpg",
      alt: "Slide 5",
    },
  ];

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (endX - startX > 50) {
      goToSlide(Math.max(currentIndex - 1, 0));
    } else if (startX - endX > 50) {
      goToSlide(Math.min(currentIndex + 1, slides.length - 1));
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setEndX(e.clientX || e.touches[0].clientX);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (endX - startX > 50) {
      goToSlide(Math.max(currentIndex - 1, 0));
    } else if (startX - endX > 50) {
      goToSlide(Math.min(currentIndex + 1, slides.length - 1));
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      setEndX(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("mousedown", handleMouseDown);
      carousel.addEventListener("mouseup", handleMouseUp);
      carousel.addEventListener("mousemove", handleMouseMove);
      carousel.addEventListener("touchstart", handleTouchStart);
      carousel.addEventListener("touchend", handleTouchEnd);
      carousel.addEventListener("touchmove", handleTouchMove);

      return () => {
        carousel.removeEventListener("mousedown", handleMouseDown);
        carousel.removeEventListener("mouseup", handleMouseUp);
        carousel.removeEventListener("mousemove", handleMouseMove);
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchend", handleTouchEnd);
        carousel.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [isDragging, currentIndex, startX, endX]);

  // Automatic slide change effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [slides.length]);

  return (
    <div
      ref={carouselRef}
      className="relative w-full md:h-96 h-full overflow-hidden"
    >
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full flex justify-center items-center"
          >
            <div className="md:w-2/3 w-full h-2/3 flex items-center justify-center bg-white p-4 shadow-md rounded-lg">
              <img
                src={slide.url}
                alt={slide.alt}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
