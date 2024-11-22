'use client'
import { Breadcrumbs, Grid, Button, Typography, Box, IconButton, Chip, Paper } from '@mui/material';
import { ShoppingCartOutlined, SellIcon, DeleteOutlined } from '@mui/icons-material';
import NoProduct from '../../../../public/images/bro.png';
import Discount from '../../../../public/images/In4.png';
import React, { useState, useEffect } from 'react';
import Product from '../../../../public/images/Product.jpg';
import Navbar from '@/components/user/main-nav';
import Image from 'next/image';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from "@/components/ui/breadcrumb";
import { useCartStore } from '@/services/store/cartStore';

const Cart = () => {
  const fetchCart = useCartStore(state => state.fetchCart)
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchCart()
  },[])

  const decreaseCount = () => {
    // handle decreasing count
  };

  const increaseCount = () => {
    // handle increasing count
  };

  return (
    <div className="w-full h-screen bg-[#F9F9F9]">
        <Navbar />
        <div className="w-full h-auto flex flex-col items-center justify-center py-2">
        <div className="w-5/6 flex items-start justify-start py-2">
        <Breadcrumb>
            <BreadcrumbList className="justify-start">
              <BreadcrumbItem>
                <BreadcrumbLink href = "/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/cart" className="text-[#129AA6]">
                    Giỏ hàng
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="w-5/6 rounded-lg bg-white flex flex-col items-center justify-center">
      <Grid container spacing={2} className="ml-20 mt-2">
        {cartData && Array.isArray(cartData) && cartData.length > 0 ? (
          <Grid item xs={8}>
            <Paper className="bg-white p-4 shadow-lg">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={2}>
                    <Image
                        src={Product}
                        width={100}
                        height={150}
                        alt="TextBanner"
                        className="w-[100px] h-[150px] flex"
                    />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="h6" color="textPrimary">{cartData[0].name}</Typography>
                  <Typography variant="body2" color="textSecondary">Tác giả: {cartData[0].author}</Typography>
                  <Box display="flex" gap={1} mt={2}>
                    <Chip label="New" icon={<SellIcon />} color="default" />
                    <Chip label="Condition: Good" icon={<SellIcon />} color="default" />
                    <Chip label="Bìa mềm" icon={<SellIcon />} color="default" />
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" color="textPrimary">{cartData[0].price}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" color="textSecondary" sx={{ textDecoration: 'line-through' }}>{cartData[0].oldPrice}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Box display="flex" gap={1}>
                    <Button variant="outlined" onClick={decreaseCount}>-</Button>
                    <Button variant="outlined" disabled>{cartData[0].quantity}</Button>
                    <Button variant="outlined" onClick={increaseCount}>+</Button>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" color="error">
                    {parseFloat(cartData[0].quantity) * parseFloat(cartData[0].price)} đ
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <IconButton>
                    <DeleteOutlined sx={{ fontSize: 20 }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ) : (
          <Grid item xs={8}>
            <Paper className="bg-white h-72 p-4 shadow-lg flex flex-col justify-center items-center">
                <Image
                        src={NoProduct}
                        width={200}
                        height={150}
                        alt="TextBanner"
                        className="w-[200px] h-[150px] flex mt-5"
                    />
              <Typography variant="h6" color="textSecondary">Chưa có đơn hàng</Typography>
            </Paper>
          </Grid>
        )}

        <Grid item xs={4}>
          <Paper className="bg-white p-4 shadow-lg">
            <Typography variant="h6" color="textSecondary">Khách hàng</Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body1" color="textPrimary">Lê Minh Khiêm</Typography>
              <Typography variant="body1" color="textPrimary">0123456789</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary">KTX Khu A - ĐHQG HCM, phường Linh Trung, thành phố Thủ Đức, TP. HCM</Typography>
          </Paper>

          <Paper className="bg-white p-4 shadow-lg mt-5">
            <Typography variant="h6" color="textSecondary">Khuyến mãi</Typography>
            <Image
                src={Discount}
                width={200}
                height={150}
                alt="TextBanner"
                className="w-[200px] h-[150px] flex mt-5"
            />
          </Paper>

          <Paper className="bg-white p-4 shadow-lg mt-5">
            <Typography variant="h6" color="textSecondary">Thanh toán</Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body1" color="textSecondary">Tạm tính</Typography>
              <Typography variant="body1" color="textPrimary">124.000đ</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body1" color="textSecondary">Giảm giá</Typography>
              <Typography variant="body1" color="textPrimary">0đ</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mt={2}>
              <Typography variant="body1" color="textSecondary">Tổng</Typography>
              <Typography variant="h6" color="error">124.000đ</Typography>
            </Box>
            <Typography variant="body2" color="textSecondary" mt={1}>(Đã bao gồm VAT nếu có)</Typography>
          </Paper>

          <Button fullWidth variant="contained" color="primary" startIcon={<ShoppingCartOutlined />} className="mt-5">
            Thanh toán
          </Button>
        </Grid>
      </Grid>
      </div>
      </div>
    </div>
  );
};

export default Cart;
