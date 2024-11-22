import React from 'react';
import { Card, CardContent } from '@mui/material';

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
    <Card className="border p-4">
      <CardContent>
        <img src={avatar} alt={name} className="h-[250px] w-[400px] mb-4" />
        <h2 className="font-bold text-xl">{name}</h2>
        <p>Thể loại: {sport}</p>
        <p>Địa điểm: {address}</p>
        <p>Số thành viên tối đa: {limitMember}</p>
        <p>Thành viên hiện tại: {currentMember}</p>
      </CardContent>
    </Card>
  );
};

export default CardTeam;
