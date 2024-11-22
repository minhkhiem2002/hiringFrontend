'use client';
import { useState } from 'react';
import Image from 'next/image';
import Logo from '../../../../public/images/Logo.png';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useForgetPasswordStore } from '@/services/store/authStore';

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [decodedToken, setDecodedToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      password: '',
    },
  });
  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const { forgetPassword, resetPassword } = useForgetPasswordStore();

  const handleNextStep = async () => {
    if (step === 1) {
      if (!email) {
        toast.error('Vui lòng nhập email!');
        return;
      }
      const response = await forgetPassword(email);
      if (response) {
        toast.success('Mã OTP đã được gửi đến email của bạn!', { autoClose: 1500 });
        setStep(2);
      } else {
        toast.error('Có lỗi xảy ra, vui lòng kiểm tra lại', { autoClose: 1500 });
      }
    }
  };

  const handleSubmit = async (data: { password: string }) => {
    if (!decodedToken) {
      toast.error('Vui lòng nhập mã OTP!');
      return;
    }
    if (!data.password) {
      toast.error('Vui lòng nhập mật khẩu mới!');
      return;
    }
    const response = await resetPassword({ email, decodedToken, password: data.password });
    if (response) {
      toast.success('Đổi mật khẩu thành công!');
      router.push('/login');
    } else {
      toast.error('Đổi mật khẩu thất bại, vui lòng thử lại');
    }
  };

  return (
    <>
      <div
        className="w-full h-full flex justify-center items-center"
        style={{
          backgroundImage: `url('/images/bg_logre.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <Box className="flex flex-col items-center bg-white p-4 rounded-xl shadow-xl w-1/4">
          <Image src={Logo} width={100} height={50} alt="Logo" />
          <h2 className="text-2xl mb-4">Quên mật khẩu</h2>

          {step === 1 && (
            <>
              <TextField
                label="Email"
                type="email"
                placeholder="Nhập email của bạn"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleNextStep}
              >
                Gửi OTP
              </Button>
            </>
          )}

          {step === 2 && (
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <TextField
                label="Mã OTP"
                type="text"
                placeholder="Nhập mã OTP"
                fullWidth
                margin="normal"
                value={decodedToken}
                onChange={(e) => setDecodedToken(e.target.value)}
                required
              />
              <TextField
                label="Mật khẩu mới"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu mới"
                {...form.register('password')}
                fullWidth
                margin="normal"
                required
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Đổi mật khẩu
              </Button>
            </form>
          )}

          <Button
            variant="text"
            color="inherit"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => router.push('/login')}
          >
            Quay lại trang đăng nhập
          </Button>
        </Box>
      </div>
      <ToastContainer />
    </>
  );
};

export default ForgetPassword;
