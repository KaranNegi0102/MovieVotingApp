import React from 'react'
import ProfilePage from '../pages/ProfilePage'


const NavBar = () => {
  return (
    <div className="flex items-center bg-gray-900 p-2">
      <div className="ml-[35%]">
      <h1 className="text-3xl text-center bg-gray-900 text-white p-4 font-bold ">Movie Voting App</h1>
      </div>
      
      <div className='ml-auto'>
      <button 
      className=" text-white font-bold rounded">
        <ProfilePage/>
      </button>
      </div>
      
    </div>
  )
}

export default NavBar
