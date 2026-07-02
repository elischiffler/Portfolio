import { FaBriefcase } from 'react-icons/fa';
import './Work.css';

const Work = () => (
  <section className="work">
    {/* Header */}
    <div className="work-header">
      <h1 className="work-section-title">
        Work Experience
        <FaBriefcase className="work-header-icon" aria-hidden="true" />
      </h1>
      <div className="work-header-line" />
    </div>

    {/* Entry — Sandia National Laboratories */}
    <div className="work-entries">
      <div className="work-item">
        <img
          src="/images/SandiaLaser.jpg"
          alt="Laser optics system at Sandia National Laboratories"
          className="work-image"
        />

        <div className="work-text">
          <h2 className="work-title">Sandia National Laboratories</h2>
          <p className="work-subtitle">Quantum Engineering Intern</p>
          <p className="work-date">Summer 2024 · Albuquerque, NM</p>
          <p className="work-description">
            Focused on the precise alignment of optical systems used for
            trapping and cooling barium ions. Managed laser beam paths to
            maintain experimental stability and specialized in optimization of
            optical fibers, achieving 80% efficiency. Collaborated daily with
            doctoral researchers to troubleshoot technical issues and enhance
            quantum hardware performance.
          </p>
          <p className="work-skills">
            Optics · Ion Trapping · Laser Alignment · Optical Fiber Coupling ·
            Data Analysis · Beam Path Optimization
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Work;
