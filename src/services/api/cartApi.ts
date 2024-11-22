import axios from "axios";
import { CartState } from "../interfaces/cartInterface";

const API_BASE_URL = "https://sportappdemo.azurewebsites.net/api/Cart";

export const addToCartApi = async (item: CartState) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/AddItem?sportProductVariantId=${item.sportProductVariantId}&quantity=${item.quantity}`, {},
      {
        withCredentials: true,
      }
     );
    return response.data;
  } catch (error) {
    console.error("Failed to add to cart:", error);
    throw error;
  }
};

export const fetchCartApi = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/GetCartDetail`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    throw error
  }
}


export const clearCartApi = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/DeleteItem`);
    return response.data;
  } catch (error) {
    console.error("Failed to clear cart:", error);
    throw error;
  }
};
