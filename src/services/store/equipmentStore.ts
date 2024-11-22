import { create } from 'zustand';
import { fetchEquipments, fetchEquipment } from '../api/equipmentApi';
import { EquipmentParams,Product } from "./../interfaces/equipmentInteraface";

interface EquipmentState {
  equipment: Product | null;
  equipments: Product[];
  loading: boolean;
  error: string | null;
  fetchEquipmentsData: (params?: EquipmentParams) => Promise<void>;
  fetchEquipmentDetail: (endpoint: string | null) => Promise<void>;
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
