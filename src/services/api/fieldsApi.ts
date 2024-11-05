// api/fieldsApi.ts
import axios from 'axios';
import { Rating } from '../interfaces/fieldInterface';

const BASE_URL = 'https://sportappdemo.azurewebsites.net/api/SportField';

export interface FetchFieldsParams {
  search?: string;
  sort?: string;
  sports?: string;
  starRatings?: string;
  pageSize?: number;
  pageNumber?: number;
}

export const fetchFields = async (params: FetchFieldsParams = {}) => {
  try {
    const response = await axios.get(`BASE_URL` + '/GetSportFields', {
      params: {
        PageSize: params.pageSize || 10,
        PageNumber: params.pageNumber || 1,
        Search: params.search,
        Sort: params.sort,
        Sports: params.sports,
        StarRatings: params.starRatings,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching fields:", error);
    throw error;
  }
};

export const postRatingApi = async (rating: Rating | null) => {
  try {
    const response = await axios.post(`BASE_URL` + 'AddRating', rating)
    return response.data;
  } catch (error) {
    console.error("Error fetching fields:", error);
    throw error;
  }
}