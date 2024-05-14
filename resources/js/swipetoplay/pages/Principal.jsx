import { useState, useEffect } from 'react'
import { Link} from "react-router-dom";
import '../styles/App.css'
import Header from '../components/Header';
import { riotStore } from '../store/riotStore/riotStore';

    function Principal() {
    /* const {summoner, obtenerDatosInvocador} = riotStore((state) => ({
        summoner: state.summoner,
        obtenerDatosInvocador: state.obtenerDatosInvocador,
    }))
    useEffect(() => {
        obtenerDatosInvocador("SalmorejoKing/EUW", "europe");
      }, []); */


  return (
    <>
    <Header />
    <div className="App mt-10">
    <div>
    <p className='text-center text-size-3xl mb-5 font-semibold font-Swipe text-red-800'>Choose Your Subscription</p>
    <div className="w-full h-96 flex justify-center">
    <div className='w-60 h-80 border-4 self-center flex flex-col justify-between bg-gray-200 border-red-700'>
    <p className='font-Swipe font-bold text-size-xl text-red-600 mt-4 text-center '>Free Version</p>
    <div>
    <p className='text-size-m text-center text-gray-400 font-Swipe font-medium'>10 daily swipes</p>
    <p className='text-size-m text-center text-gray-400 font-Swipe font-medium'>Superlike unavailable</p>
    <p className='text-size-m text-center text-gray-400 font-Swipe font-medium'>25 daily messages</p>
    <p className='text-size-m text-center text-gray-400 font-Swipe font-medium'>Daily non stackable</p>
    </div>
    <button className='mb-4'><div className='w-44 h-12 m-auto border-gray-900 border-2 bg-gray-600 hover:bg-gray-700 hover:border-gray-950 flex justify-center'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Default</p></div></button>
    </div>
    <div className='w-80 h-96 border-4 mx-5 flex flex-col justify-between bg-gray-200 border-red-700'>
    <div>
    <p className='font-Swipe font-bold text-size-xl text-red-600 mt-4 text-center '>9.99$/Month</p>
    <p className='font-Swipe font-bold text-size-xl text-gray-400 mt-2 text-center line-through'>19.99$/Month</p>
    </div>
    <div>
    <p className='text-size-l text-center text-gray-400 font-Swipe font-medium'>Unlimited swipes</p>
    <p className='text-size-l text-center text-gray-400 font-Swipe font-medium'>Unlimited Superlikes</p>
    <p className='text-size-l text-center text-gray-400 font-Swipe font-medium'>Unlimited messages</p>
    <p className='text-size-l text-center text-gray-400 font-Swipe font-medium'>Monthly email report</p>
    </div>
    <button className='mb-4'><div className='w-44 h-12 m-auto border-red-900 border-2 bg-red-600 hover:bg-red-700 hover:border-red-950 flex justify-center'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Subscribe</p></div></button>
    </div>
    <div className='w-60 h-80 border-4 self-center flex flex-col justify-between bg-gray-200 border-red-700'>
    <div>
    <p className='font-Swipe font-bold text-size-xl text-red-600 mt-4 text-center '>4.99$/Month</p>
    <p className='font-Swipe font-bold text-size-xl text-gray-400 mt-2 text-center line-through'>9.99$/Month</p>
    </div>
    <div>
    <p className='text-size-m text-center text-gray-400 font-Swipe font-medium'>25 daily swipes</p>
    <p className='text-size-m text-center text-gray-400 font-Swipe font-medium'>1 daily Superlike</p>
    <p className='text-size-m text-center text-gray-400 font-Swipe font-medium'>100 daily messages</p>
    <p className='text-size-m text-center text-gray-400 font-Swipe font-medium'>Daily stackable</p>
    </div>
    <button className='mb-4'><div className='w-44 h-12 m-auto border-red-900 border-2 bg-red-600 hover:bg-red-700 hover:border-red-950 flex justify-center'><p className='self-center text-size-l text-center text-white font-Swipe font-semibold'>Subscribe</p></div></button>
    </div>

    </div>
</div>
    </div>
    </>
  )
}

export default Principal
