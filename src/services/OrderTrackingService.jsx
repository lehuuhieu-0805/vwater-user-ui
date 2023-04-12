import axios from "axios";
import { API_URL } from "../confgurations/constants";

class OrderTrackingService {
  getOrderTrackingById = (customerid) => {
    return axios({
      url: `${API_URL.Vwater_API}/FollowOrder?customer_id=${customerid}`,
      method: "GET",
    });
  };
}
export const orderTrackingService = new OrderTrackingService();
