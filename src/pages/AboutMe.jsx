import Beams from '../components/Backgrounds/Beams/Beams';
import Stack from '../components/Stack/Stack';
import BlurText from '../components/BlurText/BlurText';
import './AboutMe.css';

const AboutMe = () => {
  const images = [
    { id: 1, img: "/images/AboutMe1.png" },
    { id: 2, img: "/images/AboutMe2.png" },
    { id: 3, img: "/images/AboutMe3.png" },
    { id: 4, img: "/images/AboutMe4.png" }
  ];

  return (
    <div className="about-page">
      <div className="beams-container">
        <Beams
          beamWidth={2}
          beamHeight={15}
          beamNumber={12}
          lightColor="#93a6c0"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={0}
        />
      </div>
      <div className="about-content">
        <div className="picture-container">
          <Stack
            randomRotation={true}
            sensitivity={180}
            sendToBackOnClick={false}
            cardDimensions={{ width: 300, height: 400 }}
            cardsData={images}
          />
        </div>
        <div className="text-container">
          <div className="title">
            <BlurText
              text="About Me"
              delay={150}
              animateBy="letters"
              direction="top"
              className="text-2xl mb-8"
            />
          </div>
          <div className="description">
            <BlurText
              text="Hi, I’m Eli Schiffler. I’m from Minnesota and currently earning my Bachelor’s in Computer Science at Cal Poly."
              delay={50}
              animateBy="words"
              direction="top"
            />
            <BlurText
              text="I’m passionate about technology and aim to build a career as a software engineer with a focus on quantum computing."
              delay={100}
              animateBy="words"
              direction="top"
            />
            <BlurText
              text="Outside of tech, I love to travel, produce music, spend time on the water, and hit the gym."
              delay={150}
              animateBy="words"
              direction="top"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;