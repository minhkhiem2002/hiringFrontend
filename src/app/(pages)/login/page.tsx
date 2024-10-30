'use client'
import { useState } from "react";
import Image from 'next/image'
import Logo from '../../../../public/images/Logo.png'
import { useForm } from "react-hook-form"
import {
  Box,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import HttpsIcon from "@mui/icons-material/Https";
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/services/store/authStore'
import { useUserStore } from '@/services/store/userStore'
import { LoginBodyType } from "@/schemaValidations/auth.schema"
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = () => {
  const router = useRouter()
  const form = useForm<LoginBodyType>({
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const login = useAuthStore(state => state.login)
  const getInfo = useUserStore((state) => state.getInfo);

  const onSubmit = async (values: LoginBodyType) => {
    try {
      const response = await login(values.email, values.password);
      if (response != null) {
        if (response.role == 'Customer') {
          toast.success('Đăng nhập thành công', { autoClose: 1500 });
          
          sessionStorage.setItem('userId', response.id);
  
          await getInfo(response.id);
          setTimeout(async () => {
            router.push('/');
          }, 2000);
        } 
        else if (response.role == 'Admin') {
          toast.success('Đăng nhập thành công', { autoClose: 1500 });
          
          sessionStorage.setItem('userId', response.id);
  
          await getInfo(response.id);
          setTimeout(async () => {
            router.push('/admin');
          }, 2000);
        }
        else {
          toast.error('Bạn chưa là thành viên');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Đăng nhập thất bại!');
    }
  };
  

  return (
    <>
      <div
        className="w-full h-full flex justify-center items-center"
        style={{
          backgroundImage: `url('/images/bg_logre.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      > 
        <Box className="flex flex-col items-center bg-white p-4 rounded-xl shadow-xl w-1/4">
        <Image src={Logo} width={100} height={50} alt="Logo" />
        <h2 className="text-2xl">Đăng nhập</h2>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <TextField
              id="outlined-controlled"
              label="Email"
              autoComplete="email"
              placeholder="Nhập email"
              type="email"
              {...form.register("email")}
              fullWidth
              margin="normal"
              required
              autoFocus
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="outlined-controlled"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              variant="outlined"
              placeholder="Nhập mật khẩu"
              {...form.register("password")}
              fullWidth
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Grid container>
                    <Grid item xs>
                      <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        className="text-neutral-500 text-[0.875rem]"
                        label="Ghi nhớ đăng nhập"
                      />
                    </Grid>
                    <Grid item className="pt-2">
                      <Link href="/forgetpassword">
                        <span className="mt-4 text-base text-blue-600">Quên mật khẩu?</span>
                      </Link>
                    </Grid>
                  </Grid>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              fullWidth
              sx={{ mt: 1, mb: 2, borderRadius: "8px", textTransform: "none" }}
              className="rounded-[3px]"
            >
              Đăng nhập
            </Button>
          </div>
        </form>
        <div>
          Chưa có tài khoản? 
          <Link href="/register">
            <span className = 'text-blue-600 pl-2'>Đăng ký</span>
          </Link>
        </div>
        </Box>
      </div>
      <ToastContainer /> 
    </>
  )
}

export default Login
