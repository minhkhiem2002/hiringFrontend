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
import { TeamMember } from "@/services/interfaces/teamInterface";

interface ViewTeamMemberDialogProps {
  members: TeamMember[];
}

function formatJoinDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`; 
  }
  

const ViewTeamMemberDialog: React.FC<ViewTeamMemberDialogProps> = ({ members = [] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#28A745] text-[#28A745] px-4 py-0 text-md">
          <IoMdPricetags className="size-4 text-[#28A745] mr-2" /> Xem danh sách
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[800px]">
        <DialogHeader>
          <DialogTitle className="text-3xl flex justify-center items-center">DANH SÁCH THÀNH VIÊN</DialogTitle>
          <DialogDescription className="flex justify-center items-center">
            Danh sách thành viên của team
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow className="bg-[#31AAB7] hover:bg-[#31AAB7]">
                <TableHead className="w-[200px] text-white py-4">Thành viên</TableHead>
                <TableHead className="w-[200px] text-white py-4">Ngày gia nhập</TableHead>
                <TableHead className="text-right text-white">Vai trò</TableHead>
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
                  <TableCell className="text-right">{member.role}</TableCell>
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