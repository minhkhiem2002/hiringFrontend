'use client';
import { useState, useEffect,useRef } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import dataTimePrice from '@/ultils/dataTimePrice.json';
import Navbar from "@/components/user/main-nav";
import Image from 'next/image';
import DetailImage from "../../../../../../public/images/Detail.jpg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Divider, Button } from '@mui/material';
import * as signalR from "@microsoft/signalr";
import { useRouter, redirect } from 'next/navigation'
import axios from "axios";
import { useFieldStore } from '@/services/store/fieldStore';
import { DetailData } from '@/services/interfaces/fieldInterface';
import { useBookingStore } from '@/services/store/bookingStore';
import { Booking } from '@/services/interfaces/bookingInterface';

const steps = ['Chọn thời gian', 'Nhập thông tin', 'Xác nhận & Thanh toán'];

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  status: boolean; 
}
export default function BookingPage({ params }: { params: { slug: string } }) {
  const id = params.slug;
  const router = useRouter()
  const [activeStep, setActiveStep] = useState(0);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState<string | null>(today);

  const field = useFieldStore(state => state.field)
  const fetchFieldData = useFieldStore(state => state.fetchFieldData)

  console.log('Field', field)
  const fetchBookingData = useBookingStore(state => state.fetchBookingData)

  const [fieldBooking, setFieldBooking] = useState<DetailData | null>(field)

  useEffect(() => {
    fetchFieldData(id)
  },[])

  useEffect(() => {
    if (field) {
      setFieldBooking(field)
    }
  }, [field])


  const fieldRef = useRef(fieldBooking)

  useEffect(() => {
    const newTotal = selectedTimes.reduce((acc, id) => {
      const price = timeSlots.find((t: TimeSlot) => t.id === id)?.price || 0;
      return acc + price;
    }, 0);
    setTotalPrice(newTotal);
  }, [selectedTimes]);

  const fetchTimeSlots = async () => {
    try {
      const response = await axios.get(
        `https://sportappdemo.azurewebsites.net/api/SportField/GetScheduler`, {
          params: {
            EndPoint: decodeURIComponent(id),
            BookingDate: selectedDate,
          },
        }
      );
      setTimeSlots(response.data);
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    fetchTimeSlots();

    // Thiết lập kết nối SignalR
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://sportappdemo.azurewebsites.net/getschedulerhub')
      .withAutomaticReconnect()
      .build();

    connection.on(
      "GetScheduler",
      (sportFieldId: number, timeSlotId: string) => {
        // Cập nhật trạng thái khung giờ khi nhận tín hiệu từ SignalR
        setTimeSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.id === timeSlotId ? { ...slot, status: true } : slot
          )
        );
      }
    );

    connection
      .start()
      .then(() => {
        console.log("Kết nối thành công tới SignalR BookingHub");
      })
      .catch((err) => {
        console.error('Connection error',err.toString());
      });

    return () => {
      connection.stop();
    };
  }, []);

  useEffect(() => {
    fetchTimeSlots();

    // Thiết lập kết nối SignalR
    const connection = new signalR.HubConnectionBuilder()
      .withUrl('https://sportappdemo.azurewebsites.net/getschedulerhub')
      .withAutomaticReconnect()
      .build();

    connection.on(
      "GetScheduler",
      (sportFieldId: number, timeSlotId: string) => {
        setTimeSlots((prevSlots) =>
          prevSlots.map((slot) =>
            slot.id === timeSlotId ? { ...slot, status: true } : slot
          )
        );
      }
    );

    connection
      .start()
      .then(() => {
        console.log("Kết nối thành công tới SignalR BookingHub");
      })
      .catch((err) => {
        console.error('Connection error',err.toString());
      });

    return () => {
      connection.stop();
    };
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
  };

  console.log(selectedTimes)

  const handleTimeClick = (id: string, status: boolean) => {
    if (status) return;
    setSelectedTimes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((t) => t !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleBooking = async () => {
    const dataBooking: Booking = {
      name: 'Booking',
      totalPrice: totalPrice,
      sportFieldId: fieldBooking? fieldBooking.id : '',
      customerId: sessionStorage.getItem('roleId'),
      note: 'Note',
      timeBookedIds: selectedTimes,
      bookingDate: selectedDate
    }
    const response = await fetchBookingData(dataBooking)
    if (response) {
      // Redirect to VNPay sandbox or production URL based on environment
      window.location.href = response;
  } else {
      // Handle cases where paymentUrl is missing or API call fails
      console.error("Payment URL not found in the response.");
      // You could show a user-friendly error message here
  }
  }

  const handleUserInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className='w-full bg-slate-100 h-fit'>
      <Navbar />
      <div className="w-[90%] ml-[5%]">
        <div className="w-5/6 flex items-start justify-start py-2">
          <Breadcrumb>
            <BreadcrumbList className="justify-start">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/filter" className="text-[#129AA6]">Sân</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className='px-2 py-2 rounded-xl bg-white'>
          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          <div className="mt-4">
            {activeStep === 0 && (
              <Grid container columnSpacing={4} className='min-h-[470px]'>
                {/* Left Column - Choose Time */}
                <Grid item xs={8}>
                  <div className='flex justify-center items-center'>
                    <input
                      type="date"
                      className="p-1 border mb-4"
                      value={selectedDate || ""}
                      onChange={handleDateChange}
                      title="Chọn ngày"
                    />
                  </div>
                  <h2 className="text-lg font-bold">Chọn thời gian</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {timeSlots.map(({ id,startTime,endTime, price, status }: TimeSlot) => (
                      <button
                        key={id}
                        className={`p-3 border ${status ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : selectedTimes.includes(id) ? 'bg-green-500' : 'bg-white'}`}
                        onClick={() => handleTimeClick(id, status)}
                        disabled={status}
                        style={{ margin: '6px' }}
                      >
                        {startTime} - {endTime} - ${price}
                      </button>
                    ))}
                  </div>
                </Grid>

                {/* Right Column - Booking Details */}
                <Grid item xs={4}>
                  <Box className="p-4 bg-gray-100 rounded">
                    <div className='min-h-[380px]'>
                      <Grid container columnSpacing={1}>
                        <Grid item xs={4}>
                          <Image
                            src={fieldBooking ? fieldBooking.images[0].pictureUrl : DetailImage}
                            alt="Football field"
                            width={150}
                            height={80}
                            className="rounded"
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <h3 className="text-md">{fieldBooking?.name}</h3>
                          <p className="text-sm">{fieldBooking?.address}</p>
                          <p className="text-sm">{fieldBooking?.type}</p>
                        </Grid>
                      </Grid>
                      <h4 className="mt-4 text-md font-bold">Ngày: <span className = 'font-medium'>{selectedDate}</span></h4>
                      <h4 className="mt-4 text-md font-bold">Thời gian đặt sân</h4>
                      <ul className="grid grid-cols-3 gap-2">
                      {selectedTimes.map((id) => {
                        const timeSlot = timeSlots.find((slot) => slot.id === id);
                        return (
                          <li key={id} className="text-center">
                            {timeSlot ? `${timeSlot.startTime} - ${timeSlot.endTime}` : ''}
                          </li>
                        );
                      })}
                    </ul>
                    </div>
                    <Divider />
                    <p className="font-bold mt-2 flex justify-between">
                      <span>Tổng:</span>
                      <span>${totalPrice}</span>
                    </p>
                  </Box>
                </Grid>
              </Grid>
            )}

            {activeStep === 1 && (
              <Grid container columnSpacing={4} className = 'min-h-[470px]'>
              {/* Left Column - User Info */}
              <Grid item xs={8}>
                <h2 className="text-lg font-bold">Nhập thông tin</h2>
                <form className="flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="Họ và Tên"
                    className="p-2 border"
                    value={userInfo.name}
                    onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="p-2 border"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    className="p-2 border"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                  />
                </form>
              </Grid>

              {/* Right Column - Booking Details */}
              <Grid item xs={4}>
              <Box className="p-4 bg-gray-100 rounded">
                  <div className = 'min-h-[380px]'>
                  <Grid container columnSpacing={1}>
                        <Grid item xs={4}>
                          <Image
                            src={fieldBooking ? fieldBooking.images[0].pictureUrl : DetailImage}
                            alt="Football field"
                            width={150}
                            height={80}
                            className="rounded"
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <h3 className="text-md">{fieldBooking?.name}</h3>
                          <p className="text-sm">{fieldBooking?.address}</p>
                          <p className="text-sm">{fieldBooking?.type}</p>
                        </Grid>
                      </Grid>
                  {/* Hiển thị thông tin người dùng đã nhập */}
                  <h4 className="mt-4 text-md font-bold">Thông tin người dùng</h4>
                  <p className="text-md">Họ và Tên: <span className="font-medium">{userInfo.name}</span></p>
                  <p className="text-md">Email: <span className="font-medium">{userInfo.email}</span></p>
                  <p className="text-md">Số điện thoại: <span className="font-medium">{userInfo.phone}</span></p>

                  {/* Selected Times and Total Price */}
                  <h4 className="mt-4 text-md font-bold">Ngày: <span className = 'font-medium'>{selectedDate}</span></h4>
                  <h4 className="mt-4 text-md font-bold">Thời gian đặt sân</h4>
                  <ul className="grid grid-cols-3 gap-2">
                    {selectedTimes.map((id) => {
                      const timeSlot = timeSlots.find((slot) => slot.id === id);
                      return (
                        <li key={id} className="text-center">
                          {timeSlot ? `${timeSlot.startTime} - ${timeSlot.endTime}` : ''}
                        </li>
                      );
                    })}
                  </ul>

                </div>
                <Divider />
                <p className="font-bold mt-2 flex justify-between">
                  <span>Tổng:</span>
                  <span>${totalPrice}</span>
                </p>
              </Box>
              </Grid>
            </Grid>
            )}

            {/* Xác nhận */}
            {activeStep === 2 && (
              <Grid container columnSpacing={1}>
                              <Grid item xs = {3}>
                              </Grid>
                <Grid item xs = {6}>
              <div>
                <div className = "flex justify-center items-center">
                <h4 className="mt-4 text-md font-bold">Xác nhận thông tin</h4>
                </div>
              <div className = 'flex justify-center items-center'>
              <Box className="p-4 bg-gray-100 rounded">
                  <div className = 'min-h-[364px]'>
                  <Grid container columnSpacing={1}>
                        <Grid item xs={4}>
                          <Image
                            src={fieldBooking ? fieldBooking.images[0].pictureUrl : DetailImage}
                            alt="Football field"
                            width={150}
                            height={80}
                            className="rounded"
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <h3 className="text-md">{fieldBooking?.name}</h3>
                          <p className="text-sm">{fieldBooking?.address}</p>
                          <p className="text-sm">{fieldBooking?.type}</p>
                        </Grid>
                      </Grid>
                  {/* Hiển thị thông tin người dùng đã nhập */}
                  <h4 className="mt-4 text-md font-bold">Thông tin người dùng</h4>
                  <p className="text-md">Họ và Tên: <span className="font-medium">{userInfo.name}</span></p>
                  <p className="text-md">Email: <span className="font-medium">{userInfo.email}</span></p>
                  <p className="text-md">Số điện thoại: <span className="font-medium">{userInfo.phone}</span></p>

                  {/* Selected Times and Total Price */}
                  <h4 className="mt-4 text-md font-bold">Ngày: <span className = 'font-medium'>{selectedDate}</span></h4>
                  <h4 className="mt-4 text-md font-bold">Thời gian đặt sân</h4>
                  <ul className="grid grid-cols-3 gap-2">
                    {selectedTimes.map((id) => {
                      const timeSlot = timeSlots.find((slot) => slot.id === id);
                      return (
                        <li key={id} className="text-center">
                          {timeSlot ? `${timeSlot.startTime} - ${timeSlot.endTime}` : ''}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <Divider />
                <p className="font-bold mt-2 flex justify-between">
                  <span>Tổng:</span>
                  <span>${totalPrice}</span>
                </p>
              </Box>
              </div>
              </div>
              </Grid>
              <Grid item xs = {3}>
                </Grid>
              </Grid>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              color="primary"
            >
              Quay lại
            </Button>
            {activeStep === steps.length - 1 ? 
            <Button
              onClick={handleBooking}
              variant="contained"
              color="primary"
            >
              Đặt sân
            </Button>
            :
            <Button
            onClick={handleNext}
            variant="contained"
            color="primary"
            >
            Tiếp theo
            </Button>
            } 
          </div>
        </div>
      </div>
    </div>
  );
}
