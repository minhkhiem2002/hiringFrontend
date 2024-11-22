"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ColorEndpoint {
  endPoint: string;
  colorCode: string;
}

interface CardProductProps {
  pictureUrl: string;
  colorEndpoints: ColorEndpoint[];
  price: number;
  name: string;
}

const CardProduct = ({
  pictureUrl,
  colorEndpoints = [],
  price,
  name,
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
    <div className="w-[350px] h-[450px] bg-white shadow-md rounded-lg p-4 flex flex-col justify-between hover:shadow-lg transition-transform cursor-pointer">
      <div className="relative" onClick={handleImageOrNameClick}>
        <div className="absolute top-2 left-2 bg-yellow-400 text-white px-2 py-1 text-sm font-semibold rounded">
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

      <div className="flex space-x-2 mt-2">
        {colorEndpoints.length > 0 ? (
          colorEndpoints.map((color) => (
            <a
              key={color.endPoint}
              href={color.endPoint}
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior for SPA navigation
                handleColorClick(color);
              }}
            >
              <div
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor?.colorCode === color.colorCode
                    ? "border-black"
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color.colorCode }}
              ></div>
            </a>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No colors available</p>
        )}
      </div>

      <div className="mt-4">
        <h3
          className="text-lg font-semibold text-gray-800 cursor-pointer"
          onClick={handleImageOrNameClick}
        >
          {name}
        </h3>
        <div className="flex items-center mt-2">
          <span className="text-red-600 text-lg font-bold">{price} đ</span>
          <span className="text-gray-400 line-through ml-2 text-sm">
            {(price * 1.7).toFixed(0)} đ
          </span>
          <span className="ml-2 text-yellow-500 font-semibold text-sm">
            -42%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
