import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { DiReact, DiHtml5, DiJavascript1 } from 'react-icons/di'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="header">
        <h1 style={{ marginBottom: 0 }}>Eli Schiffler</h1>
        <h2 style={{ marginTop: 0, fontSize: '1.2rem', fontWeight: 'normal' }}>
          Software Developer / Quantum Computing
        </h2>
      </div>
    </>
  )
}

export default App