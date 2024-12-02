import React from "react";
import Navbar from "@/components/user/main-nav";

const Stream = () => {
  // Mock Data
  const videoData = {
    id: "1",
    title: "HIGHLIGHTS | AL NASSR - DAMAC | RONALDO KHÔNG THỂ NGỪNG TỎA SÁNG | SAUDI PRO LEAGUE 24/25",
    description:
      "Xem tin tức thể thao mới nhất: Ronaldo - cú đúp Saudi Pro League 24/25",
    url: "https://youtu.be/lbukYt_XrF8", // Video URL cố định
  };

  const relatedVideos = [
    {
      id: "2",
      title: "BRIGHTON - SOUTHAMPTON | SỨC ÉP TẤN CÔNG VŨ BÃO, DẤU ẤN TRANH CÃI CỦA VAR | NGOẠI HẠNG ANH 24/25",
      thumbnail:
        "https://i.ytimg.com/vi/xuiDDhoqGdM/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDGUMRVB_LlO_pRKgc30ABzzIDjOA",
      url: "https://youtu.be/lbukYt_XrF8",
    },
    {
      id: "3",
      title: "Tin nóng 29/11: Tuyển Việt Nam bất ngờ nhảy vọt trên BXH FIFA; Việt Nam đắt giá nhất AFF Cup 2024",
      thumbnail:
        "https://i.ytimg.com/vi/g87kBoAFknk/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCiD8VQfzch2bcFBgxj9ilueKmWQA",
      url: "https://youtu.be/lbukYt_XrF8",
    },
    {
      id: "4",
      title: "TIN BÓNG ĐÁ 29/11: MAN UTD THẮNG KỊCH TÍNH, SANCHO TỎA SÁNG, TOTTENHAM CHIA ĐIỂM CÙNG AS ROMA",
      thumbnail:
        "https://i.ytimg.com/vi/vtAnrMAfM-4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAePFF77gfqthT4PmgsTA2aX9kwfA",
      url: "https://youtu.be/lbukYt_XrF8",
    },
  ];

  const newsArticles = [
    {
      id: "1",
      title: "Real Madrid Claims Victory in El Clasico",
      summary:
        "An incredible performance by Real Madrid secures their win over Barcelona.",
      thumbnail:
        "https://res.cloudinary.com/dpvmnqgkw/image/upload/v1716321177/DACN/images_dhzi0h.jpg",
    },
    {
      id: "2",
      title: "Top Players of the Week",
      summary: "Check out the top performers in this week's matches.",
      thumbnail:
        "https://res.cloudinary.com/dpvmnqgkw/image/upload/v1716321177/DACN/images_dhzi0h.jpg",
    },
    {
      id: "3",
      title: "Upcoming Matches to Watch",
      summary: "Don't miss these exciting matches lined up this weekend.",
      thumbnail:
        "https://res.cloudinary.com/dpvmnqgkw/image/upload/v1716321177/DACN/images_dhzi0h.jpg",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto py-8 px-4 lg:px-0">
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Video Section */}
            <div className="flex-1">
              <div className="relative w-full h-[400px] lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
                <iframe
                  className="w-full h-full"
                  src={videoData.url.replace("youtu.be", "www.youtube.com/embed")}
                  title={videoData.title}
                  allowFullScreen
                ></iframe>
              </div>
              <h1 className="text-3xl font-bold mt-6">{videoData.title}</h1>
              <p className="text-gray-600 mt-2 text-lg">{videoData.description}</p>
            </div>

            {/* Related Videos */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-semibold mb-4">Videos Liên Quan</h2>
              <ul className="space-y-6">
                {relatedVideos.map((video) => (
                  <li
                    key={video.id}
                    className="flex gap-4 items-center hover:shadow-md p-2 rounded-lg bg-white transition-transform transform hover:scale-105"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-26 h-[120px] object-cover rounded-lg"
                    />
                    <div>
                      <h6 className="text-sm font-medium text-gray-800">{video.title}</h6>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* News Section */}
          <div className="mt-12">
            <h2 className="text-3xl font-semibold mb-6">Tin Bóng Đá Mới Nhất</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsArticles.map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">{article.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stream;
