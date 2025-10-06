import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="bg-black h-screen">
        <p className="text-white flex justify-center pt-20 text-6xl ">ZABAVA Games</p>
      </div>
    </>
  )
}

export default App
