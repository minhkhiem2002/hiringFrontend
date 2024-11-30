import React, { useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Divider,
  IconButton,
  Grid,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import InterestsIcon from "@mui/icons-material/Interests";
import { useUserStore } from "@/services/store/userStore";

interface ModalInfoUserProps {
  open: boolean;
  onClose: () => void;
  user: {
    avatar: string;
    firstName: string;
    lastName: string;
  };
}

const ModalInfoUser: React.FC<ModalInfoUserProps> = ({ open, onClose, user }) => {
  const customerDetail = useUserStore((state) => state.customerDetail);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
        }}
      >
        {/* Close button */}
        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h5" textAlign="center" mb={3} fontWeight="bold">
          Thông Tin Người Dùng
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Avatar and Basic Info */}
        <Box display="flex" alignItems="center" mb={4}>
          <Avatar
            src={user.avatar}
            alt={`${user.firstName} ${user.lastName}`}
            sx={{ width: 100, height: 100, mr: 3 }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Detailed Info */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <PlaceIcon sx={{ color: "text.secondary", mr: 1 }} />
              <Typography variant="body2">
                <strong>Địa chỉ:</strong> {customerDetail.address || "Không có"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <AccessTimeIcon sx={{ color: "text.secondary", mr: 1 }} />
              <Typography variant="body2">
                <strong>Thời gian tham gia:</strong> {customerDetail.time || "Không có"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <FitnessCenterIcon sx={{ color: "text.secondary", mr: 1 }} />
              <Typography variant="body2">
                <strong>Cân nặng:</strong> {customerDetail.weight || 0} kg
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" alignItems="center">
              <FitnessCenterIcon sx={{ color: "text.secondary", mr: 1 }} />
              <Typography variant="body2">
                <strong>Chiều cao:</strong> {customerDetail.height || 0} cm
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={1}>
              <InterestsIcon sx={{ color: "text.secondary", mr: 1 }} />
              <Typography variant="body2">
                <strong>Sở thích:</strong> {customerDetail.interest || "Không có"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography variant="body2" mb={1}>
                <strong>Kỹ năng:</strong>
              </Typography>
              {customerDetail.skills ? (
                customerDetail.skills.split(",").map((skill, index) => (
                  <Chip
                    key={index}
                    label={skill.trim()}
                    variant="outlined"
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Không có kỹ năng
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default ModalInfoUser;
