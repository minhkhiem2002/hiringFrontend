import { create } from "zustand";
import { CartItem, CartState } from "../interfaces/cartInterface";
import { addToCartApi, fetchCartApi, clearCartApi } from "../api/cartApi";
import { toast } from "react-toastify";

interface CartActions {
  addToCart: (item: CartItem) => Promise<boolean>;
  fetchCart: () => Promise<boolean>;
  clearCart: () => Promise<boolean>;
  updateLocalQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartItem & CartState & CartActions>((set, get) => ({
  itemCart: null,
  sportProductVariantId: "",
  quantity: 0,
  addToCart: async (item: CartState) => {
    try {
      const response = await addToCartApi(item);
      if (response) {
        toast.success('Thêm sản phẩm vào giỏ hàng thành công', {autoClose: 1000})
        set((state) => ({
          ...state,
          sportProductVariantId: item.sportProductVariantId,
          quantity: state.quantity + item.quantity,
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
        item: cart,
        quantity: cart.totalQuantity,
      }));
    } catch (error) {
      console.error("Failed to fetch cart details:", error);
    }
  },

  clearCart: async () => {
    try {
      await clearCartApi();
      set(() => ({
        sportProductVariantId: "",
        quantity: 0,
      }));
    } catch (error) {
      console.error("Failed to clear cart:", error);
    }
  },
}));
