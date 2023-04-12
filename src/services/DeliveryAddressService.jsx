import axios from "axios";
import { API_URL } from "../confgurations/constants";

class DeliveryAddressService {
  getDeliveryAddressById = (id) => {
    return axios({
      url: `${API_URL.Vwater_API}/DeliveryAddress/${id}`,
      method: "GET",
    });
  };
}
export const deliveryAddressService = new DeliveryAddressService();
