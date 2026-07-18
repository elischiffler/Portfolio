import { useState, useEffect } from 'react';
import './Crossfade.css';

/**
 * Crossfade — cycles through an array of images with an opacity fade.
 * @param {Array}  images        - Array of { src, alt, contain? }
 * @param {number} interval      - Ms between transitions (default 3500)
 * @param {string} className     - Extra class on the wrapper
 */
const Crossfade = ({ images = [], interval = 3500, className = '' }) => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(
      () => setActive((i) => (i + 1) % images.length),
      interval
    );
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (!images.length) return null;

  return (
    <div className={`crossfade ${className}`}>
      {images.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={[
            'crossfade-img',
            img.contain ? 'crossfade-img--contain' : '',
            i === active ? 'crossfade-img--visible' : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
      ))}
    </div>
  );
};

export default Crossfade;
