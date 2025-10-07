import React from 'react'
import { useState,useEffect } from 'react'
export default function HangmanGame() {
  //   const [word, setWord]=useState();
  //   const [find, SetFind]=useState([])
  //   const [wrong, setWrong]=useState(0);

  //   useEffect=(()=>{
  //       const saved=JSON.parse(localStorage.getItem("Game"))
  //       if(saved){
  //           setWord(saved.word);
  //           SetFind(saved.find);
  //           setWrong(saved.wrong);
  //       }
  //       else{
  //           resetGame();
  //       }
  //   })
  //     useEffect(() => {
  //   localStorage.setItem(
  //     "Game",
  //     JSON.stringify({ word, find, wrong })
  //   );
  // }, [word, find, wrong]);


  return (
    <div className='text-white'>This is HangmanGame Page</div>
  )
}
