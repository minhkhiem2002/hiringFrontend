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
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useSignUpStore } from '@/services/store/authStore'
import { RegisterBodyType } from "@/schemaValidations/auth.schema"
import { ToastContainer, toast } from 'react-toastify'

const Register = () => {
  const router = useRouter()
  const form = useForm<RegisterBodyType>({
    defaultValues: {
      Fname: '',
      Lname: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event: any) => {
    event.preventDefault();
  };
  const register = useSignUpStore((state) => state.register)

  const onSubmit = async (values: RegisterBodyType) => {
    try {
      const response = await register(
        values.Fname,
        values.Lname,
        values.email,
        values.password,
        values.confirmPassword
      )
      if (response != null) {
        toast.success('Đăng ký thành công', { autoClose: 1500 });
        setTimeout(async () => {
          router.push('/login');
        }, 2000);
      }
    } catch (err) {
      toast.error('Đăng ký không thành công', { autoClose: 1500 });
      console.error(err)
    }
  }

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
      <h2 className="text-2xl">Đăng ký</h2>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4">
          <TextField 
            label="Họ" 
            {...form.register("Fname")} 
            fullWidth 
            required
            margin="normal"
            autoComplete="name" 
          />
          <TextField 
            label="Tên" 
            {...form.register("Lname")} 
            fullWidth 
            required
            margin="normal"
            autoComplete="name" 
          />
        </div>
        <TextField 
          id="outlined-controlled"
          label="Email" 
          type="email"
          autoComplete="email"
          {...form.register("email")}
          variant="outlined" 
          fullWidth 
          required
          margin="normal" 
        />
        <TextField 
          id="outlined-controlled"
          type={showPassword ? "text" : "password"}
          label="Mật khẩu"  
          {...form.register("password")} 
          fullWidth 
          required
          margin="normal"
          InputProps={{
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
        <TextField 
          label="Xác nhận mật khẩu" 
          type={showConfirmPassword ? "text" : "password"} 
          {...form.register("confirmPassword")} 
          fullWidth 
          required
          margin="normal"
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 1, mb: 2, borderRadius: "8px", textTransform: "none" }}
          className="rounded-[3px]"
        >
          Tạo tài khoản
        </Button>
      </form>
      <div>
        Đã có tài khoản? 
        <Link href="/login">
        <span className = 'text-blue-600 pl-2'>Đăng nhập</span>
        </Link>
      </div>
      </Box>
    </div>
    <ToastContainer /> 
    </>
  )
}

export default Register
