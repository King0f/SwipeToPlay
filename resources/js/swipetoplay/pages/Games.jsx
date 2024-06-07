import React from 'react'
import Header from '../components/Header'
import Valorant from '../../../assets/Valorant.webp'
import Lol from '../../../assets/LeagueofLegends.jpg'
import Footer from '../components/Footer'

const Games = () => {
  return (
    <div>
        <Header/>
        <div className='h-full flex flex-col xl:flex-row mt-20'>
  <div className='md:w-full flex flex-col items-center justify-center relative'>
    <h2 className='lg:text-4xl tres:text-2xl font-bold mb-6' style={{ fontFamily: "'Anton', sans-serif", color: "#FF4655" }}>Página oficial de Valorant</h2>
    <a target='_blank' href='https://playvalorant.com/es-es/?gad_source=1&gclid=Cj0KCQjwpNuyBhCuARIsANJqL9NSCiW7o2M1s53PGg-1WaLI0J7UZpWO4VOVhb_duT9jx-3UJCA0tQMaAmpNEALw_wcB&gclsrc=aw.ds' className='relative w-2/3'>
      <img src={Valorant} className='hover:border-2 rounded-xl hover:border-red-600 w-full transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-custom hover:shadow-custom-red'/>
    </a>
  </div>
  <div className='md:w-full flex flex-col items-center justify-center relative mt-10 xl:mt-0'>
    <h2 className='lg:text-4xl tres:text-2xl font-bold mb-6' style={{ fontFamily: "'Anton', sans-serif", color: "#00ADEF" }}>Página oficial de League of Legends</h2>
    <a target='_blank' href='https://www.leagueoflegends.com/es-es/' className='relative w-2/3'>
      <img src={Lol} className='hover:border-2 hover:border-blue-600 w-full transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-custom hover:shadow-custom-blue rounded-xl'/>
    </a>
  </div>
</div>
<div className='mt-72'>
  <Footer />
</div>

            </div>
  )
}

export default Games
