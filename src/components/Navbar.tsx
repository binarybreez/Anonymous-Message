'use client'
import Link from "next/link"
function Navbar() {
    return (
      <div className="md:w-[60%] w-full z-40 bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-700 
      rounded-full md:px-5 px-4 py-3 flex justify-between items-center  border-[1px] border-zinc-950 md:py-3">
          <div className="text-zinc-950 bg-zinc-200 font-semibold px-3 py-1 rounded-full text-[18px]">
            Mysterious Feedback</div>
          <div className="">
            <Link href={"/login"}>
              <button className="text-zinc-950 bg-zinc-200 font-semibold px-3 py-1 rounded-3xl text-[15px] ">Login</button>
            </Link>
          </div>
      </div>
    )
  }
  
  export default Navbar