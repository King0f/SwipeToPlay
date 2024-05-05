import React from 'react'
import Header from '../components/Header'
import Filters from '../components/Filters'

const Swipe = () => {
  return (
    <>
    <Header/>
    <div className='flex justify-between'>
    <Filters/>
    <div className='flex m-auto'>
    <div className='flex flex-col'>
    <p className='text-center text-4xl font-Swipe font-semibold'>Swipe</p>
    <div className='flex'>
    <div className='self-center w-12 h-12 rounded-full border-2 bg-gray-500'></div>
    <div className='w-96 h-96 border-2 bg-gray-300'>foto</div>
    <div className='self-center w-12 h-12 rounded-full border-2 bg-gray-500'></div>
    </div>
    <div className='w-16 h-16 bg-gray-500 m-auto rounded-full mt-4'></div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Swipe
