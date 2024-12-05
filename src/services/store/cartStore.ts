import { create } from "zustand";
import { CartItem, CartState, Order } from "../interfaces/cartInterface";
import { addToCartApi, fetchCartApi, clearCartApi, createOrderApi } from "../api/cartApi";
import { toast } from "react-toastify";

interface CartActions {
  addToCart: (item: CartItem) => Promise<boolean>;
  fetchCart: () => Promise<boolean>;
  clearCart: (item: CartState) => Promise<boolean>;
  increaseCart: (item: CartState) => Promise<boolean>;
  createOrder: (order: Order) => Promise<boolean>;
  updateLocalQuantity: (id: string, quantity: number) => void;
  loading: boolean;
}

export const useCartStore = create<CartItem & CartState & CartActions>((set, get) => ({
  itemCart: "",
  sportProductVariantId: "",
  quantity: 0,
  loading: false,
  orderData: "",
  addToCart: async (item: CartState) => {
    set((state) => ({
      ...state,
      loading: true,
    }))
    try {
      const response = await addToCartApi(item);
      if (response) {
        toast.success('Thêm sản phẩm vào giỏ hàng thành công', {autoClose: 1000})
        set((state) => ({
          ...state,
          sportProductVariantId: item.sportProductVariantId,
          quantity: state.quantity + item.quantity,
          loading: false
        }));
      } else {
        toast.error('Thêm sản phẩm vào giỏ hàng không thành công', {autoClose: 1000})
      }
      return response
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error('Thêm sản phẩm vào giỏ hàng không thành công', {autoClose: 1000})
    }
  },

  updateLocalQuantity: (id, newQuantity) => {
    const { sportProductVariantId } = get();
    if (sportProductVariantId === id) {
      set((state) => ({
        ...state,
        quantity: newQuantity,
      }));
    }
  },

  fetchCart: async () => {
    try {
      const cart = await fetchCartApi();
      set(() => ({
        itemCart: cart || null,
        quantity: cart.totalQuantity || 0,
        loading: false,
      }));
    } catch (error) {
      set(() => ({
        itemCart: "",
        quantity: 0,
        loading: false,
      }));
      console.error("Failed to fetch cart details:", error);
    }
  },

  clearCart: async (item: CartState) => {
    set((state) => ({
      ...state,
      loading: true,
    }))
    try {
      const response = await clearCartApi(item);
      if (response) {
        toast.success('Giảm số lượng thành công', {autoClose: 1000})
        const cart = await fetchCartApi();
        set(() => ({
          itemCart: cart,
          quantity: cart.totalQuantity,
          loading: false,
        }));
      } else {
        toast.error('Giảm số lượng không thành công', {autoClose: 1000})
      }
      return response
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error('Giảm số lượng không thành công', {autoClose: 1000})
    }
  },

  increaseCart: async (item: CartState) => {
    set((state) => ({
      ...state,
      loading: true,
    }))
    try {
      const response = await addToCartApi(item);
      if (response) {
        toast.success('Tăng số lượng thành công', {autoClose: 1000})
        const cart = await fetchCartApi();
        set(() => ({
          itemCart: cart,
          quantity: cart.totalQuantity,
          loading: false,
        }));
      } else {
        toast.error('Tăng số lượng không thành công', {autoClose: 1000})
      }
      return response
    } catch (error) {
      console.error("Failed to add item to cart:", error);
      toast.error('Tăng số lượng không thành công', {autoClose: 1000})
    }
  },

  createOrder: async (order: Order) => { // Hàm mới
    set({ loading: true });
    try {
      const bookingsData = await createOrderApi(order);
      console.log('Data booking', bookingsData)
      return bookingsData;
    } catch (error) {
      set({ error: 'Failed to fetch bookings for customer', loading: false });
    }
  },
}));