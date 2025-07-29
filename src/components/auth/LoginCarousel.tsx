import React from "react";

interface Props {
  activeIndex: number;
  moveSlider: (index: number) => void;
}

const texts = [
  "¡Estamos al aire!",
  "Con niveles de poder",
  "Conociendo a las estrellas",
  "y hecho por mera diversión",
];

export default function LoginCarousel({ activeIndex, moveSlider }: Props) {
  return (
    <div className="carousel">
      <div className="images-wrapper">
        {[1, 2, 3, 4].map(i => (
          <img
            key={i}
            src={`/src/assets/logimg/bk-lg${i}.png`}
            alt={`img${i}`}
            className={`image img-${i} ${activeIndex === i ? "show" : ""}`}
          />
        ))}
      </div>

      <div className="text-slider">
        <div className="text-wrap">
          <div
            className="text-group"
            style={{ transform: `translateY(${-(activeIndex - 1) * 2.2}rem)` }}
          >
            {texts.map((text, idx) => (
              <h2 key={idx}>{text}</h2>
            ))}
          </div>
        </div>

        <div className="bullets">
          {[1, 2, 3, 4].map(i => (
            <span
              key={i}
              data-value={i}
              className={activeIndex === i ? "active" : ""}
              onClick={() => moveSlider(i)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
