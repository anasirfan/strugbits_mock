'use client';

import Image from 'next/image';

const HeroSection = () => {
  return (
    <div className="relative h-[300px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/placeholder-meal.png"
          alt="Hero background"
          fill
          className="object-cover opacity-20 "
       
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
      </div>
      <div className="relative max-w-[1920px] mx-auto px-4  text-center py-24 text-[#222222]">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 ">Optimized Your Meal</h1>
        <p className="text-sm ">Select Meal to Add in Week. You will be able to edit, modify and change the Meal Weeks.</p>
      </div>
    </div>
  );
};

export default HeroSection;
