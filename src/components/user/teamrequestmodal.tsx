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
  Tooltip,
  Paper,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import InfoIcon from "@mui/icons-material/Info";
import { useTeamStore } from "@/services/store/teamStore";
import { HandleTeamRequest } from "@/services/interfaces/teamInterface";
import { toast } from "react-toastify";
import ModalInfoUser from "./modalskilluser"; // Import ModalInfoUser
import { useUserStore } from "@/services/store/userStore";

export interface TeamRequest {
  content: string;
  customerId: string;
  name: string;
  avatar: string;
  firstName: string;
  lastName: string;
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
  endpoint,
}) => {
  const [handledRequests, setHandledRequests] = useState<string[]>([]);
  const [openUserInfo, setOpenUserInfo] = useState<boolean>(false); // State for user info modal
  const [selectedUser, setSelectedUser] = useState<TeamRequest | null>(null); // State for selected user
  const { fetchHandleRequestTeam } = useTeamStore();

  const handleAccept = async (customerId: string, endpoint: string) => {
    const request: HandleTeamRequest = {
      customerId: customerId,
      sportTeamId: id,
      accept: true,
    };
    const response = await fetchHandleRequestTeam(request, endpoint);
    if (response) {
      toast.success("Chấp nhận thành công", { autoClose: 1500 });
    } else {
      toast.error("Chấp nhận không thành công", { autoClose: 1500 });
    }
    onClose();
  };

  const handleReject = async (customerId: string, endpoint: string) => {
    const request: HandleTeamRequest = {
      customerId: customerId,
      sportTeamId: id,
      accept: false,
    };
    const response = await fetchHandleRequestTeam(request, endpoint);
    if (response) {
      toast.success("Từ chối thành công", { autoClose: 1500 });
    } else {
      toast.error("Từ chối không thành công", { autoClose: 1500 });
    }
    onClose();
  };

  const isHandled = (customerId: string) => handledRequests.includes(customerId);
  const getSkill = useUserStore((state) => state.getSkill);

  const handleOpenUserInfo = async (user: TeamRequest) => {
    setSelectedUser(user);
    await getSkill(user.customerId);
    setOpenUserInfo(true);
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            maxHeight: "80vh",
            overflowY: "auto",
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
          <Typography variant="h6" mb={2} fontWeight="600">
            Danh sách yêu cầu tham gia CLB
          </Typography>
          <Divider sx={{ mb: 2 }} />
          {requests.map((request) => (
            <Paper
              key={request.customerId}
              sx={{
                p: 2,
                mb: 2,
                borderRadius: 2,
                boxShadow: 1,
                backgroundColor: "#fafafa",
              }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3} container direction="column" alignItems="center">
                  <Avatar
                    src={request.avatar}
                    alt={request.firstName}
                    sx={{ width: 70, height: 70, borderRadius: "50%" }}
                  />
                  <Tooltip title="Xem thông tin">
                    <IconButton
                      size="small"
                      sx={{
                        mt: 1,
                        color: "primary.main",
                      }}
                      onClick={() => handleOpenUserInfo(request)}
                    >
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>

                <Grid item xs={5}>
                  <Typography variant="subtitle1" fontWeight="600">
                    {request.firstName} {request.lastName}
                  </Typography>
                  <Typography variant="body2" mt={1} color="text.secondary">
                    {request.firstName} {request.lastName} xin gia nhập CLB
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  {isHandled(request.customerId) ? (
                    <Typography color="text.secondary" fontSize="0.875rem">
                      Đã xử lý
                    </Typography>
                  ) : (
                    <div className="flex justify-between">
                      <Tooltip title="Đồng ý">
                        <IconButton
                          color="success"
                          size="small"
                          onClick={() => handleAccept(request.customerId, endpoint)}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Từ chối">
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleReject(request.customerId, endpoint)}
                        >
                          <CloseOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  )}
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      </Modal>

      {selectedUser && (
        <ModalInfoUser
          open={openUserInfo}
          onClose={() => setOpenUserInfo(false)}
          user={selectedUser}
        />
      )}
    </>
  );
};

export default TeamRequestModal;
