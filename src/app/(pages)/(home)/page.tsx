import Navbar from "@/components/user/main-nav";
import Image from "next/image";
import Banner from "../../../../public/images/Banner.jpg";
import TextBanner from "../../../../public/images/TextBanner.png";
// import CardHeader from "./../../../components/user/card-header/card-header";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      
      {/* Banner */}
      <div className="w-full flex mt-4">
        <p className="w-[500px] h-[400px] ml-8 pr-0 flex items-baseline justify-center text-white text-base font-medium translate-x-8 relative pt-5 z-10">
          <Image
            src={TextBanner}
            width={500}
            height={400}
            alt="TextBanner"
            className="w-[500px] h-[400px] flex"
          />
        </p>
        <p className="w-[1200px] h-[800px] flex items-center justify-center text-white text-base font-medium relative -translate-y-2 -translate-x-24 z-0">
          <Image
            src={Banner}
            width={1100}
            height={800}
            alt="Banner"
            className="w-[1200px] h-[800px] flex z-0 relative"
          />
        </p>
        <div className="w-[400px] h-[800px] flex items-center justify-center text-white text-base font-medium relative -translate-y-8 -translate-x-14 z-10">
          {/* <CardDp /> */}
        </div>
      </div>
      
      {/* How it works */}
      <div 
        className="flex flex-col justify-center items-center"
      >
          {/* Text */}
          <div className="flex flex-col justify-center items-center space-y-2">
              <p className='text-3xl font-bold'>
                How It 
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    background: 'linear-gradient(to right, #4fd1c5, #4299e1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                > Works</span>
              </p>
              <p className='text-slate-500 font-medium text-xl'>Simplifying the booking process for coaches, venues, and athletes.</p>
              {/* <CardHeader/> */}
          </div>
      </div>

      {/* Featured Venues */}
      <div 
        className="flex flex-col justify-center items-center pt-10"
      >
          {/* Text */}
          <div className="flex flex-col justify-center items-center space-y-2">
              <p className='text-3xl font-bold'>
                Featured 
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    background: 'linear-gradient(to right, #4fd1c5, #4299e1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                > Venues</span>
              </p>
              <p className='text-slate-500 font-medium text-xl'>Advanced sports venues offer the latest facilities, dynamic and unique</p>
              <p className='text-slate-500 font-medium text-xl'>environments for enhanced badminton performance.</p>
              <div className="flex gap-2">
                {/* <CardDp />
                <CardDp />
                <CardDp /> */}
              </div>
          </div>
      </div>
    </div>
  );
};

export default HomePage;
