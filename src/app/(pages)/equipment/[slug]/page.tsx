'use client';
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Breadcrumbs, Chip, Rating } from "@mui/material";
import { Star, ShoppingCart, FavoriteBorder } from "@mui/icons-material";
import SellerImage from "../../../../../public/images/Product.jpg";
import Navbar from "@/components/user/main-nav";
import { useEquipmentStore } from "@/services/store/equipmentStore";
import { useCartStore } from "@/services/store/cartStore";
import { CartState } from "@/services/interfaces/cartInterface";
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
        sportProductVariantId: selectedSizeData.id, 
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
          <div className="bg-white shadow-md p-4 flex mt-4 space-x-4">
            <div className="flex-1 flex justify-center items-stretch">
              <Image
                src={equipment?.imageEndPoints?.[0]?.pictureUrl || SellerImage}
                alt="Product"
                width={450}
                height={600}
                className="p-4 object-contain"
              />
            </div>

            {/* Product Details */}
            <div className="flex-[2] flex flex-col space-y-4 mt-8">
              <h1 className="text-3xl font-bold text-gray-800">{equipment?.name || "Sản phẩm"}</h1>
              
              {/* Rating and Reviews */}
              <div className="flex items-center space-x-2">
                <Rating value={4} readOnly size="large" />
                <p className="text-gray-600 text-sm">
                  4.0 (1000 đánh giá)
                </p>
              </div>

              {/* Free Shipping and Discount */}
              <div className="flex space-x-2 mt-8">
                <Chip label="Free Shipping" variant="filled" color="success" />
                <Chip label="30% OFF" variant="outlined" color="error" />
              </div>

              <div className="flex items-center space-x-4 mt-8">
                <p className="text-red-600 text-2xl font-semibold">{equipment?.price || "0"}đ</p>
                <p className="text-gray-500 line-through">
                  {(equipment?.price ? equipment.price * 1.5 : 0).toFixed(0)}đ
                </p>
              </div>

              {/* Product Options */}
              <div className = 'space-y-4'>
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
              <div className="flex items-center space-x-2 space-y-8 mt-2">
                <div className="flex items-center border rounded mt-8">
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

          {/* Product Description Section */}
          <div className="bg-white shadow-md p-4 mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Mô tả sản phẩm</h2>
            <p className="text-gray-600 mt-3">
              Sản phẩm này được thiết kế để mang lại sự thoải mái và hiệu suất tối ưu cho người sử dụng. Được làm từ vật liệu chất lượng cao, phù hợp với nhiều môn thể thao khác nhau, giúp bạn tận hưởng những phút giây thể thao tuyệt vời nhất. Với các kích thước đa dạng và kiểu dáng đẹp mắt, sản phẩm sẽ là sự lựa chọn hoàn hảo cho các bạn đam mê thể thao, từ những người mới bắt đầu đến những vận động viên chuyên nghiệp.
            </p>

            <p className="text-gray-600 mt-3">
              Hãy trải nghiệm sự khác biệt với thiết kế hiện đại, phù hợp với xu hướng thể thao hiện đại của Gen Z. Dù bạn đang tìm kiếm một sản phẩm thể thao để tập luyện hay tham gia các giải đấu, sản phẩm này sẽ giúp bạn tự tin hơn trong mỗi lần sử dụng. 
            </p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Tính năng nổi bật:</h3>
              <ul className="list-disc pl-6 mt-3 text-gray-600">
                <li>Chất liệu bền bỉ, thoáng khí, dễ dàng vệ sinh</li>
                <li>Thiết kế nhỏ gọn, tiện lợi cho việc di chuyển và bảo quản</li>
                <li>Kích thước đa dạng, phù hợp với mọi nhu cầu sử dụng</li>
                <li>Giảm thiểu tối đa độ ma sát, giúp tăng hiệu quả tập luyện</li>
                <li>Phong cách trẻ trung, hiện đại, phù hợp với xu hướng thể thao Gen Z</li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-gray-800">Hướng dẫn bảo quản:</h3>
              <p className="text-gray-600 mt-3">
                Để sản phẩm luôn giữ được độ bền và đẹp như mới, bạn nên làm sạch sản phẩm sau mỗi lần sử dụng. Tránh tiếp xúc với các hóa chất mạnh và bảo quản sản phẩm ở nơi khô ráo, thoáng mát. Không nên để sản phẩm tiếp xúc trực tiếp với ánh nắng mặt trời hoặc các nguồn nhiệt.
              </p>
            </div>
          </div>

          {/* Thông số kỹ thuật */}
          <div className="bg-white shadow-md p-4 mt-6">
            <h2 className="text-2xl font-bold text-gray-800">Thông số kỹ thuật</h2>
            <table className="w-full mt-3 table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border-b p-2 text-left">Thông số</th>
                  <th className="border-b p-2 text-left">Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b p-2">Kích thước</td>
                  <td className="border-b p-2">{equipment?.dimensions || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border-b p-2">Trọng lượng</td>
                  <td className="border-b p-2">{equipment?.weight || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border-b p-2">Chất liệu</td>
                  <td className="border-b p-2">{equipment?.material || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border-b p-2">Màu sắc</td>
                  <td className="border-b p-2">{equipment?.color || "N/A"}</td>
                </tr>
                <tr>
                  <td className="border-b p-2">Hướng dẫn sử dụng</td>
                  <td className="border-b p-2">{equipment?.usage || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
