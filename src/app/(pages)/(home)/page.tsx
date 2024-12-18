'use client'
import Navbar from "@/components/user/main-nav";
import Image from "next/image";
import { useState } from "react";
import Banner5 from "../../../../public/images/Banner1.jpg";
import Banner2 from "../../../../public/images/Banner2.jpg";
import Banner3 from "../../../../public/images/Banner3.jpg";
import Banner4 from "../../../../public/images/Banner4.jpg";
import Banner1 from "../../../../public/images/Banner5.jpg";
import CardDp from "@/components/user/card-dp";
import CardHeader from "./../../../components/user/card-header/card-header";

const banners = [Banner1, Banner2, Banner3, Banner4, Banner5];

const HomePage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? banners.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === banners.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div>
      <Navbar />

      {/* Banner Carousel */}
      <div className="relative w-full flex justify-center mt-4">
        {/* Images */}
        <div className="w-full h-[600px] overflow-hidden relative">
          {banners.map((banner, index) => (
            <div
              key={index}
              className={`transition-transform duration-700 ease-in-out ${
                index === currentIndex ? "translate-x-0" : "translate-x-full"
              } flex justify-center absolute inset-0`}
            >
              {index === currentIndex && (
                <Image
                src={banner}
                alt={`Banner ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="w-full h-full"
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-lg z-10"
        >
          &#10094;
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-gray-800 p-2 rounded-full shadow-lg z-10"
        >
          &#10095;
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 w-full flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentIndex ? "bg-teal-500" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="flex flex-col justify-center items-center mt-8">
        <div className="flex flex-col justify-center items-center space-y-2">
          <p className="text-3xl font-bold">
            How It
            <span
              className="text-transparent bg-clip-text ml-2"
              style={{
                background: "linear-gradient(to right, #4fd1c5, #4299e1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Works
            </span>
          </p>
          <p className="text-slate-500 font-medium text-xl">
            Simplifying the booking process for coaches, venues, and athletes.
          </p>
          <CardHeader/>
        </div>
      </div>

      {/* Featured Venues */}
      <div className="flex flex-col justify-center items-center pt-10">
        <div className="flex flex-col justify-center items-center space-y-2">
          <p className="text-3xl font-bold">
            Featured
            <span
              className="text-transparent bg-clip-text ml-2"
              style={{
                background: "linear-gradient(to right, #4fd1c5, #4299e1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Venues
            </span>
          </p>
          <p className="text-slate-500 font-medium text-xl">
            Advanced sports venues offer the latest facilities, dynamic and unique environments.
          </p>
              <CardHeader/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;