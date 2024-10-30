import { Box, Button, Grid } from '@mui/material';
import Image1 from '../../../../public/icons/work-icon1.svg';
import Image2 from '../../../../public/icons/work-icon2.svg';
import Image3 from '../../../../public/icons/work-icon3.svg';
import Image from "next/image";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface CardItemProps {
  image: string;
  title: string;
  description: string;
  text: string
}

const CardItem: React.FC<CardItemProps> = ({ image, title, description, text }) => (
  <Box className='group bg-white shadow-lg rounded-lg h-[350px] w-[400px] p-2 flex flex-col items-center hover:shadow-xl'>
  <div className='h-32 w-28 flex justify-center items-center bg-slate-100 rounded-md group-hover:bg-gray-200'>
    <Image
      src={image}
      width={42} 
      height={42}
      alt={title}
      className="cursor-pointer"
    />
  </div>
  <p className='text-2xl mt-4 h-10 font-bold text-slate-800'>{title}</p>
  <span className='w-3/4 text-slate-600 text-base text-center mt-2 h-36'>{description}</span>
  <Button 
    variant='outlined' 
    size='large' 
    className='rounded-lg border-black text-black group-hover:border-white group-hover:text-white group-hover:bg-black'
    sx={{
      minWidth: "350px",
      borderRadius: "4px",
      textTransform: "none",
    }}
  >
    {text} <ArrowForwardIcon className='pl-2'/>
  </Button>
</Box>

);

const CardHeader: React.FC = () => {
  const cardData: CardItemProps[] = [
    {
      image: Image1,
      title: 'Join Us',
      description: 'Quick and Easy Registration: Get started on our software platform with a simple account creation process.',
      text: 'Register Now',
    },
    {
      image: Image2,
      title: 'Select Coaches/Venues',
      description: 'Book Badminton coaches and venues for expert guidance and premium facilities.',
      text: 'Go To Coaches',
    },
    {
      image: Image3,
      title: 'Booking Process',
      description: 'Easily book, pay, and enjoy a seamless experience on our user-friendly platform.',
      text: 'Book Now',
    },
  ];

  return (
    <Grid container spacing={4}>
      {cardData.map((card, index) => (
        <Grid item xs={4} key={index}>
          <CardItem {...card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardHeader;
