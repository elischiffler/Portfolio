import './Work.css';

const Work = () => (
  <div className="work">
    <p className="page-title">Work Experience</p>

    <div className="work-item">
      <div className="auto-carousel">
        <div className="carousel-track">
          <img src="/images/Quantum1.png" alt="Sandia quantum lab 1" />
          <img src="/images/Quantum2.png" alt="Sandia quantum lab 2" />
          <img src="/images/Quantum3.png" alt="Sandia quantum lab 3" />
          <img src="/images/Quantum4.png" alt="Sandia quantum lab 4" />
          <img src="/images/Quantum1.png" alt="Sandia quantum lab 1" />
          <img src="/images/Quantum2.png" alt="Sandia quantum lab 2" />
          <img src="/images/Quantum3.png" alt="Sandia quantum lab 3" />
          <img src="/images/Quantum4.png" alt="Sandia quantum lab 4" />
        </div>
      </div>

      <div className="work-text">
        <h2 className="work-title">Sandia National Laboratories</h2>
        <p className="work-subtitle">Quantum Engineering Intern</p>
        <p className="work-description">
          Focused on the precise alignment of optical systems used for trapping
          and cooling barium ions. Managed laser beam paths to maintain
          experimental stability and specialized in optimization of optical
          fibers, achieving 80% efficiency. Collaborated daily with doctoral
          researchers to troubleshoot technical issues and enhance quantum
          hardware performance.
        </p>
        <p className="work-skills">
          Optics · Ion Trapping · Laser Alignment · Quantum Physics ·
          Experimental Design
        </p>
      </div>
    </div>
  </div>
);

export default Work;
