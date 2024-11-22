import React, { useState } from 'react';
import Link from 'next/link'; // Import Link từ Next.js
import { Card, CardContent, CardActions, Button } from '@mui/material';
import EditTeamModal from './edit-team-modal'; // Import EditTeamModal
import DeleteTeamModal from './delete-team-modal';

interface CardTeamProps {
  id: string;
  leaderId: string;
  name: string;
  address: string;
  currentMember: number;
  limitMember: number;
  sport: string;
  endpoint: string;
  avatar: string;
}

const CardTeams: React.FC<CardTeamProps> = ({ id, leaderId, name, address, currentMember, limitMember, sport, avatar, endpoint }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);


  const handleEdit = () => {
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleDelete = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Card className="border p-4">
        <Link href={`/team/${endpoint}`} passHref>
          <CardContent className="cursor-pointer min-h-[400px]">
            <img src={avatar} alt={name} className="h-[250px] w-[400px] mb-4" />
            <h2 className="font-bold text-xl">{name}</h2>
            <p>Thể loại: {sport}</p>
            <p className='min-h-[50px]'>Địa điểm: {address}</p>
            <p>Số thành viên tối đa: {limitMember}</p>
            <p>Thành viên hiện tại: {currentMember}</p>
          </CardContent>

        </Link>

        {leaderId === sessionStorage.getItem('roleId') ? (
          <CardActions className="flex justify-between">
            <Button size="small" variant="outlined" color="primary" onClick={handleEdit}>
              Chỉnh sửa
            </Button>
            <Button size="small" variant="outlined" color="error" onClick={handleDelete}>
              Xóa
            </Button>
          </CardActions>
        ) : (
          <CardActions className="flex justify-center">
            <p>Bạn chưa là đội trưởng nên không thể thao tác</p>
          </CardActions>
        )}
      </Card>

      {/* Edit Team Modal */}
      {openEditModal && (
        <EditTeamModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          teamData={{ id, leaderId, name, address, currentMember, limitMember, sport, avatar }}
        />
      )}
      {openDeleteModal && (
        <DeleteTeamModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          sportTeamId={id}
        />
      )}
    </>
  );
};

export default CardTeams;
