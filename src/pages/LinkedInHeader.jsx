import { useRef } from 'react';
import { toPng } from 'html-to-image';
import './LinkedInHeader.css';

const LinkedInHeader = () => {
  const headerRef = useRef(null);

  const handleDownload = async () => {
    if (!headerRef.current) return;
    const dataUrl = await toPng(headerRef.current, {
      width: 1584,
      height: 396,
      pixelRatio: 2,
    });
    const link = document.createElement('a');
    link.download = 'linkedin-header.png';
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="linkedin-header-wrapper">
      <div className="linkedin-header" ref={headerRef}>
        {/* Background gradient overlay */}
        <div className="lh-bg-gradient" aria-hidden="true" />

        {/* Tagline — top right */}
        <p className="lh-tagline">Full-Stack · React · Python · Cloud</p>

        {/* Closing brace — right side */}
        <span className="lh-bracket-close" aria-hidden="true">
          {'}'}
        </span>

        {/* Code snippets — 4 total, well-spaced */}
        <div className="lh-snippet lh-snippet-1" aria-hidden="true">
          <span className="lh-kw">const</span> build{' '}
          <span className="lh-op">=</span> (){' '}
          <span className="lh-op">=&gt;</span> {'{'}
        </div>
        <div className="lh-snippet lh-snippet-2" aria-hidden="true">
          <span className="lh-kw">async</span>{' '}
          <span className="lh-fn">deploy</span>()
        </div>
        <div className="lh-snippet lh-snippet-3" aria-hidden="true">
          <span className="lh-kw">return</span>{' '}
          <span className="lh-str">&quot;done&quot;</span>;
        </div>
        <div className="lh-snippet lh-snippet-4" aria-hidden="true">
          <span className="lh-op">&lt;</span>App{' '}
          <span className="lh-op">/&gt;</span>
        </div>

        {/* Circuit lines — minimal, clean */}
        <svg
          className="lh-circuits"
          aria-hidden="true"
          viewBox="0 0 1584 396"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Top horizontal — below snippet-1 */}
          <line
            x1="420"
            y1="75"
            x2="820"
            y2="75"
            stroke="var(--color-espresso)"
            strokeWidth="1.2"
            opacity="0.18"
          />
          <circle
            cx="420"
            cy="75"
            r="3"
            fill="var(--lh-olive)"
            opacity="0.65"
          />
          <circle
            cx="820"
            cy="75"
            r="3"
            fill="var(--lh-olive)"
            opacity="0.65"
          />

          {/* Right vertical */}
          <line
            x1="1420"
            y1="120"
            x2="1420"
            y2="300"
            stroke="var(--color-espresso)"
            strokeWidth="1.2"
            opacity="0.15"
          />
          <circle
            cx="1420"
            cy="120"
            r="2.5"
            fill="var(--lh-sage-green)"
            opacity="0.6"
          />
          <circle
            cx="1420"
            cy="300"
            r="2.5"
            fill="var(--lh-sage-green)"
            opacity="0.6"
          />

          {/* Bottom connector */}
          <line
            x1="550"
            y1="340"
            x2="780"
            y2="340"
            stroke="var(--lh-olive)"
            strokeWidth="1.2"
            opacity="0.2"
          />
          <circle
            cx="550"
            cy="340"
            r="2.5"
            fill="var(--color-mocha)"
            opacity="0.55"
          />
          <circle
            cx="780"
            cy="340"
            r="2.5"
            fill="var(--lh-olive)"
            opacity="0.6"
          />
        </svg>

        {/* Dot grid — upper center */}
        <div className="lh-dot-grid" aria-hidden="true" />

        {/* Geometric ring — one, clean */}
        <div className="lh-geo-ring" aria-hidden="true" />

        {/* Left accent strip */}
        <div className="lh-accent-left" aria-hidden="true" />
      </div>

      <button className="lh-download-btn" onClick={handleDownload}>
        Download Header (3168×792 PNG)
      </button>
    </div>
  );
};

export default LinkedInHeader;
