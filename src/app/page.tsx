"use client";
import Hero from "@/mycomponents/Hero";
import Navbar from "@/mycomponents/Navbar";

export default function Home() {
  return (
    <div
      className="h-[100vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] 
      bg-grid-black/[0.2] flex flex-col justify-center"
    >
      {/* Radial gradient for the container to give a faded look */}
      <div
        className="absolute pointer-events-none inset-0 flex  dark:bg-black
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      ></div>
      <div className="h-full">
        <div className="flex items-center justify-center sticky top-6 ">
          <Navbar />
        </div>
        <Hero />
      </div>
    </div>
  );
}
