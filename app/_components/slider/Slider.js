"use client";

import { useState, useEffect } from "react";
import "./Slider.css";

const images = ["/banner1.png", "/banner2.png", "/banner3.png"];

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]); // Restart timer when image changes

  return (
    <div className="slider">
      <div className="slider-container">
        <button className="nav-button left" onClick={prevSlide}>
          ❮
        </button>

        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="slider-image"
        />

        <button className="nav-button right" onClick={nextSlide}>
          ❯
        </button>

        <div className="slider-indicators">
          {images.map((_, index) => (
            <span
              key={index}
              className={`indicator ${index === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;
