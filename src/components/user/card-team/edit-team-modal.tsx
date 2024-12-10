'use client'
import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import { useTeamStore } from "@/services/store/teamStore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UpdateTeam } from '@/services/interfaces/teamInterface';

interface EditTeamModalProps {
  open: boolean;
  onClose: () => void;
  teamData: {
    id: string;
    leaderId: string;
    name: string;
    address: string;
    currentMember: number;
    limitMember: number;
    sport: string;
    endpoint: string;
    avatar: string;
    description: string;
    note: string;
  };
}

interface FormDataProps {

  name: string;
  sport: string;
  address: string;
  limitMember: number;
  avatar: File | null;
  description: string;
  note: string;
}

const EditTeamModal: React.FC<EditTeamModalProps> = ({ open, onClose, teamData }) => {
  console.log('sportTeamId',teamData)
  const { control, handleSubmit, setValue } = useForm<FormDataProps>({
    defaultValues: {
      name: teamData.name,
      sport: teamData.sport,
      address: teamData.address,
      limitMember: teamData.limitMember,
      avatar: null,
      description: teamData.description,
      note: teamData.note,
    },
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(teamData.avatar);

  const { fetchUpdateTeam } = useTeamStore();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setPreview('');
  };

  const handleFormSubmit = async (data: Omit<FormDataProps, 'avatar'>) => {
    const sportteam: UpdateTeam = {
        "sportTeamId": teamData.id,
        "sport": data.sport,
        "name": data.name,
        "description": data.description,
        "address": data.address,
        "note": data.note,
        "limitMember": data.limitMember
    }
    const customerId = sessionStorage.getItem('roleId')

    const response = await fetchUpdateTeam(sportteam, customerId);
    if (response) {
      toast.success('Cập nhật Team thành công', { autoClose: 1500 });
      onClose();
    } else {
      toast.error('Cập nhật Team không thành công', { autoClose: 1500 });
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="edit-team-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
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
        <Typography id="edit-team-modal" variant="h6" component="h2" mb={2}>
          Chỉnh sửa thông tin Team
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  border: '1px dashed gray',
                  borderRadius: 2,
                  p: 2,
                  height: '192px',
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {preview ? (
                  <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    <img
                      src={preview}
                      alt="Avatar Preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                    />
                    <IconButton
                      sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        bgcolor: 'white',
                      }}
                      onClick={handleRemoveAvatar}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '100%',
                      cursor: 'pointer',
                    }}
                  >
                    <UploadIcon fontSize="large" />
                    <Typography variant="body2" mt={1}>
                      Upload Avatar
                    </Typography>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept="image/*"
                      style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        cursor: 'pointer',
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Tên đội" fullWidth margin="dense" required />
                )}
              />
              <Controller
                name="sport"
                control={control}
                render={({ field }) => (
                  <TextField {...field} label="Thể thao" fullWidth margin="dense" required />
                )}
              />
              <Controller
                name="limitMember"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Số thành viên tối đa"
                    type="number"
                    fullWidth
                    margin="dense"
                    required
                  />
                )}
              />
            </Grid>
          </Grid>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Địa chỉ" fullWidth margin="normal" required />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Mô tả"
                fullWidth
                margin="normal"
                required
                multiline
              />
            )}
          />
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Ghi chú"
                fullWidth
                margin="normal"
                multiline
              />
            )}
          />
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" type="submit">
              Lưu thay đổi
            </Button>
            <Button variant="outlined" color="error" onClick={onClose}>
              Hủy
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default EditTeamModal;
