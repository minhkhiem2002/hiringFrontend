import React from 'react';
import { Card, CardContent, CardActions, Button } from '@mui/material';

interface CardTeamProps {
  team: any;
  onDetailClick: () => void;
}

const CardTeam: React.FC<CardTeamProps> = ({ team, onDetailClick }) => {
  return (
    <Card className="border p-4">
      <CardContent>
        <img src={team.logo} alt={team.name} className="h-12 w-12 mb-4" />
        <h2 className="font-bold text-xl">{team.name}</h2>
        <p>Trình độ: {team.level}</p>
        <p>Địa điểm: {team.location}</p>
        <p>Liên hệ: {team.phone}</p>
        <p>Thành viên: {team.members}</p>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" onClick={onDetailClick}>
          Xem chi tiết
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardTeam;
