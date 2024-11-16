import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button } from '@mui/material';
import ModalUnlogin from './modal-unlogin';

interface CardTeamProps {
  name: string;
  address: string;
  currentMember: number;
  limitMember: number;
  sport: string;
  endpoint: string;
  avatar: string;
}

const CardTeams: React.FC<CardTeamProps> = ({ name,address,currentMember,limitMember,sport,avatar }) => {
  return (
    <>
    <Card className="border p-4">
      <CardContent>
        <img src={avatar} alt={name} className="h-[250px] w-[400px] mb-4" />
        <h2 className="font-bold text-xl">{name}</h2>
        <p>Thể loại: {sport}</p>
        <p>Địa điểm: {address}</p>
        <p>Số thành viên tối đa: {currentMember}</p>
        <p>Thành viên: {limitMember}</p>
      </CardContent>
    </Card>
    </>
  );
};

export default CardTeams;
