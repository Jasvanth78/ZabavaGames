import React, { useEffect, useState } from "react";
import Loader from "./Commponents/Loader";
import './App.css'
import Home from "./Commponents/Home";
import { Routes,Route } from "react-router-dom";
import HangmanGame from "./Commponents/HangmanGame";
import Xogame from "./Commponents/Xogame";
import MemoryMatch from "./Commponents/MemoryMatch";


const App = () => {
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
    </Routes>
    </div>
  );
};

export default App;
