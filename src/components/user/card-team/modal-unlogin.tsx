import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface ModalTeamProps {
  open: boolean;
  onClose: () => void;
}

const ModalUnlogin: React.FC<ModalTeamProps> = ({ open, onClose }) => {
  const router = useRouter();
  const handleLoginRedirect = () => {
    onClose(); // Đóng modal trước khi chuyển hướng
    router.push('/login'); // Chuyển đến trang đăng nhập
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent className='flex justify-center'>
        <p>Bạn cần đăng nhập để thực hiện thao tác này</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLoginRedirect} color="primary" sx ={{marginLeft: '8px'}}>
          Đăng nhập
        </Button>
        <Button onClick={onClose} color="primary">
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalUnlogin;
