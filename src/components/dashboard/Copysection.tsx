import React from 'react'
import { Button } from '../ui/button'

function Copysection({profileURL, buttonFunction}: {profileURL: string, buttonFunction: () => void}) {
  return (
    <div className='w-full'>
        <div className="text-lg text-white w-fit md:w-full  py-1 md:flex md:justify-center items-center">
            <h1 className=" px-3">Copy your unique Link</h1>
        </div>
        <div className="flex items-center md:justify-center md:gap-4 justify-around">
        <input
            type="text"
            value={profileURL}
            disabled
            className="input input-bordered mr-2 bg-white rounded-full px-3 text-lg py-1 md:w-[80%] w-[300px]"
          />
          <Button onClick={buttonFunction}>Copy</Button>
        </div>
    </div>
  )
}

export default Copysection