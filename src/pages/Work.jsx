import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  FaBriefcase,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from 'react-icons/fa';
import Crossfade from '../components/Crossfade/Crossfade';
import './Work.css';

const workEntries = [
  {
    title: 'Robert Half',
    subtitle: 'Software Engineering Intern',
    date: 'Summer 2025 · Remote',
    description:
      'Built an employee verification portal serving both Robert Half and Protiviti with dynamic brand switching and full internationalization support. Implemented Microsoft Entra ID authentication, designed responsive HTML/CSS interfaces for mobile and desktop, and wrote thorough Jest tests against production-quality, single-responsibility code. Delivered an end-to-end CI/CD pipeline in Azure DevOps and deployed the application to AWS Lightsail using Node.js. Also building a chat agent in Microsoft Copilot Studio to replace the existing contact form, routing validated inquiries through Drupal to Salesforce for more detailed lead generation.',
    skills:
      'Node.js · AWS Lightsail · Azure DevOps · Microsoft Entra ID · Microsoft Copilot Studio · Drupal · Salesforce · HTML/CSS · CI/CD · Jest',
    images: [
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
    ],
  },
  {
    title: 'Sandia National Laboratories',
    subtitle: 'Quantum Engineering Intern',
    date: 'Summer 2024 · Albuquerque, NM',
    description:
      'Focused on the precise alignment of optical systems used for trapping and cooling barium ions. Managed laser beam paths to maintain experimental stability and specialized in optimization of optical fibers, achieving 80% efficiency. Collaborated daily with doctoral researchers to troubleshoot technical issues and enhance quantum hardware performance.',
    skills:
      'Optics · Ion Trapping · Laser Alignment · Optical Fiber Coupling · Data Analysis · Beam Path Optimization',
    images: [
      {
        src: '/images/work/SandiaLaser.jpg',
        alt: 'Laser optics system at Sandia National Laboratories',
      },
    ],
  },
];

const Work = () => {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = useCallback((images, index = 0) => {
    setLightbox({ images, index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(null);
  }, []);

  const lightboxPrev = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length,
    }));
  }, []);

  const lightboxNext = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length,
    }));
  }, []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightbox, closeLightbox, lightboxPrev, lightboxNext]);

  return (
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
        {workEntries.map((entry, i) => (
          <div key={entry.title}>
            {i > 0 && <div className="work-entry-divider" />}
            <div className="work-item">
              <div
                className="work-crossfade-wrapper"
                role="button"
                tabIndex={0}
                aria-label={`View ${entry.title} images`}
                onClick={() => openLightbox(entry.images)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(entry.images);
                  }
                }}
              >
                <Crossfade
                  images={entry.images}
                  interval={3000}
                  className="work-crossfade"
                />
              </div>

              <div className="work-text">
                <h2 className="work-title">{entry.title}</h2>
                <p className="work-subtitle">{entry.subtitle}</p>
                <p className="work-date">{entry.date}</p>
                <p className="work-description">{entry.description}</p>
                <p className="work-skills">{entry.skills}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom snap anchor — when scrolling up into Work, land here */}
      <div className="work-snap-end" aria-hidden="true" />

      {/* Lightbox overlay */}
      {lightbox &&
        createPortal(
          <div className="lightbox-overlay" onClick={closeLightbox}>
            <button
              className="lightbox-close"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              aria-label="Close lightbox"
            >
              <FaTimes />
            </button>

            <img
              src={lightbox.images[lightbox.index].src}
              alt={lightbox.images[lightbox.index].alt}
              className="lightbox-image"
              onClick={(e) => e.stopPropagation()}
            />

            {lightbox.images.length > 1 && (
              <div
                className="lightbox-controls"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="lightbox-arrow lightbox-arrow--left"
                  onClick={lightboxPrev}
                  aria-label="Previous image"
                >
                  <FaChevronLeft />
                </button>

                <div className="lightbox-counter">
                  {lightbox.index + 1} / {lightbox.images.length}
                </div>

                <button
                  className="lightbox-arrow lightbox-arrow--right"
                  onClick={lightboxNext}
                  aria-label="Next image"
                >
                  <FaChevronRight />
                </button>
              </div>
            )}
          </div>,
          document.body
        )}
    </section>
  );
};

export default Work;
