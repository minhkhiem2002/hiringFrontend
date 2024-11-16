'use client';
import React, { useEffect, useState } from 'react';
import { Pagination, Button, TextField, InputLabel, Select, MenuItem, Tabs, Tab } from '@mui/material';
import Link from 'next/link';
import Navbar from './../../../../components/user/main-nav';
import ProfileSidebar from './../../../../components/user/profile-sidebar';
import CardTeams from '@/components/user/card-team/card-teams';
import { useTeamStore } from "@/services/store/teamStore";

interface Team {
  name: string;
  address: string;
  currentMember: number;
  limitMember: number;
  sport: string;
  endpoint: string;
  avatar: string | null;
}

const TeamPage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [filterSport, setFilterSport] = useState<string>('');
  const [filterArea, setFilterArea] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 4;

  // Fetch data from the store
  const { fetchTeamsDataById, teambyid, loading } = useTeamStore();

  useEffect(() => {
    const roleId = sessionStorage.getItem('roleId');
    fetchTeamsDataById(roleId);
  }, [fetchTeamsDataById]);

  // Ensure teambyid.sportTeams is an array
  const sportTeams = Array.isArray(teambyid?.sportTeams) ? teambyid.sportTeams : [];

  console.log('Team',sportTeams)

  // Filter teams based on search, sport, and area
  const filteredTeams = sportTeams
    .filter(team =>
      team.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filterSport || team.sport === filterSport) &&
      (!filterArea || team.address.includes(filterArea))
    )
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  // Handle filter change
  const handleFilterChange = (event: React.ChangeEvent<{ value: unknown }>, type: string) => {
    const value = event.target.value as string;
    if (type === 'sport') setFilterSport(value);
    if (type === 'area') setFilterArea(value);
  };

  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Handle pagination change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className="sticky z-20">
        <Navbar />
      </div>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <ProfileSidebar fullName="Nguyễn Văn A" avatar="/images/avatar.jpg" />
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
              <InputLabel id="sport-select-label">Loại thể thao</InputLabel>
              <Select
                labelId="sport-select-label"
                value={filterSport}
                onChange={(e: any) => handleFilterChange(e, 'sport')}
                className="mr-4"
              >
                <MenuItem value="">Tất cả</MenuItem>
                <MenuItem value="Bóng đá">Bóng đá</MenuItem>
                <MenuItem value="Bóng rổ">Bóng rổ</MenuItem>
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
              </Select>

              <Button variant="contained" color="primary" className="ml-auto">
                Tạo Team Mới
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {loading ? (
                <p>Đang tải dữ liệu...</p>
              ) : (
                filteredTeams.map(team => (
                  <Link key={team.endpoint} href={`/team/${team.endpoint}`} passHref>
                    <div className="cursor-pointer">
                      <CardTeams 
                        name = {team.name}
                        address = {team.address}
                        currentMember = {team.currentMember}
                        limitMember = {team.limitMember}
                        sport = {team.sport}
                        avatar = {team.avatar}
                        endpoint={team.endpoint}
                      />
                    </div>
                  </Link>
                ))
              )}
            </div>

            <Pagination
              count={Math.ceil((teambyid?.count || 0) / pageSize)}
              page={currentPage}
              onChange={handlePageChange}
              className="mt-4"
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
