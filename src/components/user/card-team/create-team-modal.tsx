import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography, IconButton, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import UploadIcon from '@mui/icons-material/Upload';
import CloseIcon from '@mui/icons-material/Close';
import { useTeamStore } from "@/services/store/teamStore";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface CreateTeamModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormDataProps {
  name: string;
  sport: string;
  description: string;
  address: string;
  note: string;
  limitMember: number;
  avatar: File | null;
}

const CreateTeamModal: React.FC<CreateTeamModalProps> = ({ open, onClose }) => {
  const { control, handleSubmit, reset } = useForm<FormDataProps>();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {fetchCreateTeam} = useTeamStore()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setPreview(null);
  };

  const handleFormSubmit = async (data: Omit<FormDataProps, 'avatar'>) => {
    const customerId = sessionStorage.getItem('roleId') || '';
    const formData = new FormData();
    formData.append('Name', data.name);
    formData.append('Sport', data.sport);
    formData.append('Description', data.description);
    formData.append('Address', data.address);
    formData.append('Note', data.note);
    formData.append('LimitMember', data.limitMember);
    formData.append('CustomerId', customerId); 
    if (avatar) {
      formData.append('Avatar', avatar);
    }
    const response = await fetchCreateTeam(formData,customerId)
    if (response) {
        toast.success('Tạo Team thành công', { autoClose: 1500 });
    } else {
        toast.error('Tạo Team không thành công', { autoClose: 1500 });
    }
    reset();
    setAvatar(null);
    setPreview(null);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="create-team-modal">
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
        <Typography id="create-team-modal" variant="h6" component="h2" mb={2}>
          Tạo Team mới
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Grid container>
                <Grid item container xs = {12} columnSpacing={1}>
                    <Grid item xs = {6} columnSpacing={1}>
                    <Box
  sx={{
    mt: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    border: '1px dashed gray',
    borderRadius: 2,
    p: 2,
    position: 'relative',
    height: '192px',
    width: '100%',
    maxWidth: '400px',
    overflow: 'hidden',
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
          objectFit: 'cover', // Đảm bảo hình lấp đầy Box mà không bị méo
          border: '2px solid #ccc', // Thêm viền quanh hình
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
                    <Grid item xs = {6}>
                    <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Name" fullWidth margin="dense" required 
            sx = {{
                marginTop: '16px'
            }}
            />}
          />
          <Controller
            name="sport"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Sport" fullWidth margin="dense"  required />}
            sx = {{
                marginTop: '4px'
            }}
          />
            <Controller
                name="limitMember"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value, ...rest } }) => (
                    <TextField
                    {...rest}
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value, 10) || '')}
                    label="Limit Member"
                    type="number"
                    fullWidth
                    margin="dense"
                    required
                    />
                )}
                sx={{
                    marginTop: '4px',
                }}
                />

                    </Grid>
                </Grid>
                <Grid item xs = {12}>

                </Grid>
            </Grid>
          <Controller
            name="description"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Description" fullWidth margin="normal" />}
          />
          <Controller
            name="address"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Address" fullWidth margin="normal" />}
          />
          <Controller
            name="note"
            control={control}
            defaultValue=""
            render={({ field }) => <TextField {...field} label="Note" fullWidth margin="normal" />}
          />
          
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" type="submit">
              Tạo mới
            </Button>
            <Button variant="outlined" color="error" onClick={onClose}>
              Đóng
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateTeamModal;
