import axios from "axios";
import { API_URL } from "../confgurations/constants";

class DeliverySlotService {
    getDeliverySlot = () => {
        return axios({
            url: `${API_URL.Vwater_API}/DeliverySlot`,
            method: "GET",
        });
    };
    getDeliverySlotById = (id) => {
        return axios({
            url: `${API_URL.Vwater_API}/DeliverySlot/${id}`,
            method: "GET",
        });
    }
}
export const deliverySlotService = new DeliverySlotService();
