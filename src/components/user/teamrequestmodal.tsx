import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Avatar,
  Button,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTeamStore } from "@/services/store/teamStore";
import { HandleTeamRequest } from "@/services/interfaces/teamInterface";
import { toast } from "react-toastify";

export interface TeamRequest {
  content: string;
  customerId: string;
  name: string;
  avatar: string;
}

interface TeamRequestModalProps {
  open: boolean;
  onClose: () => void;
  requests: TeamRequest[];
  id: string;
  endpoint: string;
}

const TeamRequestModal: React.FC<TeamRequestModalProps> = ({
  open,
  onClose,
  requests,
  id,
  endpoint
}) => {
  const [handledRequests, setHandledRequests] = useState<string[]>([]);

  const { fetchHandleRequestTeam } = useTeamStore()

  const handleAccept = async (customerId: string, endpoint: string) => {
    const request:HandleTeamRequest = {
      customerId: customerId,
      sportTeamId: id,
      accept: true
    }
    const response = await fetchHandleRequestTeam(request, endpoint)
    if (response) {
      toast.success("Chấp nhận thành công", { autoClose: 1500 });
    } else {
      toast.error("Chấp nhận không thành công", { autoClose: 1500 });
    }
    onClose()
  };

  const handleReject = async (customerId: string, endpoint: string) => {
    const request:HandleTeamRequest = {
      customerId: customerId,
      sportTeamId: id,
      accept: false
    }
    const response = await fetchHandleRequestTeam(request, endpoint)
    if (response) {
      toast.success("Từ chối thành công", { autoClose: 1500 });
    } else {
      toast.error("Từ chối không thành công", { autoClose: 1500 });
    }
    onClose()
  };

  const isHandled = (customerId: string) => handledRequests.includes(customerId);

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
          p: 4,
          borderRadius: 2,
        }}
      >
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
        <Typography variant="h6" mb={2}>
          Danh sách yêu cầu
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {requests.map((request) => (
          <Box key={request.customerId} mb={2}>
            <Grid container spacing={2} columnSpacing={4} alignItems="center">
                <Grid item xs = {3} container direction="column" alignItems="center" justifyContent="center">
                <Avatar
                    src={request.avatar}
                    alt={request.firstName}
                    sx={{ width: 56, height: 56 }}
                />
                <Button
                    variant="text"
                    size="small"
                    sx={{ textTransform: "none", mt: 0.5 }}
                    onClick={() => alert(`Xem thông tin của ${request.firstName}`)}
                >
                    Xem thông tin
                </Button>
                </Grid>

              <Grid item xs = {5}>
                <Typography variant="subtitle1">{request.firstName} {request.lastName}</Typography>
                <Typography variant="body2" mt={1} color="text.secondary">
                  {request.firstName} {request.lastName} xin gia nhập CLB
                </Typography>
              </Grid>
              <Grid item xs = {4}>
                {isHandled(request.customerId) ? (
                  <Typography color="text.secondary" fontSize="0.875rem">
                    Đã xử lý
                  </Typography>
                ) : (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      onClick={() => handleAccept(request.customerId, endpoint)}
                      sx={{ mr: 1 }}
                    >
                      Đồng ý
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleReject(request.customerId, endpoint)}
                    >
                      Từ chối
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </Box>
    </Modal>
  );
};

export default TeamRequestModal;
