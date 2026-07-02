import { useEffect, useState } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFileDownload,
} from 'react-icons/fa';
import './Sidebar.css';

const sections = [
  { id: 'section-landing', label: 'Home' },
  { id: 'section-work', label: 'Work' },
  { id: 'section-projects', label: 'Projects' },
  { id: 'section-about', label: 'About' },
];

const socials = [
  {
    href: 'https://github.com/elischiffler',
    icon: <FaGithub />,
    label: 'GitHub',
    external: true,
  },
  {
    href: 'https://linkedin.com/in/eli-schiffler-93a69a298',
    icon: <FaLinkedin />,
    label: 'LinkedIn',
    external: true,
  },
  {
    href: 'mailto:schifflereli@gmail.com',
    icon: <FaEnvelope />,
    label: 'Email',
    external: false,
  },
  {
    href: '/EliSchifflerResume.pdf',
    icon: <FaFileDownload />,
    label: 'Resume',
    external: false,
    download: true,
  },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('section-landing');

  useEffect(() => {
    const observers = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        // Fire when the section covers at least 50% of the viewport
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <aside className="sidebar" aria-label="Site navigation">
      {/* Full-height line */}
      <div className="sidebar-line" aria-hidden="true" />

      {/* Section dots */}
      <nav className="sidebar-nav" aria-label="Page sections">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            className={`sidebar-nav-item${activeSection === id ? ' active' : ''}`}
            onClick={() => scrollTo(id)}
            aria-label={`Go to ${label}`}
            type="button"
          >
            <span className="sidebar-dot" />
            <span className="sidebar-label" aria-hidden="true">
              {label}
            </span>
          </button>
        ))}
      </nav>

      {/* Social icons */}
      <div className="sidebar-socials">
        {socials.map(({ href, icon, label, external, download }) => (
          <a
            key={label}
            href={href}
            className="sidebar-social-link"
            aria-label={label}
            {...(external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            {...(download ? { download: true } : {})}
          >
            <span className="sidebar-social-icon">{icon}</span>
            <span className="sidebar-social-label">{label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
