import BlurText from '../components/BlurText/BlurText';
import './Work.css';

const Work = () => (
  <div className="work">
    <div className="title">
      <BlurText
        text="Work Experience"
        delay={30}
        animateBy="letters"
        direction="top"
        className="text-2xl mb-4"
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
            text="Quantum Engineering Intern"
            delay={30}
            animateBy="letters"
            direction="top"
          />
        </div>

        <div className="work-description">
          <BlurText
            text="I focused on the precise alignment of optical systems used for trapping and cooling barium ions. This task required significant attention to detail when managing laser beam paths to maintain experimental stability. I also specialized in the optimization of optical fibers and achieved an efficiency of 80 percent through a rigorous process of trial and error. Daily collaboration with doctoral researchers provided opportunities to troubleshoot technical issues and enhance the performance of the quantum hardware."
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
