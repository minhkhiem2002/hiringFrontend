import { create } from 'zustand';
import { TeamDetailData, TeamParams, JoinTeam } from '../interfaces/teamInterface';
import { fetchTeams, fetchTeamsByUser, fetchTeam, joinTeam } from '../api/teamApi';

interface TeamState {
  team: TeamDetailData | null;
  teambyid: TeamDetailData | null;
  teams: TeamDetailData[]; 
  loading: boolean;
  error: string | null;
  isJoining: boolean;
  isJoinSuccess: boolean;
  isJoinError: boolean;
  fetchTeamsData: (params?: TeamParams) => Promise<void>;
  fetchTeamsDataById: (CustomerId: string | null) => Promise<void>;
  fetchTeamData: (endpoint: string | null) => Promise<void>;
  fetchJoinTeam: (join: JoinTeam | null, endpoint: string | null) => Promise<void>;
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
      console.log('Team fetch',teamsByIdData)
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
}));
