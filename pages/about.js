import React from 'react'

function about() {
  return (
    <>
    <div>
      <img src="/about_bg.jpg" alt="About Page" />
      <div className='absolute top-44 right-32 w-1/3'>
        <h1 className='font-bold mb-10 text-5xl text-red-600'>About Us</h1>
        <p className='text-white'>Curatify is made to give the personal opinion on the automobiles. We use the vehicle first and nitpick all the flaws of the car from a user perspective. We don't brag about cars; we live with cars to know how you would feel when you are going to use that vehicle.
        </p>
        <p className='text-white mt-2'>Our bloggers are those who really love the vehicles and they can live their whole lives talking about automobiles.</p>
      </div>
    </div>
    </>
  )
}

export default about