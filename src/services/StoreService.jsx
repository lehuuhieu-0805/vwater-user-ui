import axios from "axios";
import { API_URL } from "../confgurations/constants";

class StoreService {
    getStores = () => {
        return axios({
            url: `${API_URL.Vwater_API}/Store`,
            method: "GET",
        });
    };
    getStoreById = (id) => {
        return axios({
            url: `${API_URL.Vwater_API}/Store/${id}`,
            method: "GET",
        });
    };
}
export const storeService = new StoreService();
