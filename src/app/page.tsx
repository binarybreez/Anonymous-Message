"use client";
import BentoGridSecondDemo from "@/components/BentoGrid";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/pages/Footer";
import InfiniteMovingCardsDemo from "@/components/pages/MovingCards";
import { Vortex } from "@/components/ui/vortex";

export default function Home() {
  return (
    <div className="">
      <div
        className="h-[100vh] w-full bg-black bg-grid-white/[0.2] 
        flex flex-col justify-center"
      >
        {/* Radial gradient for the container to give a faded look */}
        <div
          className="absolute pointer-events-none inset-0 flex bg-black
           [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
        ></div>
        <div className="h-full">
          <div className="flex items-center justify-center sticky top-6 ">
            <Navbar />
          </div>
          <Hero />
        </div>
      </div>

          <div className="md:hidden p-4 h-fit rounded-md flex flex-col antialiased
            bg-black bg-grid-white/[0.05] items-center justify-center
            relative overflow-hidden">
          <BentoGridSecondDemo/>
          </div> 

      <div className="p-4 w-full mx-auto rounded-md  h-fit overflow-hidden hidden md:block ">
        <Vortex
          backgroundColor="black"
          rangeY={800}
          particleCount={200}
          baseHue={120}
          className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-[100%]"
        >
          <BentoGridSecondDemo/>
        </Vortex>
      </div>
      <div className="h-fit">
        <InfiniteMovingCardsDemo/>
      </div>
      <div className="">
        <Footer/>
      </div>
    </div>
  );
}
