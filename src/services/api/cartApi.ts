import axios from "axios";
import { CartState, Order } from "../interfaces/cartInterface";

const API_BASE_URL = "https://sportappdemo.azurewebsites.net/api/Cart";
const API_BASE_URL_2 = "https://sportappdemo.azurewebsites.net/api/Order";

export const addToCartApi = async (item: CartState) => {
  try {
    const token = sessionStorage.getItem("token");

    const response = await axios.post(
      `${API_BASE_URL}/AddItem?sportProductVariantId=${item.sportProductVariantId}&quantity=${item.quantity}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
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
    const token = sessionStorage.getItem("token");
    const response = await axios.get(
      `${API_BASE_URL}/GetCartDetail`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    throw error
  }
}


export const clearCartApi = async (item: CartState) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axios.post(`${API_BASE_URL}/DeleteItem?sportProductVariantId=${item.sportProductVariantId}&quantity=${item.quantity}`,{},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to clear cart:", error);
    throw error;
  }
};

export const createOrderApi = async (order: Order) => {
  try {
    const response = await axios.post(`${API_BASE_URL_2}/CreateOrder`,order);
    return response.data;
  } catch (error) {
    console.error("Failed to create order", error);
    throw error;
  }
};

