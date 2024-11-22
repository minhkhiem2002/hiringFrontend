import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { IoMdPricetags } from "react-icons/io";
import { TeamMember, DeleteTeamMemberRequest } from "@/services/interfaces/teamInterface";
import { toast } from "react-toastify";
import { useTeamStore } from "@/services/store/teamStore";

interface ViewTeamMemberDialogProps {
  members: TeamMember[];
  id: string;
  endpoint: string;
}

function formatJoinDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

const ViewTeamMemberDialog: React.FC<ViewTeamMemberDialogProps> = ({
  members = [],
  id,
  endpoint,
}) => {
  const { deleteTeamMember } = useTeamStore();

  const handleDelete = async (
    sportTeamId: string,
    customerId: string,
    endpoint: string
  ) => {
    const request: DeleteTeamMemberRequest = {
      customerId: customerId,
      sportTeamId: sportTeamId,
      captainId: sessionStorage.getItem("roleId"),
    };
    const response = await deleteTeamMember(request, endpoint);
    if (response) {
      toast.success("Xóa thành viên thành công", { autoClose: 1500 });
    } else {
      toast.error("Xóa thành viên không thành công", { autoClose: 1500 });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-[#28A745] text-[#28A745] px-4 py-0 text-md"
        >
          <IoMdPricetags className="size-4 text-[#28A745] mr-2" /> Xem danh sách
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[1200px]"> {/* Tăng width lên */}
        <DialogHeader>
          <DialogTitle className="text-3xl flex justify-center items-center">
            DANH SÁCH THÀNH VIÊN
          </DialogTitle>
          <DialogDescription className="flex justify-center items-center">
            Danh sách thành viên của team
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#31AAB7] hover:bg-[#31AAB7]">
                <TableHead className="w-[200px] text-white py-4">
                  Thành viên
                </TableHead>
                <TableHead className="w-[200px] text-white py-4">
                  Ngày gia nhập
                </TableHead>
                <TableHead className="text-left text-white">Vai trò</TableHead>
                <TableHead className="text-center text-white">Quản lý</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member, index) => (
                <TableRow key={index} className="py-2">
                  <TableCell className="font-medium py-4">
                    {member.firstName} {member.lastName}
                  </TableCell>
                  <TableCell className="font-medium py-4">
                    {formatJoinDate(member.joinDate)}
                  </TableCell>
                  <TableCell className="text-left">{member.role}</TableCell>
                  <TableCell className="text-right">
                    <button
                      className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md"
                      onClick={() =>
                        handleDelete(member.sportTeamId, member.customerId, endpoint)
                      }
                    >
                      Xóa
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewTeamMemberDialog;
