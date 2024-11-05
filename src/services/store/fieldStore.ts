import { create } from 'zustand';
import { Field, Rating } from '../interfaces/fieldInterface';
import { fetchFields, FetchFieldsParams, postRatingApi } from '../api/fieldsApi';

interface FieldsState {
  fields: Field[];
  loading: boolean;
  error: string | null;
  fetchFieldsData: (params?: FetchFieldsParams) => Promise<void>;
}

type RatingState = {
  rating: Rating | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetchRating: (rating: Rating | null) => Promise<void>;
}

export const useFieldsStore = create<FieldsState>((set) => ({
  fields: [],
  loading: false,
  error: null,
  fetchFieldsData: async (params) => {
    set({ loading: true, error: null });
    try {
      const fieldsData = await fetchFields(params);
      set({ fields: fieldsData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch fields data', loading: false });
    }
  },
}));

export const useRatingStore = create<RatingState>((set) => ({
  rating: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  fetchRating: async (rating) => {
    set({ isLoading: true, isError: false, isSuccess: false});
    try {
      const ratingData = await postRatingApi(rating);
      if (ratingData) {
        set({ rating: ratingData, isLoading: false, isSuccess: true, isError: false });
      } else {
        set({ isLoading: false, isError: true, isSuccess: false })
      }
    } catch (error) {
      set({ isLoading: false, isError: true, isSuccess: false })
    }
  },
}));

