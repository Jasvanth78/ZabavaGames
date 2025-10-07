// src/components/Loader.jsx
import React from "react";
import lodder from "../assets/LoginPage.jpeg"
import loader from "../assets/loader.svg"
const Loader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen" ><img src={lodder} alt="" className="relative w-screen h-screen object-cover blur-xs"/>
      <div className="flex flex-col items-center absolute left-0 right-0">
       
        <div className=""><img src={loader} alt="" className="stroke-black"/></div>
        
        <p className="text-3xl text-white font-mono  ">Wait Karo...</p>
      </div>
    </div>
  );
};

export default Loader;
