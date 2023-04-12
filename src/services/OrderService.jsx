import axios from "axios";
import { API_URL } from "../confgurations/constants";

class OrderService {
  getOrderByCustomerId = (customerid) => {
    return axios({
      url: `${API_URL.Vwater_API}/GetOrderByCustomer?customer_id=${customerid}`,
      method: "GET",
    });
  };
  getLastedOrderByCustomerId = (id) => {
    return axios({
      url: `${API_URL.Vwater_API}/LastestOrder?customer_id=${id}`,
      method: "GET",
    });
  };
  CreateOrder = (order) => {
    return axios({
      url: `${API_URL.Vwater_API}/Order`,
      method: "POST",
      data: order
    });
  };
  reOrderByOrderId = (id) => {
    return axios({
      url: `${API_URL.Vwater_API}/ReOrder/${id}`,
      method: "GET",
    });
  }
}
export const orderService = new OrderService();
