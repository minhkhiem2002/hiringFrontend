'use client';
import { useState } from "react";
import Image from "next/image";
import { Button, Breadcrumbs, Chip, Rating } from "@mui/material";
import { Star, ShoppingCart, FavoriteBorder } from "@mui/icons-material";
import SellerImage from "../../../../public/images/Product.jpg";
import ProductImage from "../../../../public/images/Product.jpg";
import Navbar from "@/components/user/main-nav";

const Detail = () => {
  const [count, setCount] = useState(1);
  const [selectedCondition, setSelectedCondition] = useState("Good");
  const [selectedCover, setSelectedCover] = useState("Bìa mềm");
  const [selectedColor, setSelectedColor] = useState(null);

  const conditions = ["Fine", "Good", "Very Good", "Fair", "Poor", "Reading Copy"];
  const covers = ["Bìa cứng", "Bìa mềm"];
  const colors = [ProductImage, ProductImage, ProductImage, ProductImage];

  const decreaseCount = () => {
    if (count > 1) setCount(count - 1);
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const handleAddToCart = () => {
    const product = {
      name: "Bí Mật Của May Mắn",
      quantity: count,
      author: "Alex Rovia",
      price: "124.000đ",
      oldPrice: "150.000đ",
      condition: selectedCondition,
      cover: selectedCover,
      color: selectedColor,
    };
    console.log("Product added to cart:", product);
  };

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="w-[90%] mx-auto mt-4">
        <Breadcrumbs className="text-green-600">
          <a href="/">Trang chủ</a>
          <a href="/">Sách kỹ năng sống</a>
          <span className="text-gray-700">Bí mật của may mắn</span>
        </Breadcrumbs>

        {/* Main Product Section */}
        <div className="bg-white shadow-md p-4 flex mt-4">
          {/* Product Image */}
          <div className="flex-1 flex justify-center">
            <Image
              src={ProductImage}
              alt="Product"
              width={450}
              height={600}
              className="p-4"
            />
          </div>

          {/* Product Details */}
          <div className="flex-[2] flex flex-col space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">Bí Mật Của May Mắn</h1>
            <p className="text-lg font-medium text-gray-600">
              Tác giả: <span className="text-green-600">Alex Rovia</span>
            </p>
            <div className="flex items-center space-x-2">
              <Rating value={4} readOnly />
              <p className="text-gray-600 text-sm">
                3.9 (2130 ratings) by{" "}
                <span className="text-teal-600 font-medium">Casso</span>
              </p>
            </div>
            <div className="flex space-x-2">
              <Chip label="New" variant="outlined" />
              <Chip label="Condition: Good" variant="outlined" />
              <Chip label="Bìa mềm" variant="outlined" />
              <Chip label="Free Shipping" variant="outlined" />
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <p className="text-red-600 text-2xl font-semibold">124.000đ</p>
              <p className="text-gray-500 line-through">150.000đ</p>
              <p className="text-red-600 text-lg">-22%</p>
            </div>

            {/* Product Options */}
            <div>
              <p className="font-medium text-gray-800">Condition:</p>
              <div className="flex space-x-2 mt-2">
                {conditions.map((condition) => (
                  <Button
                    key={condition}
                    variant={condition === selectedCondition ? "contained" : "outlined"}
                    onClick={() => setSelectedCondition(condition)}
                  >
                    {condition}
                  </Button>
                ))}
              </div>
              <p className="font-medium text-gray-800 mt-4">Loại bìa:</p>
              <div className="flex space-x-2 mt-2">
                {covers.map((cover) => (
                  <Button
                    key={cover}
                    variant={cover === selectedCover ? "contained" : "outlined"}
                    onClick={() => setSelectedCover(cover)}
                  >
                    {cover}
                  </Button>
                ))}
              </div>
              <p className="font-medium text-gray-800 mt-4">Màu sắc:</p>
              <div className="flex space-x-4 mt-2">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className={`border ${
                      selectedColor === index ? "border-blue-500" : "border-gray-300"
                    } p-1 rounded`}
                    onClick={() => setSelectedColor(index)}
                  >
                    <Image src={color} alt={`Color ${index + 1}`} width={100} height={100} />
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center border rounded">
                <Button onClick={decreaseCount}>-</Button>
                <span className="px-4">{count}</span>
                <Button onClick={increaseCount}>+</Button>
              </div>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outlined"
                startIcon={<FavoriteBorder />}
                color="info"
              >
                Thêm vào ưa thích
              </Button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md p-4 mt-4">
            <h2 className="text-xl font-semibold">Thông tin chi tiết</h2>
            <div className="grid grid-cols-4 mt-4 gap-4">
                <div>
                <p>Seller:</p>
                <p>Nhà xuất bản:</p>
                <p>Kích thước:</p>
                <p>Loại bìa:</p>
                <p>Condition:</p>
                <p>Số trang:</p>
                </div>
                <div>
                <p>Casso</p>
                <p>Alex Rovia</p>
                <p>13 x 21 cm</p>
                <p>Good</p>
                <p>154</p>
                </div>
                <div className="col-span-2 flex justify-end">
                <Image
                    src={SellerImage}
                    alt="Seller"
                    width={150}
                    height={150}
                />
                </div>
            </div>
            </div>
      </div>
    </div>
  );
};

export default Detail;
