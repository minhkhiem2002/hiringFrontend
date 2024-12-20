import axios from 'axios';
import { Team, TeamParams, JoinTeam, PostTeam,UpdateTeam, HandleTeamRequest, DeleteTeamMemberRequest } from '../interfaces/teamInterface';
import { ToastContainer, toast } from 'react-toastify'

const BASE_URL = 'https://sportappdemo.azurewebsites.net/api/SportTeam';

export const fetchTeams = async (params: TeamParams = {}) => {
    try {
      const response = await axios.get(BASE_URL + '/GetSportTeams', {
        params: {
          PageSize: params.PageSize || 10,
          PageNumber: params.PageNumber || 1,
          Search: params.Search,
        //   Sort: params.sort,
        //   Sports: params.sports,
        //   StarRatings: params.starRatings,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching team:", error);
      throw error;
    }
  };

  export const fetchTeamsByUser = async (CustomerId: string) => {
    try {
      const response = await axios.get(BASE_URL + '/GetByCustomer',{
        params: {
          CustomerId: CustomerId, 
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching team by user:", error);
      throw error;
    }
  };

  export const fetchTeam = async (endpoint: string | null) => {
    try {
      const response = await axios.get(
        `https://sportappdemo.azurewebsites.net/api/SportTeam/GetSportTeamDetail`, {
          params: {
            EndPoint: decodeURIComponent(endpoint)
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching team:", error);
      throw error;
    }
  }

  export const joinTeam = async (join: JoinTeam | null) => {
  try {
    const response = await axios.post('https://sportappdemo.azurewebsites.net/api/SportTeam/JoinSportTeam', join)
    return response.data;
  } catch (error) {
    console.error("Error join team:", error);
    const errorMessage = error?.response?.data?.message || "Xin gia nhập không thành công";
    toast.error(errorMessage, { autoClose: 1500 });
    throw error;
  }
}

export const postCreateTeamApi = async (sportteam: PostTeam) => {
  try {
    const response = await axios.post(
      'https://sportappdemo.azurewebsites.net/api/SportTeam/CreateSportTeam',
      sportteam,
      {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating team:", error);
    throw error;
  }
};

export const patchUpdateTeamApi = async (sportteam: UpdateTeam) => {
  try {
    const response = await axios.patch(
      'https://sportappdemo.azurewebsites.net/api/SportTeam/UpdateSportTeam',
      sportteam
    );
    return response.data;
  } catch (error) {
    console.error("Error update team:", error);
    throw error;
  }
};

export const deleteTeamApi = async (sportTeamId: string) => {
  try {
    const dataDelete = {
      "sportTeamId": sportTeamId
    }
    const response = await axios.delete('https://sportappdemo.azurewebsites.net/api/SportTeam/DeleteSportTeam', {
      data: sportTeamId, 
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting sport team:", error);
    throw error;
  }
};

export const postRequestJoinTeamApi = async (request: HandleTeamRequest) => {
  try {
    const response = await axios.post(
      'https://sportappdemo.azurewebsites.net/api/SportTeam/HandleRequest',
      request,
    );
    return response.data;
  } catch (error) {
    console.error("Error handle request team:", error);
    throw error;
  }
};

export const deleteTeamMemberApi = async (deleteMember: DeleteTeamMemberRequest) => {
  try {
    const response = await axios.delete('https://sportappdemo.azurewebsites.net/api/SportTeam/DeleteMember', {
      data: deleteMember, 
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting team member:", error);
    throw error;
  }
};

