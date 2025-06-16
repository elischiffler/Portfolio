import './App.css'
import { DiReact, DiJavascript1, DiPython, DiJava, DiDatabase } from 'react-icons/di'
import { SiQiskit, SiCplusplus, SiPostman, SiAmazon } from 'react-icons/si'
import { GiAtom } from 'react-icons/gi'
import { FiZap } from 'react-icons/fi'
import CosmicDustBackground from './components/CosmicDustBackground'

function App() {

  return (
    <>
    <CosmicDustBackground />
      <div className="header">
        <h1 style={{ marginBottom: 0 }}>Eli Schiffler</h1>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem', fontWeight: 'normal' }}>
          Software Developer / Quantum Computing
        </h2>
      </div>
      <div className="skills-box">
        <p>
          <span className="skill-item"><DiReact /> React</span>
          <span className="skill-item"><DiPython /> Python</span>
          <span className="skill-item"><DiJava /> Java</span>
          <span className="skill-item"><DiJavascript1 /> JavaScript</span>
          <span className="skill-item"><SiCplusplus /> C++</span>
          <span className="skill-item"><DiDatabase /> MySQL</span>
          <span className="skill-item"><SiAmazon /> AWS</span>
          <span className="skill-item"><SiPostman /> REST API</span>
          <span className="skill-item"><SiQiskit /> Qiskit</span>
          <span className="skill-item"><GiAtom /> Ion Trapping</span>
          <span className="skill-item"><FiZap /> FastAPI</span>
        </p>
      </div>
    </>
  )
}

export default App