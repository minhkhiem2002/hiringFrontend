import { create } from 'zustand';
import { TeamDetailData, TeamParams, JoinTeam, PostTeam,UpdateTeam, HandleTeamRequest, DeleteTeamMemberRequest } from '../interfaces/teamInterface';
import { fetchTeams, fetchTeamsByUser, fetchTeam, joinTeam, postCreateTeamApi,patchUpdateTeamApi,deleteTeamApi, postRequestJoinTeamApi, deleteTeamMemberApi } from '../api/teamApi';

interface TeamState {
  team: TeamDetailData | null;
  teambyid: TeamDetailData | null;
  teams: TeamDetailData[]; 
  loading: boolean;
  error: string | null;
  isJoining: boolean;
  isJoinSuccess: boolean;
  isJoinError: boolean;
  isCreate: boolean;
  isCreateSuccess: boolean;
  isCreateError: boolean;
  isUpdate: boolean;
  isUpdateSuccess: boolean;
  isUpdateError: boolean;
  isRequest: boolean;
  isRequestSuccess: boolean;
  isRequestError: boolean;
  isDelete: boolean;
  isDeleteSuccess: boolean;
  isDeleteError: boolean;
  fetchTeamsData: (params?: TeamParams) => Promise<void>;
  fetchTeamsDataById: (CustomerId: string | null) => Promise<void>;
  fetchTeamData: (endpoint: string | null) => Promise<void>;
  fetchJoinTeam: (join: JoinTeam | null, endpoint: string | null) => Promise<void>;
  fetchCreateTeam: (sportteam: PostTeam | null, CustomerId: string | null) => Promise<boolean>;
  fetchUpdateTeam: (sportteam: UpdateTeam | null, CustomerId: string | null) => Promise<boolean>;
  fetchDeleteTeam: (sportTeamId: string | null, CustomerId: string | null) => Promise<boolean>;
  fetchHandleRequestTeam: (request: HandleTeamRequest | null, endpoint: string | null) => Promise<void>;
  deleteTeamMember: (deleteMember: DeleteTeamMemberRequest | null, endpoint: string | null) => Promise<void>;
}

export const useTeamStore = create<TeamState>((set) => ({
  team: null,
  teambyid: null,
  teams: [],
  loading: false,
  error: null,
  isJoining: false,
  isJoinSuccess: false,
  isJoinError: false,
  isCreate: false,
  isCreateSuccess: false,
  isCreateError: false,
  isUpdate: false,
  isUpdateSuccess: false,
  isUpdateError: false,
  isRequest: false,
  isRequestSuccess: false,
  isRequestError: false,
  isDelete: false,
  isDeleteSuccess: false,
  isDeleteError: false,

  fetchTeamsData: async (params) => {
    set({ loading: true, error: null });
    try {
      const teamsData = await fetchTeams(params);
      set({ teams: teamsData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch teams data by id ', loading: false });
    }
  },

  fetchTeamsDataById: async (CustomerId) => {
    set({ loading: true, error: null });
    try {
      const teamsByIdData = await fetchTeamsByUser(CustomerId);
      set({ teambyid: teamsByIdData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch teams data', loading: false });
    }
  },


  fetchTeamData: async (endpoint) => {
    set({ loading: true, error: null });
    try {
      const teamData = await fetchTeam(endpoint);
      set({ team: teamData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch team data', loading: false });
    }
  },

  fetchJoinTeam: async (join, endpoint) => {
    if (!join) return;
    set({ isJoining: true, isJoinError: false, isJoinSuccess: false });
    try {
      const joinTeamData = await joinTeam(join);
      if (joinTeamData) {
        set({ isJoinSuccess: true, isJoining: false });
        if (endpoint) {
          await set((state) => state.fetchTeamData(endpoint));
        }
      } else {
        set({ isJoinError: true, isJoining: false });
      }
      return joinTeamData;
    } catch (error) {
      set({ isJoinError: true, isJoining: false });
    }
  },
  fetchCreateTeam: async (sportteam: PostTeam | null, CustomerId) => {
    if (!sportteam) return;
    set({ isJoining: true, isJoinError: false, isJoinSuccess: false });
    try {
      const createTeamData = await postCreateTeamApi(sportteam);
      if (createTeamData) {
        set({ isCreateSuccess: true, isCreate: false });
        if (CustomerId) {
          await set((state) => state.fetchTeamsDataById(CustomerId));
        }
      } else {
        set({ isCreateError: true, isCreate: false });
      }
      return createTeamData;
    } catch (error) {
      set({ isCreateError: true, isCreate: false });
    }
  },
  fetchUpdateTeam: async (sportteam: UpdateTeam | null, CustomerId) => {
    if (!sportteam) return;
    set({ isUpdate: true, isUpdateError: false, isUpdateSuccess: false });
    try {
      const updateTeamData = await patchUpdateTeamApi(sportteam);
      if (updateTeamData) {
        set({ isUpdateSuccess: true, isUpdate: false });
        if (CustomerId) {
          await set((state) => state.fetchTeamsDataById(CustomerId));
        }
      } else {
        set({ isUpdateError: true, isUpdate: false });
      }
      return updateTeamData;
    } catch (error) {
      set({ isUpdateError: true, isUpdate: false });
    }
  },  
  fetchDeleteTeam: async (sportTeamId: string | null, CustomerId) => {
    if (!sportTeamId) return;
    set({ loading: true });
    try {
      const updateTeamData = await deleteTeamApi(sportTeamId);
      if (updateTeamData) {
        set({ loading: false, error: false });
        if (CustomerId) {
          await set((state) => state.fetchTeamsDataById(CustomerId));
        }
      } else {
        set({ loading: false, error: true });
      }
      return updateTeamData;
    } catch (error) {
      set({ loading: false, error: true });
    }
  },
  fetchHandleRequestTeam: async (request: HandleTeamRequest | null, endpoint) => {
    if (!request) return;
    set({ isRequest: true, isRequestError: false, isRequestSuccess: false });
    try {
      const requestJoinTeamData = await postRequestJoinTeamApi(request);
      if (requestJoinTeamData) {
        set({ isRequestSuccess: true, isRequest: false });
        if (endpoint) {
          await set((state) => state.fetchTeamData(endpoint));
        }
      } else {
        set({ isRequestError: true, isRequest: false });
      }
      return requestJoinTeamData;
    } catch (error) {
      set({ isRequestError: true, isRequest: false });
    }
  },
  deleteTeamMember: async (deleteMember: HandleTeamRequest | null, endpoint) => {
    if (!deleteMember) return;
    set({ isDelete: true, isDeleteError: false, isDeleteSuccess: false });
    try {
      const deleteTeamMember = await deleteTeamMemberApi(deleteMember);
      if (deleteTeamMember) {
        set({ isDeleteSuccess: true, isDelete: false });
        if (endpoint) {
          await set((state) => state.fetchTeamData(endpoint));
        }
      } else {
        set({ isDeleteError: true, isDelete: false });
      }
      return deleteTeamMember;
    } catch (error) {
      set({ isDeleteError: true, isDelete: false });
    }
  },
}));

