import { useState, useEffect } from 'react';
import Stack from '../components/Stack/Stack';
import MusicPlayer from '../components/MusicPlayer/MusicPlayer';
import { FaUser } from 'react-icons/fa';
import './AboutMe.css';

function useCardDimensions() {
  const calc = () => {
    const vw = window.innerWidth;
    // Mobile: use smaller cards that fit the stacked layout
    const width =
      vw <= 768
        ? Math.min(Math.max(vw * 0.35, 160), 220)
        : Math.min(Math.max(vw * 0.18, 200), 280);
    const height = width * 1.32;
    return { width: Math.round(width), height: Math.round(height) };
  };

  const [dims, setDims] = useState(calc);

  useEffect(() => {
    const handleResize = () => setDims(calc());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dims;
}

const AboutMe = () => {
  const cardDimensions = useCardDimensions();
  const images = [
    { id: 1, img: '/images/AboutMe1.png' },
    { id: 2, img: '/images/AboutMe2.png' },
    { id: 3, img: '/images/AboutMe3.png' },
    { id: 4, img: '/images/AboutMe4.png' },
    { id: 5, img: '/images/AboutMe5.png' },
    { id: 6, img: '/images/AboutMe6.png' },
    { id: 7, img: '/images/AboutMe7.png' },
    { id: 8, img: '/images/AboutMe8.png' },
  ];

  return (
    <div className="about-page">
      <div className="page-header">
        <h1 className="page-title">
          About Me
          <FaUser className="page-header-icon" aria-hidden="true" />
        </h1>
        <div className="page-header-line" />
      </div>

      <div className="about-body">
        <div className="picture-container">
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={false}
            cardDimensions={cardDimensions}
            cardsData={images}
          />
        </div>

        <div className="text-container">
          <div className="description">
            <p>
              Hey, I'm Eli, a software engineer and CS student at Cal Poly, San
              Luis Obispo. I love building things that people actually use, and
              I'm always exploring the newest AI technologies to see what's
              possible next.
            </p>
            <p>
              I spent a semester studying abroad in Barcelona, which turned into
              months of traveling all over Europe. That experience shaped how I
              think about design, culture, and just being open to the
              unfamiliar.
            </p>
            <p>
              When I'm not coding, I'm producing music on Ableton, DJing for
              friends, wakesurfing during Minnesota summers, or just spending
              time with the people I care about.
            </p>
          </div>

          <MusicPlayer />
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
