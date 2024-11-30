import React, { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardActions, IconButton, Typography, Avatar, Box, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditTeamModal from './edit-team-modal';
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

  const handleEdit = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleDelete = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const isLeader = leaderId === sessionStorage.getItem('roleId'); // Check quyền đội trưởng

  return (
    <>
      <Card className="border shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 relative">
        {/* Avatar and Info */}
        <CardContent className="p-6">
          <Box className="flex flex-col items-center text-center">
            <Avatar
              src={avatar}
              alt={name}
              sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: '3px solid #3f51b5',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
              }}
            />
            <Typography variant="h5" className="font-bold mb-2 text-indigo-700">
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Thể loại: <strong>{sport}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Địa điểm: <strong>{address}</strong>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Số thành viên: <strong>{currentMember}/{limitMember}</strong>
            </Typography>
          </Box>
        </CardContent>

        {/* Edit/Delete Icons */}
        {isLeader && (
          <Box className="absolute top-4 right-4 flex space-x-2">
            <Tooltip title="Chỉnh sửa">
              <IconButton
                size="small"
                onClick={handleEdit}
                sx={{
                  backgroundColor: '#e3f2fd',
                  '&:hover': { backgroundColor: '#bbdefb' },
                }}
              >
                <EditIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Xóa">
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{
                  backgroundColor: '#ffebee',
                  '&:hover': { backgroundColor: '#ffcdd2' },
                }}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        {/* Link to Details */}
        <Link href={`/team/${endpoint}`} passHref>
          <Typography
            className="cursor-pointer text-center py-3 bg-indigo-50 hover:bg-indigo-100 transition-all duration-300"
            variant="subtitle1"
          >
            Xem chi tiết
          </Typography>
        </Link>
      </Card>

      {/* Edit Team Modal */}
      {openEditModal && (
        <EditTeamModal
          open={openEditModal}
          onClose={handleCloseEditModal}
          teamData={{ id, leaderId, name, address, currentMember, limitMember, sport, avatar }}
        />
      )}
      {/* Delete Team Modal */}
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
