'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Breadcrumbs, Chip, Rating } from "@mui/material";
import { Star, ShoppingCart, FavoriteBorder } from "@mui/icons-material";
import SellerImage from "../../../../../public/images/Product.jpg";
import Navbar from "@/components/user/main-nav";
import { useEquipmentStore } from "@/services/store/equipmentStore";
import { useCartStore } from "@/services/store/cartStore";
import { CartState } from "@/services/interfaces/cartInterface"
import { ToastContainer, toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/components/user/loading";

const Detail = ({ params }: { params: { slug: string } }) => {
  const id = params.slug; // ID sản phẩm
  const [count, setCount] = useState(1); 
  const [selectedSize, setSelectedSize] = useState(""); 

  const { loading, equipment, fetchEquipmentDetail } = useEquipmentStore();
  const { addToCart } = useCartStore();

  // Gọi API chi tiết sản phẩm
  useEffect(() => {
    if (!equipment || equipment.id !== id) {
      fetchEquipmentDetail(id);
    }

    // Đặt size mặc định khi có sizes
    if (equipment?.sizes?.length) {
      setSelectedSize(equipment.sizes[0].value);
    }
  }, [id]); // Chỉ gọi lại khi id thay đổi

  // Giảm số lượng
  const decreaseCount = () => {
    if (count > 1) setCount(count - 1);
  };

  // Tăng số lượng
  const increaseCount = () => {
    if (selectedSize) {
      const stock = equipment?.sizes?.find((size) => size.value === selectedSize)?.quantityInStock || 0;
      if (count < stock) setCount(count + 1);
    }
  };

  const handleAddToCart = async () => {
    const selectedSizeData = equipment?.sizes?.find((size) => size.value === selectedSize);
    
    if (selectedSizeData) {
      const product: CartState = {
        sportProductVariantId: selectedSizeData.id, // Lấy id của size đã chọn
        quantity: count,
      };
  
      try {
        addToCart(product);
        console.log("Item added to cart successfully:", product);
      } catch (error) {
        console.error("Failed to add item to cart:", error);
      }
    } else {
      console.error("Selected size not found");
    }
  };
  

  return (
    <div className="bg-gray-100">
      <Navbar />
      <ToastContainer />
      {loading ? <Loading/> : (
        <div className="w-[90%] mx-auto mt-4">
        <Breadcrumbs className="text-green-600">
          <a href="/">Trang chủ</a>
          <a href="/">Sản phẩm</a>
          <span className="text-gray-700">{equipment?.name || "Sản phẩm"}</span>
        </Breadcrumbs>

        {/* Main Product Section */}
        <div className="bg-white shadow-md p-4 flex mt-4">
          <div className="flex-1 flex justify-center">
            <Image
              src={equipment?.imageEndPoints?.[0]?.pictureUrl || SellerImage}
              alt="Product"
              width={450}
              height={600}
              className="p-4"
            />
          </div>

          {/* Product Details */}
          <div className="flex-[2] flex flex-col space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">{equipment?.name || "Sản phẩm"}</h1>
            <div className="flex items-center space-x-2">
              <Rating value={4} readOnly />
              <p className="text-gray-600 text-sm">
                4.0 (1000 đánh giá)
              </p>
            </div>
            <div className="flex space-x-2">
              <Chip label="Free Shipping" variant="outlined" />
            </div>
            <div className="flex items-center space-x-4 mt-4">
              <p className="text-red-600 text-2xl font-semibold">{equipment?.price || "0"}đ</p>
              <p className="text-gray-500 line-through">
                {(equipment?.price ? equipment.price * 1.5 : 0).toFixed(0)}đ
              </p>
              <p className="text-red-600 text-lg">-30%</p>
            </div>

            {/* Product Options */}
            <div>
              <p className="font-medium text-gray-800">Size:</p>
              <div className="flex space-x-2 mt-2">
                {equipment?.sizes?.map((size) => (
                  <Button
                    key={size.id}
                    variant={selectedSize === size.value ? "contained" : "outlined"}
                    onClick={() => setSelectedSize(size.value)}
                    disabled={size.quantityInStock === 0}
                    className={size.quantityInStock === 0 ? "opacity-50" : ""}
                  >
                    {size.value}
                  </Button>
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
                disabled={!selectedSize}
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
      </div>
      )}
      
    </div>
  );
};

export default Detail;
