import { FaBriefcase } from 'react-icons/fa';
import Crossfade from '../components/Crossfade/Crossfade';
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

    {/* Entries */}
    <div className="work-entries">
      {/* Entry — Robert Half */}
      <div className="work-item">
        <Crossfade
          images={[
            {
              src: '/images/work/ProtivitiHome.png',
              alt: 'Protiviti verification portal — landing screen',
              contain: true,
            },
            {
              src: '/images/work/ProtivitiQRCode.png',
              alt: 'Protiviti verification portal — QR code scan step',
              contain: true,
            },
            {
              src: '/images/work/ProtivitiSuccess.png',
              alt: 'Protiviti verification portal — identity verified',
              contain: true,
            },
            {
              src: '/images/work/RobertHalfHome.png',
              alt: 'Robert Half verification portal — landing screen',
              contain: true,
            },
            {
              src: '/images/work/RobertHalfQRCode.png',
              alt: 'Robert Half verification portal — QR code scan step',
              contain: true,
            },
            {
              src: '/images/work/RobertHalfFailed.png',
              alt: 'Robert Half verification portal — verification failed state',
              contain: true,
            },
          ]}
          interval={3000}
          className="work-crossfade"
        />

        <div className="work-text">
          <h2 className="work-title">Robert Half</h2>
          <p className="work-subtitle">Software Engineering Intern</p>
          <p className="work-date">Summer 2025 · Remote</p>
          <p className="work-description">
            Built an employee verification portal serving both Robert Half and
            Protiviti with dynamic brand switching and full internationalization
            support. Implemented Microsoft Entra ID authentication, designed
            responsive HTML/CSS interfaces for mobile and desktop, and wrote
            thorough Jest tests against production-quality,
            single-responsibility code. Delivered an end-to-end CI/CD pipeline
            in Azure DevOps and deployed the application to AWS Lightsail using
            Node.js.
          </p>
          <p className="work-skills">
            Node.js · AWS Lightsail · Azure DevOps · Microsoft Entra ID ·
            HTML/CSS · CI/CD · Jest
          </p>
        </div>
      </div>

      <div className="work-entry-divider" />

      {/* Entry — Sandia National Laboratories */}
      <div className="work-item">
        <Crossfade
          images={[
            {
              src: '/images/work/SandiaLaser.jpg',
              alt: 'Laser optics system at Sandia National Laboratories',
            },
          ]}
          className="work-crossfade"
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

    {/* Bottom snap anchor — when scrolling up into Work, land here */}
    <div className="work-snap-end" aria-hidden="true" />
  </section>
);

export default Work;
