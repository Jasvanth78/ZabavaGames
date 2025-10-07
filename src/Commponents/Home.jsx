import React from 'react'
import xo from '../assets/xoo.jpg'
import memory from '../assets/memory.jpg'
import hmaan from '../assets/hang.jpg'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <>
    <div className='bg-[#121212] h-20 flex items-center  '>
      <img src="" alt="" />
      <p className="text-white pl-10">ZABAVA GAMES</p>
      <div className="bg-yellow-400 w-10 h-10 ml-330 flex items-center justify-center rounded-full"> <p className="font-bold text-1x">J</p></div>
     

    </div>
    <div className='flex items-center justify-center mt-80 gap-20 overflow-auto  flex-col sm:flex-row'>
        <Link to='/Xogame'className="w-40 h-40"><img src={xo} alt="" className='rounded-2xl'/></Link>
        <Link to='/MemoryMatch'className="w-40 h-40"><img src={memory} alt=""  className='rounded-2xl h-40' /></Link>
        <Link to='/summa' className="w-40 h-40"><img src={hmaan} alt=""  className='rounded-2xl' />
        </Link>
    </div>
    </>
    
  )
}

export default Home