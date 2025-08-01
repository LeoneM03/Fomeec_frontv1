import React, { useState, useEffect } from "react";

import img1 from "../../assets/logimg/bk-lg1.png";
import img2 from "../../assets/logimg/bk-lg2.png";
import img3 from "../../assets/logimg/bk-lg3.png";
import img4 from "../../assets/logimg/bk-lg4.png";

const textItems = [
  "¡Estamos al aire!",
  "Con niveles de poder",
  "Conociendo a las estrellas",
  "y hecho por mera diversión",
];

const images = [img1, img2, img3, img4];

const LoginCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // cada 4 segundos

    return () => clearInterval(interval);
  }, []);

  const handleBulletClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel">
      <div className="images-wrapper">
        {images.map((imgSrc, index) => (
          <img
            key={index}
            src={imgSrc}
            className={`image img-${index + 1} ${activeIndex === index ? "show" : ""}`}
            alt={`Imagen ${index + 1}`}
            draggable={false}
          />
        ))}
      </div>

      <div className="text-slider">
        <div className="text-wrap">
          <div
            className="text-group"
            style={{ transform: `translateY(${-activeIndex * 2.2}rem)` }}
          >
            {textItems.map((text, i) => (
              <h2 key={i}>{text}</h2>
            ))}
          </div>
        </div>

        <div className="bullets">
          {images.map((_, idx) => (
            <span
              key={idx}
              className={activeIndex === idx ? "active" : ""}
              data-value={idx}
              onClick={() => handleBulletClick(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginCarousel;
