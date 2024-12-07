import { create } from 'zustand';
import { fetchEquipments, fetchEquipment, postRatingApi } from '../api/equipmentApi';
import { EquipmentParams,Product, Rating } from "./../interfaces/equipmentInteraface";

interface EquipmentState {
  equipment: Product | null;
  equipments: Product[];
  loading: boolean;
  error: string | null;
  fetchEquipmentsData: (params?: EquipmentParams) => Promise<void>;
  fetchEquipmentDetail: (endpoint: string | null) => Promise<void>;
}

type RatingState = {
  rating: Rating | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  fetchRating: (rating: Rating | null) => Promise<void>;
}


export const useEquipmentStore = create<EquipmentState>((set) => ({
  equipment: null,
  equipments: [],
  loading: false,
  error: null,

  fetchEquipmentsData: async (params) => {
    set({ loading: true, error: null });
    try {
      const equipmentsData = await fetchEquipments(params);
      set({ equipments: equipmentsData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch equipments data', loading: false });
    }
  },

  fetchEquipmentDetail: async (endpoint) => {
    set({ loading: true, error: null });
    try {
      const equipmentDetail = await fetchEquipment(endpoint);
      set({ equipment: equipmentDetail, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch equipment detail', loading: false });
    }
  },
}));

export const useRatingEquipmentStore = create<RatingState>((set) => ({
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
