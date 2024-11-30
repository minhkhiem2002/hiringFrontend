import React from 'react';
import { Card, CardContent } from '@mui/material';
import { FaMapMarkerAlt, FaUsers, FaUserFriends, FaFutbol } from 'react-icons/fa';

interface CardTeamProps {
  id: string;
  name: string;
  address: string;
  currentMember: number;
  limitMember: number;
  sport: string;
  avatar: string;
}

const CardTeam: React.FC<CardTeamProps> = ({
  name,
  address,
  currentMember,
  limitMember,
  sport,
  avatar,
}) => {
  return (
    <Card className="border rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg bg-white">
      <img
        src={avatar}
        alt={name}
        className="h-[250px] w-full object-cover"
      />
      <CardContent className="p-6 bg-gradient-to-r from-gray-100 to-gray-200">
        <h2 className="font-bold text-xl text-gray-800 mb-2">{name}</h2>
        <p className="text-sm text-gray-600 mb-4 flex items-center">
          <FaFutbol className="text-blue-500 mr-2" /> 
          Thể loại: {sport}
        </p>
        <p className="text-sm text-gray-600 mb-4 flex items-center">
          <FaMapMarkerAlt className="text-red-500 mr-2" />
          Địa điểm: {address}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-700">
          <p className="flex items-center">
            <FaUserFriends className="text-green-500 mr-2" />
            <span className="font-semibold">Tối đa:</span> {limitMember} thành viên
          </p>
          <p className="flex items-center">
            <FaUsers className="text-purple-500 mr-2" />
            <span className="font-semibold">Hiện tại:</span> {currentMember} thành viên
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTeam;
