"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiSendPlaneFill } from "react-icons/ri";
import { CiLocationOn } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import ViewTeamMemberDialog from "@/components/user/teammember";
import TeamRequestModal from "@/components/user/teamrequestmodal";
import Navbar from "@/components/user/main-nav";
import { TiNews } from "react-icons/ti";
import { Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loading from "@/components/user/loading";
import { useTeamStore } from "@/services/store/teamStore";
import ModalUnlogin from "@/components/user/card-team/modal-unlogin";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function Detail({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const id = params.slug;
  const position = [10.84488722399991, 106.63925902499713];
  const [unloginModal, setUnLoginModal] = useState(false);
  const [requestModal, setRequestModal] = useState(false);

  const fetchTeamData = useTeamStore((state) => state.fetchTeamData);
  const fetchJoinTeam = useTeamStore((state) => state.fetchJoinTeam);
  const team = useTeamStore((state) => state.team);
  const loading = useTeamStore((state) => state.loading);

  useEffect(() => {
    fetchTeamData(id);
  }, [id, fetchTeamData]);

  const handleAccept = () => {
    setRequestModal(true)
  }

  const handleApply = async () => {
    const user = sessionStorage.getItem("roleId"); 
    if (!user) {
      setUnLoginModal(true);
      return;
    }
  
    if (!team?.id) {
      toast.error("Thông tin đội không hợp lệ", { autoClose: 1500 });
      return;
    }
  
    try {
      const joinData = {
        customerId: user, // Lấy từ session
        sportTeamId: team.id, // Lấy từ team hiện tại
      };
  
      const response = await fetchJoinTeam(joinData, team.endpoint);
      console.log(response)
      if (response) {
        toast.success("Gia nhập team thành công!", { autoClose: 1500 });
      } else {
        toast.error( response.message, { autoClose: 1500 });
      }
    } catch (error) {
      console.error("Error joining team:", error);
    
      // const errorMessage = error?.response?.data?.message || "Xin gia nhập không thành công";
      // toast.error(errorMessage, { autoClose: 1500 });
    }
    
  };
  

  return (
    <>
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="flex w-full pl-16 mt-4 gap-4">
          {/* Left Section */}
          <div className="w-2/5">
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col pt-5">
                <div className="flex-grow grid gap-2">
                  <Image
                    alt="Product image"
                    className="w-full rounded-md h-[300px]"
                    height="200"
                    width="300"
                    src={team?.avatar || ""}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div className="w-[55%] space-y-6 pt-4 pl-4">
            <p className="text-4xl font-semibold">{team?.name}</p>
            <p className="text-lg font-medium text-[#7D92A1]">Địa chỉ: {team?.address}</p>
            <p className="flex text-base space-x-2 font-medium my-2">
              <CiLocationOn className="size-5" /> <span>{team?.address}</span>
            </p>
            <p className="flex text-base space-x-2 font-medium my-2">
              <TiNews className="size-5" /> <span>{team?.description}</span>
            </p>
            <p className="flex text-base space-x-2 font-medium my-2">
              <RiSendPlaneFill className="size-5" /> <span>{team?.sport}</span>
            </p>
            <p className="text-base space-x-2 font-medium my-2">
              <span>
                Số thành viên: <span className="text-[#DC0F0F]">{team?.currentMember} / {team?.limitMember}</span> thành
                viên
              </span>
            </p>
            <div className="flex gap-12">
              <ViewTeamMemberDialog members={team?.members} id={team?.id} endpoint = {team?.endpoint}/>
              <Button
                className="bg-[#31AAB7] text-white px-4 py-0 text-md hover:bg-[#6DCDD8]"
                onClick={() => handleApply()}
              >
                <FaCartShopping className="size-4 text-white mr-2" /> Xin gia nhập
              </Button>
              {team?.leaderId == sessionStorage.getItem('roleId') ? 
                (
                  <>
                  <Button variant="outline" className="border-[#28A745] text-[#28A745] px-4 py-0 text-md"
                onClick={() => handleAccept()}
              >
                <FaRegHeart className="size-4 text-[#28A745] mr-2" /> Danh sách xin
              </Button>
              <TeamRequestModal open = {requestModal} onClose={() => setRequestModal(false)} requests={team? team.requests : []} id={team? team.id : ''} endpoint={team? team.endpoint : ''}/>
                  </>
                ) : null
              }
              
            </div>
          </div>
        </div>
      )}

      {/* Main Content Section */}
      <div className="flex pl-16 mt-4 gap-4">
        <div className="w-[72%]">
          <Grid container rowSpacing={2}>
            <Grid item xs={12}>
              <p className="text-2xl font-semibold border-b-2 border-[#28A745] inline-block">Mô tả đội</p>
              <p className="text-base font-normal my-2">
              Đội nhóm {team?.name} là một cộng đồng năng động với tinh thần đoàn kết cao. Các thành viên luôn 
              sẵn sàng hỗ trợ lẫn nhau trong mọi hoạt động và mang lại môi trường thân thiện, tích cực 
              cho các sự kiện thể thao.
              </p>
              <p className="text-base font-normal my-2">
              Đội thể thao xuất sắc này không chỉ tập trung vào kỹ năng thi đấu mà còn chú trọng vào việc phát 
              triển tình bạn và tinh thần đồng đội giữa các thành viên, tạo nên một tập thể mạnh mẽ và gắn kết.
              </p>
              <p className="text-base font-normal my-2">
                {team?.name} quy tụ những cầu thủ tài năng và đam mê, không ngừng nâng cao kỹ năng và sẵn sàng
                 tham gia vào các giải đấu, từ cấp địa phương đến quốc gia, với tinh thần thi đấu hết mình.
              </p>
              <p className="text-base font-normal my-2">
                {team?.name} là nơi kết nối những người yêu thể thao, mang đến cơ hội giao lưu, học hỏi và tham 
                gia vào các hoạt động vui nhộn, vừa rèn luyện sức khỏe vừa thắt chặt tinh thần đồng đội.
              </p>
            </Grid>
          </Grid>
        </div>

        <div className="w-[23%] pl-4 gap-4">
          <p className="text-2xl mt-2 py-2 font-semibold border-b-2 border-[#28A745] inline-block">Vị trí sân</p>
          <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <Marker position={position}>
              <Popup>Location: 10.8449, 106.6393</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
      <ModalUnlogin open={unloginModal} onClose={() => setUnLoginModal(false)} />
    </div>
    <ToastContainer /> 
    </>
  );
}

export default Detail;
