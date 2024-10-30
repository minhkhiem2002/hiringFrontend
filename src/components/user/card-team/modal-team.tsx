import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ModalTeamProps {
  open: boolean;
  onClose: () => void;
  team: any;
}

const ModalTeam: React.FC<ModalTeamProps> = ({ open, onClose, team }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{team.name}</DialogTitle>
      <DialogContent>
        <p>Trình độ: {team.level}</p>
        <p>Địa điểm: {team.location}</p>
        <p>Liên hệ: {team.phone}</p>
        <p>Thành viên: {team.members}</p>
        {/* Thêm các thông tin chi tiết khác nếu cần */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalTeam;
