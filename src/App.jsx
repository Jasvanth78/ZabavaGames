import React, { useEffect, useState } from "react";
import Loader from "./Commponents/Loader";
import './App.css'
import Home from "./Commponents/Home";
import { Routes,Route } from "react-router-dom";
import HangmanGame from "./Commponents/HangmanGame";
import Xogame from "./Commponents/Xogame";
import MemoryMatch from "./Commponents/MemoryMatch";
import   CarRaceGame  from "./Commponents/CarRaceGame";
import ShootingGame from "./Commponents/ShootingGame";
  import { ToastContainer, toast } from 'react-toastify';
 


const App = ()  => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-center  bg-black h-screen">
   
    <Routes>
      <Route path="/" element={ <Home/>} />
        <Route path="/summa" element={ <HangmanGame/>} />
        <Route path="/Xogame" element={ <Xogame/>} />
          <Route path="/MemoryMatch" element={ <MemoryMatch/>} />
          <Route path="/CarRace" element={ <CarRaceGame/>} />
          <Route path="/SpaceShooter" element={ <ShootingGame/>} />
    </Routes>
    <ToastContainer/>
    
    </div>
  );
};

export default App;
