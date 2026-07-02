import './App.css';
import Work from './pages/Work';
import LandingPage from './pages/LandingPage';
import Projects from './pages/Projects';
import AboutMe from './pages/AboutMe';
import Sidebar from './components/Sidebar/Sidebar';

function App() {
  return (
    <>
      <Sidebar />
      <div className="snap-container">
        <div id="section-landing" className="snap-section">
          <LandingPage />
        </div>
        <div id="section-work" className="snap-section">
          <Work />
        </div>
        <div id="section-projects" className="snap-section">
          <Projects />
        </div>
        <div id="section-about" className="snap-section">
          <AboutMe />
        </div>
      </div>
    </>
  );
}

export default App;
