import axios from 'axios';
import { EquipmentParams, Rating } from '../interfaces/equipmentInteraface';

const BASE_URL = 'https://sportappdemo.azurewebsites.net/api/SportProduct';

export const fetchEquipments = async (params: EquipmentParams = {}) => {
    try {
      const response = await axios.get(BASE_URL + '/GetSportProducts', {
        params: {
          Search: params.Search,
          PageSize: params.PageSize || 9,
          PageNumber: params.PageNumber || 1,
          OrderBy: params.OrderBy,
          Colors: params.Colors,
          Sizes: params.Sizes,
          Sports: params.Sports,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching equipment:", error);
      throw error;
    }
  };

  export const fetchEquipment = async (endpoint: string) => {
    try {
      const response = await axios.get(
        `https://sportappdemo.azurewebsites.net/api/SportProduct/GetSportProductDetail`, {
          params: {
            EndPoint: decodeURIComponent(endpoint)
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching detail equipment:", error);
      throw error;
    }
  }

  export const postRatingApi = async (rating: Rating | null) => {
    try {
      const response = await axios.post('https://sportappdemo.azurewebsites.net/api/SportProduct/AddRating', rating)
      return response.data;
    } catch (error) {
      console.error("Error add rating products:", error);
      throw error;
    }
  }