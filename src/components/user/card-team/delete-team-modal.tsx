'use client'
import React from 'react';
import { Modal, Box, Typography, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTeamStore } from '@/services/store/teamStore';

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  sportTeamId: string;
}

const DeleteTeamModal: React.FC<DeleteModalProps> = ({ open, onClose, sportTeamId }) => {
  const { fetchDeleteTeam } = useTeamStore();

  const handleDelete = async () => {
    const customerId = sessionStorage.getItem('roleId')
    const response = await fetchDeleteTeam(sportTeamId,customerId);
    if (response) {
      toast.success('Xóa team thành công', { autoClose: 1500 });
      onClose();
    } else {
      toast.error('Xóa team không thành công', { autoClose: 1500 });
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="delete-team-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="delete-team-modal" variant="h6" mb={2}>
          Xóa Team
        </Typography>
        <Typography mb={3}>
          Bạn có chắc chắn muốn xóa team này không? Hành động này không thể hoàn tác.
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Button variant="contained" color="error" onClick={handleDelete}>
            Xóa
          </Button>
          <Button variant="outlined" color="primary" onClick={onClose}>
            Hủy
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteTeamModal;
