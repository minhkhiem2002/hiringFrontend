"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineTag, AiFillStar } from "react-icons/ai";
import { FaFutbol } from "react-icons/fa";

interface ColorEndpoint {
  endPoint: string;
  colorCode: string;
}

interface CardProductProps {
  pictureUrl: string;
  colorEndpoints: ColorEndpoint[];
  price: number;
  name: string;
  sport: string;
}

const CardProduct = ({
  pictureUrl,
  colorEndpoints = [],
  price,
  name,
  sport,
}: CardProductProps) => {
  const [selectedColor, setSelectedColor] = useState<ColorEndpoint | null>(
    colorEndpoints[0] || null
  );
  const router = useRouter();

  const handleColorClick = (color: ColorEndpoint) => {
    setSelectedColor(color);
    router.push(`/equipment/${color.endPoint}`);
  };

  const handleImageOrNameClick = () => {
    if (colorEndpoints.length > 0) {
      router.push(`/equipment/${colorEndpoints[0].endPoint}`);
    }
  };

  return (
    <div className="w-[350px] h-[520px] bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer">
      {/* Image Section */}
      <div className="relative" onClick={handleImageOrNameClick}>
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded-md animate-bounce flex items-center gap-1">
          <AiOutlineTag size={16} />
          SALE
        </div>
        <Image
          src={pictureUrl}
          alt={name}
          width={350}
          height={200}
          className="rounded-md"
        />
      </div>

      {/* Color Options */}
      <div className="flex space-x-3 mt-3">
        {colorEndpoints.length > 0 ? (
          colorEndpoints.map((color) => (
            <button
              key={color.endPoint}
              onClick={(e) => {
                e.preventDefault();
                handleColorClick(color);
              }}
              className={`w-7 h-7 rounded-full border-2 transition ${
                selectedColor?.colorCode === color.colorCode
                  ? "border-black scale-110"
                  : "border-gray-300 hover:scale-105"
              }`}
              style={{ backgroundColor: color.colorCode }}
            ></button>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No colors available</p>
        )}
      </div>

      {/* Product Details */}
      <div className="mt-4 bg-gradient-to-r from-gray-100 to-gray-200 p-4 rounded-lg shadow-inner">
        <h3
          className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-500 transition mb-1 flex items-center gap-2"
          onClick={handleImageOrNameClick}
        >
          <AiFillStar className="text-yellow-500" /> {name}
        </h3>
        <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
          <FaFutbol className="text-green-500" />
          <span className="font-semibold text-gray-700">Thể thao:</span> {sport}
        </p>
        <div className="flex items-center mt-2">
          <span className="text-red-600 text-xl font-bold">{price} đ</span>
          <span className="text-gray-400 line-through ml-2 text-sm">
            {(price * 1.7).toFixed(0)} đ
          </span>
          <span className="ml-2 text-green-500 bg-green-100 px-2 py-1 rounded-md font-semibold text-xs">
            -42%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
