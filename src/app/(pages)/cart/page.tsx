'use client';
import React, { useState, useEffect } from 'react';
import { Breadcrumbs, Grid, Button, Typography, Box, IconButton, Paper, ButtonGroup, Chip, Divider, TextField } from '@mui/material';
import PaletteIcon from '@mui/icons-material/Palette';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
import NoProduct from '../../../../public/images/bro.png';
import Discount from '../../../../public/images/In4.png';
import Navbar from '@/components/user/main-nav';
import Image from 'next/image';
import { useCartStore } from '@/services/store/cartStore';
import { CartState } from "@/services/interfaces/cartInterface";
import Loading from "@/components/user/loading";
import { useRouter } from 'next/navigation';
import jsCookie from 'js-cookie';

const Cart = () => {
  const { loading, itemCart, fetchCart, clearCart, increaseCart } = useCartStore();
  const router = useRouter();

  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    addressLine: '',
  });

  const [buyerId, setBuyerId] = useState<string | null>(null);

  useEffect(() => {
    fetchCart();
    const buyerIdFromCookie = jsCookie.get('buyerId');
    setBuyerId(buyerIdFromCookie || null);
  }, []);

  console.log('Buyid', buyerId)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePayment = () => {
    console.log('Shipping Info:', shippingInfo);
    console.log('Buyer ID:', buyerId);
  };

  const decreaseCount = async (id: string) => {
    try {
      const product: CartState = {
        sportProductVariantId: id,
        quantity: 1,
      };
      await clearCart(product);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const increaseCount = async (id: string) => {
    try {
      const product: CartState = {
        sportProductVariantId: id,
        quantity: 1,
      };
      await increaseCart(product);
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const handleRemove = async (id: string, quantity: number) => {
    try {
      const product: CartState = {
        sportProductVariantId: id,
        quantity: quantity,
      };
      await clearCart(product);
    } catch (error) {
      console.error("Failed to remove item from cart:", error);
    }
  };

  const handleNavigate = (endpoint: string) => {
    router.push(`/equipment/${endpoint}`);
  };

  return (
    <div className="w-full h-screen bg-[#F9F9F9]">
      <Navbar />
      {loading ? <Loading /> : (
        <div className="w-full h-auto flex flex-col items-center justify-center py-4">
          <div className="w-5/6 flex items-start justify-start py-2">
            <Breadcrumbs aria-label="breadcrumb">
              <Typography color="textPrimary">Home</Typography>
              <Typography color="textSecondary">Giỏ hàng</Typography>
            </Breadcrumbs>
          </div>
          <div className="w-5/6 rounded-lg bg-white flex flex-col items-center justify-center">
            <Grid container spacing={4} className="ml-20 mt-2 flex-wrap justify-start">
              <Grid item xs={8}>
                {itemCart?.items?.length > 0 ? (
                  itemCart.items.map((item) => (
                    <Paper className="bg-white p-4 shadow-xl mb-4 rounded-lg border border-gray-200 hover:shadow-2xl transition duration-300" key={item.id}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3} md={2}>
                          <Image
                            src={item.pictureUrl}
                            width={100}
                            height={150}
                            alt="Product"
                            className="w-[100px] h-[150px] flex rounded-md cursor-pointer"
                            onClick={() => handleNavigate(item.endPoint)} 
                          />
                        </Grid>
                        <Grid item xs={5} md={5}>
                          <Typography variant="h6" color="textPrimary" className="font-bold truncate cursor-pointer" onClick={() => handleNavigate(item.endPoint)}>
                            {item.name}
                          </Typography>
                          <Box display="flex" gap={1} mt={1}>
                            <Chip label="Freeship" color="success" variant="outlined" />
                            <Chip label="30% Off" color="error" variant="outlined" />
                          </Box>
                          <Box display="flex" gap={2} mt={2}>
                            {item.sizeValue && (
                              <Box display="flex" gap={2} alignItems="center">
                                <Box display="flex" alignItems="center" gap={1}>
                                  <FormatSizeIcon fontSize="small" color="primary" />
                                  <Typography variant="body1" color="textPrimary" className="font-medium text-sm">
                                    Size: {item.sizeValue}
                                  </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                  <PaletteIcon fontSize="small" color="primary" />
                                  <Typography variant="body1" color="textPrimary" className="font-medium text-sm">
                                    Màu: {item.colorName}
                                  </Typography>
                                </Box>
                              </Box>
                            )}
                          </Box>
                          <Typography variant="body1" color="textSecondary" className="mt-6">
                            Giá: <span className="font-bold text-gray-900">{item.price} đ</span>
                          </Typography>
                        </Grid>
                        <Grid item xs={3} md={2}>
                          <Box display="flex" flexDirection="column" alignItems="center">
                            <ButtonGroup variant="outlined" className="mt-2" aria-label="Basic button group">
                              <Button variant="outlined" onClick={() => decreaseCount(item.id)} className="text-red-500 hover:bg-red-100">
                                <RemoveIcon />
                              </Button>
                              <Button variant="outlined" disabled>
                                {item.quantity}
                              </Button>
                              <Button variant="outlined" onClick={() => increaseCount(item.id)} className="text-green-500 hover:bg-green-100">
                                <AddIcon />
                              </Button>
                            </ButtonGroup>
                          </Box>
                        </Grid>
                        <Grid item xs={2} md={2} className="flex flex-col justify-center items-center">
                          <Typography variant="h6" color="red" className="font-semibold text-lg">{itemCart?.totalPrice} đ</Typography>
                        </Grid>
                        <Grid item xs={1} md={1} className="flex justify-end">
                          <IconButton onClick={() => handleRemove(item.id, item.quantity)} className="text-red-600 hover:bg-red-50 transition duration-200">
                            <DeleteOutlined sx={{ fontSize: 20 }} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Paper>
                  ))
                ) : (
                  <Paper className="bg-white h-72 p-4 shadow-lg flex flex-col justify-center items-center rounded-lg">
                    <Image
                      src={NoProduct}
                      width={200}
                      height={150}
                      alt="No Product"
                      className="w-[200px] h-[150px] flex mt-5"
                    />
                    <Typography variant="h6" color="textSecondary">
                      Giỏ hàng của bạn trống
                    </Typography>
                  </Paper>
                )}
              </Grid>

              <Grid item xs={4}>
              <Paper className="bg-white p-6 shadow-lg rounded-lg">
  <Typography variant="h6" color="textPrimary" className="font-bold mb-4">Khách hàng</Typography>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Họ"
        name="firstName"
        variant="standard"
        fullWidth
        value={shippingInfo.firstName}
        onChange={handleInputChange}
        className="mt-2"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        label="Tên"
        name="lastName"
        variant="standard"
        fullWidth
        value={shippingInfo.lastName}
        onChange={handleInputChange}
        className="mt-2"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Email"
        name="email"
        variant="standard"
        fullWidth
        value={shippingInfo.email}
        onChange={handleInputChange}
        className="mt-2"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Số điện thoại"
        name="phoneNumber"
        variant="standard"
        fullWidth
        value={shippingInfo.phoneNumber}
        onChange={handleInputChange}
        className="mt-2"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        label="Địa chỉ giao hàng"
        name="addressLine"
        variant="standard"
        fullWidth
        value={shippingInfo.addressLine}
        onChange={handleInputChange}
        className="mt-2"
        InputLabelProps={{ shrink: true }}
      />
    </Grid>
  </Grid>
</Paper>

                {/* <Paper className="bg-white p-4 shadow-lg mt-5">
                  <Typography variant="h6" color="textSecondary">Khuyến mãi</Typography>
                  <Image
                    src={Discount}
                    width={200}
                    height={150}
                    alt="Discount"
                    className="w-[200px] h-[150px] flex mt-5"
                  />
                </Paper> */}

                <Paper className="bg-white p-4 shadow-lg mt-5">
                  <Typography variant="h6" color="textSecondary">Thanh toán</Typography>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="body1" color="textSecondary">Tạm tính</Typography>
                    <Typography variant="body1" color="textPrimary">{itemCart.totalPrice} đ</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="body1" color="textSecondary">Giảm giá</Typography>
                    <Typography variant="body1" color="textPrimary">0 đ</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Typography variant="h6" color="textSecondary">Tổng cộng</Typography>
                    <Typography variant="h6" color="textPrimary">{itemCart.totalPrice} đ</Typography>
                  </Box>
                  <Divider className = 'py-1'/>
                  <Button variant="contained" color="primary" fullWidth className="mt-4" onClick={handlePayment}>
                    <ShoppingCartOutlined /> Thanh toán
                  </Button>
                </Paper>
                
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
