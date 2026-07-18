import Stack from '../components/Stack/Stack';
import { FaUser } from 'react-icons/fa';
import './AboutMe.css';

const AboutMe = () => {
  const images = [
    { id: 1, img: '/images/AboutMe1.png' },
    { id: 2, img: '/images/AboutMe2.png' },
    { id: 3, img: '/images/AboutMe3.png' },
    { id: 4, img: '/images/AboutMe4.png' },
    { id: 5, img: '/images/AboutMe5.png' },
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
            cardDimensions={{ width: 280, height: 370 }}
            cardsData={images}
          />
        </div>

        <div className="text-container">
          <div className="description">
            <p>
              I am Eli Schiffler, a Computer Science student at California
              Polytechnic State University and President of the Cal Poly Quantum
              Computing Club.
            </p>
            <p>
              My background includes a Quantum Engineering internship at Sandia
              National Laboratories and building full-stack applications for the
              local community.
            </p>
            <p>
              When I am not developing software or exploring quantum systems, I
              spend my time producing music, traveling, and staying active at
              the gym.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
