import axios from 'axios';
import { API_URL } from '../confgurations/constants';

class ProductTypeService {
    getProductTypes = () => {
        return axios({
            url: `${API_URL.Vwater_API}/ProductType`,
            method: "GET",
        });
    };
}
export const productTypeService = new ProductTypeService();
