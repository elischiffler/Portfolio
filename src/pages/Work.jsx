import BlurText from "../components/BlurText/BlurText";
import "./Work.css";

const Work = () => (
  <div className="work">
    <div className="title">
      <BlurText
        text="Work Experience"
        delay={30}
        animateBy="letters"
        direction="top"
        className="text-2xl mb-8"
      />
    </div>
    <div className="work-item">
      <div className="carousel auto-carousel">
        <div className="carousel-track">
          <img
            src="/images/Quantum1.png"
            alt="Journey Genie Screenshot 1"
            className="work-image"
          />
          <img
            src="/images/Quantum2.png"
            alt="Journey Genie Screenshot 2"
            className="work-image"
          />
          <img
            src="/images/Quantum3.png"
            alt="Journey Genie Screenshot 3"
            className="work-image"
          />
          <img
            src="/images/Quantum4.png"
            alt="Journey Genie Screenshot 4"
            className="work-image"
          />
          <img
            src="/images/Quantum1.png"
            alt="Journey Genie Screenshot 1"
            className="work-image"
          />
          <img
            src="/images/Quantum2.png"
            alt="Journey Genie Screenshot 2"
            className="work-image"
          />
          <img
            src="/images/Quantum3.png"
            alt="Journey Genie Screenshot 3"
            className="work-image"
          />
          <img
            src="/images/Quantum4.png"
            alt="Journey Genie Screenshot 4"
            className="work-image"
          />
        </div>
      </div>
      <div className="work-text">
        <div className="work-title">
          <BlurText
            text="Quantum Intern"
            delay={30}
            animateBy="letters"
            direction="top"
          />
        </div>

        <div className="work-description">
          <BlurText
            text="Collaborated with researchers to design and align intricate laser beam paths used to trap and cool individual ions, a critical step for scalable quantum computing experiments at Sandia National Labs. Gained practical experience in maintaining optical stability, adjusting mirror mounts, and ensuring beam coherence through complex setups."
            delay={30}
            animateBy="words"
            direction="top"
          />
          <BlurText
            text="Skills: Optics • Ion Trapping • Laser Alignment • Quantum Physics • Experimental Design"
            delay={30}
            animateBy="words"
            direction="top"
          />
        </div>
      </div>
    </div>
  </div>
);

export default Work;
