'use client'
function Hero() {
    return (
      <div className="flex-col flex justify-center items-center mt-[150px]">
          <div className="text-white text-center w-[80%]">
              <h1 className=" text-4xl md:text-6xl font-bold mb-3">
              Unveil the Truth Behind Every Voice
              </h1>
              <p className="text-lg">Transform feedback into your greatest asset. Uncover hidden insights, sharpen your 
                  understanding, and evolve with every anonymous response. The truth is waiting to 
                  be discovered.
              </p>
          </div>
          <div className="flex mt-7 gap-[35px] md:gap-[125px] md:mt-10">
              <button className="text-white font-semibold bg-zinc-800 px-10 py-2 rounded-3xl border-2 border-zinc-500">Get Started</button>
              <button className="text-white font-semibold bg-zinc-800 px-5 py-2 rounded-3xl border-2 border-zinc-500">Explore Feedback</button>
          </div>
      </div>
    )
  }
  
  export default Hero