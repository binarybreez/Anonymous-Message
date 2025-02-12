import React from 'react'
import { Button } from '../ui/button'
import { signOut } from 'next-auth/react'

function Navbar({username}:{username: string | undefined}) {
  return (
    <div className='flex justify-around items-center   py-2 rounded-3xl md:w-[90%] w-full border-2  border-zinc-400
    bg-zinc-950 text-white'>
        <div className="">
            <h1 className='md:text-2xl text-xl font-bold'>Anonymous Feedback</h1>
        </div>
        <div className="md:block hidden">
            <h1>Hello, {username}</h1>
        </div>
        <div className="">
            <Button onClick={async () => await signOut()}>
                Logout
            </Button>
        </div>
    </div>
  )
}

export default Navbar