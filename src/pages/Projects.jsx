import { FaExternalLinkAlt, FaGithub, FaLaptopCode } from 'react-icons/fa';
import './Projects.css';

const projects = [
  {
    title: 'Roadtrip Planner',
    description:
      'Full-stack web application that generates personalized road trip itineraries. Integrated Google Maps, TripAdvisor, and other APIs to recommend destinations, lodging, and attractions.',
    tech: 'React · AWS · Python · FastAPI · REST API · SQL · CI/CD',
    images: [
      { src: '/images/JourneyGenie1.png', alt: 'Journey Genie 1' },
      { src: '/images/JourneyGenie2.png', alt: 'Journey Genie 2' },
      { src: '/images/JourneyGenie3.png', alt: 'Journey Genie 3' },
      { src: '/images/JourneyGenie4.png', alt: 'Journey Genie 4' },
    ],
    links: [
      {
        href: 'https://rp-ui.vercel.app/',
        icon: <FaExternalLinkAlt />,
        label: 'Live Site',
      },
      {
        href: 'https://github.com/Roadtrip-Planner',
        icon: <FaGithub />,
        label: 'GitHub',
      },
    ],
    login: { email: 'schifflereli@gmail.com', password: 'Testing1!' },
  },
  {
    title: 'File Compression & Decompression',
    description:
      'C++ program to compress and decompress BMP image files with adjustable quality settings. Utilized a hash map and Huffman encoding table to generate efficient binary representations.',
    tech: 'C++ · Huffman Encoding · Data Structures',
    images: [
      { src: '/images/Compress1.bmp', alt: 'Compression 1' },
      { src: '/images/Compress2.png', alt: 'Compression 2' },
    ],
    links: [
      {
        href: 'https://github.com/elischiffler/File-Compression-Decompression',
        icon: <FaGithub />,
        label: 'GitHub',
      },
    ],
  },
  {
    title: 'Java Platformer Game',
    description:
      'A 2D platformer in Java with a focus on clean, modular code. Features sprite animation, collision detection, procedural level generation, and A*/Dijkstra pathfinding.',
    tech: 'Java · OOP · Game Development',
    images: [
      { src: '/images/JavaGame1.png', alt: 'Java Game 1' },
      { src: '/images/JavaGame2.png', alt: 'Java Game 2' },
      { src: '/images/JavaGame3.png', alt: 'Java Game 3' },
    ],
    links: [
      {
        href: 'https://github.com/elischiffler/PokemonGame',
        icon: <FaGithub />,
        label: 'GitHub',
      },
    ],
  },
  {
    title: 'IBM Quantum Benchmarking Tool',
    description:
      'Python CLI tool to automate randomized benchmarking experiments on IBM Quantum computers. Integrated IBM Quantum API to securely run jobs and export data to CSV.',
    tech: 'Python · Qiskit · IBM Quantum API · CLI',
    images: [
      {
        src: '/images/QCC-Script1.png',
        alt: 'Quantum Script 1',
        contain: true,
      },
      {
        src: '/images/QCC-Script2.png',
        alt: 'Quantum Script 2',
        contain: true,
      },
      {
        src: '/images/QCC-Script3.png',
        alt: 'Quantum Script 3',
        contain: true,
      },
    ],
    links: [
      {
        href: 'https://github.com/elischiffler/QCC-IBM-ErrorCode-Project',
        icon: <FaGithub />,
        label: 'GitHub',
      },
    ],
  },
];

const Projects = () => (
  <div className="projects">
    <div className="page-header">
      <h1 className="page-title">
        Projects
        <FaLaptopCode className="page-header-icon" aria-hidden="true" />
      </h1>
      <div className="page-header-line" />
    </div>{' '}
    <div className="project-grid">
      {projects.map((project) => {
        // Duplicate images for seamless loop
        const allImages = [...project.images, ...project.images];
        return (
          <div key={project.title} className="project-card">
            <div className="auto-carousel">
              <div className="carousel-track">
                {allImages.map((img, i) => (
                  <img
                    key={i}
                    src={img.src}
                    alt={img.alt}
                    className={img.contain ? 'contain-image' : ''}
                  />
                ))}
              </div>
            </div>

            <div className="project-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              {project.login && (
                <div className="dummy-login">
                  <strong>Try it:</strong> {project.login.email} &nbsp;/&nbsp;{' '}
                  {project.login.password}
                </div>
              )}

              <p className="project-tech">{project.tech}</p>

              <div className="project-links">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link-button"
                  >
                    {link.icon}
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default Projects;
