import { useLoginCarousel } from '../../hooks/useLoginCarousel';

export default function LoginCarousel() {
  const { activeIndex, setSlide } = useLoginCarousel();

  return (
    <div className="carousel">
      <div className="images-wrapper">
        {[1, 2, 3, 4].map(i => (
          <img
            key={i}
            src={`/src/assets/logimg/bk-lg${i}.png`}
            alt={`img${i}`}
            className={`image img-${i} ${activeIndex === i ? 'show' : ''}`}
          />
        ))}
      </div>

      <div className="text-slider">
        <div className="text-wrap">
          <div
            className="text-group"
            style={{ transform: `translateY(${-(activeIndex - 1) * 2.2}rem)` }}
          >
            <h2>¡Estamos al aire!</h2>
            <h2>Con niveles de poder</h2>
            <h2>Conociendo a las estrellas</h2>
            <h2>y hecho por mera diversión</h2>
          </div>
        </div>

        <div className="bullets">
          {[1, 2, 3, 4].map(i => (
            <span
              key={i}
              data-value={i}
              className={activeIndex === i ? 'active' : ''}
              onClick={() => setSlide(i)}
              style={{ cursor: 'pointer' }}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}