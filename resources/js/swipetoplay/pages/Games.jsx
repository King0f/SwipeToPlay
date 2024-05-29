import React from 'react'
import Header from '../components/Header'
import Valorant from '../../../assets/Valorant.webp'
import Lol from '../../../assets/LeagueofLegends.jpg'

const Games = () => {
  return (
    <div>
        <Header/>
        <div className='h-full flex mt-20'>
  <div className='w-1/2 flex justify-center'>
    <a target='_blank' href='https://playvalorant.com/es-es/?gad_source=1&gclid=Cj0KCQjwpNuyBhCuARIsANJqL9NSCiW7o2M1s53PGg-1WaLI0J7UZpWO4VOVhb_duT9jx-3UJCA0tQMaAmpNEALw_wcB&gclsrc=aw.ds'><img src={Valorant} className='hover:border-2 hover:border-red-600 w-2/3 m-auto transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-custom hover:shadow-custom-red'/></a>
  </div>
  <div className='w-1/2 flex justify-center'>
  <a target='_blank' href='https://www.leagueoflegends.com/es-es/'><img src={Lol} className='hover:border-2 hover:border-blue-600 w-2/3 m-auto transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-custom hover:shadow-custom-blue'/></a>
  </div>
</div>

    </div>
  )
}

export default Games
