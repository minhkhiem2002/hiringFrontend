'use client'
import React, { useState } from 'react';
import dataTeam from '../../../../ultils/dataTeam.json';
import { Pagination } from '@mui/material';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CardTeam from "./../../../../components/user/card-team/card-team";
import Navbar from "./../../../../components/user/main-nav";
import ModalTeam from "./../../../../components/user/card-team/modal-team";
import ProfileSidebar from "./../../../../components/user/profile-sidebar";

interface Team {
  id: number;
  name: string;
  level: string;
  location: string;
  contact: string;
  members: number;
  description: string;
  achievements: string;
  field: string;
  area: string;
}

const TeamPage: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [filterField, setFilterField] = useState<string>('');
  const [filterArea, setFilterArea] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 4;

  // Mock dữ liệu người dùng cho ProfileSidebar
  const fullName = "Nguyễn Văn A";
  const avatar = "/images/avata.jpg"; // Giả định đường dẫn ảnh avatar

  // Mở modal khi click vào chi tiết đội
  const handleOpenModal = (team: Team) => {
    setSelectedTeam(team);
    setOpenModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTeam(null);
  };

  // Thay đổi tab
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Thay đổi filter
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>, type: string) => {
    const value = event.target.value as string;
    if (type === 'field') setFilterField(value);
    if (type === 'area') setFilterArea(value);
  };

  // Thay đổi tìm kiếm
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Thay đổi trang pagination
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  // Lọc dữ liệu team theo tên, field, và area
  const filteredTeams = dataTeam
    .filter(team =>
      team.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filterField || team.field === filterField) &&
      (!filterArea || team.area === filterArea)
    )
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div>
      <div className="sticky z-20">
        <Navbar />
      </div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <ProfileSidebar fullName={fullName} avatar={avatar} />
        <div className="flex flex-col h-[89%]">
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <Tabs value={currentTab} onChange={handleTabChange}>
              <Tab label="Team tham gia" />
              <Tab label="Team quản lý" />
              <Tab label="Lời mời" />
            </Tabs>

            <div className="flex items-center my-4">
              <TextField
                label="Tìm kiếm theo tên"
                variant="outlined"
                value={search}
                onChange={handleSearchChange}
                className="mr-4"
              />
              <InputLabel id="field-select-label">Loại sân</InputLabel>
              <Select
                labelId="field-select-label"
                value={filterField}
                onChange={(e: any) => handleFilterChange(e, 'field')}
                className="mr-4"
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="Sân cỏ">Sân cỏ</MenuItem>
                <MenuItem value="Sân đất">Sân đất</MenuItem>
              </Select>

              <InputLabel id="area-select-label">Khu vực</InputLabel>
              <Select
                labelId="area-select-label"
                value={filterArea}
                onChange={(e: any) => handleFilterChange(e, 'area')}
                className="mr-4"
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="Hà Nội">Hà Nội</MenuItem>
                <MenuItem value="Hồ Chí Minh">Hồ Chí Minh</MenuItem>
                <MenuItem value="Bình Dương">Bình Dương</MenuItem>
                <MenuItem value="Cần Thơ">Cần Thơ</MenuItem>
                <MenuItem value="Gia Lai">Gia Lai</MenuItem>
                <MenuItem value="Nghệ An">Nghệ An</MenuItem>
              </Select>

              <Button variant="contained" color="primary" className="ml-auto">
                Tạo Team Mới
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {filteredTeams.map((team) => (
                <CardTeam key={team.id} team={team} onDetailClick={() => handleOpenModal(team)} />
              ))}
            </div>

            <Pagination
              count={Math.ceil(dataTeam.length / pageSize)}
              page={currentPage}
              onChange={handlePageChange}
              className="mt-4"
            />

            {selectedTeam && (
              <ModalTeam
                open={openModal}
                onClose={handleCloseModal}
                team={selectedTeam}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
