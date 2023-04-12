import axios from "axios";
import { API_URL } from "../confgurations/constants";

class StatusService {
  getStatusById = (id) => {
    return axios({
      url: `${API_URL.Vwater_API}/Status/${id}`,
      method: "GET",
    });
  };
  getStatusList = () => {
    return axios({
      url: `${API_URL.Vwater_API}/Status`,
      method: "GET",
    });
  };
}
export const statusService = new StatusService();
