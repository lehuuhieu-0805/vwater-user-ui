import axios from 'axios';
import { API_URL } from '../confgurations/constants';

class ProductService {
    getMenu = (time, areaId) => {
        return axios({
            url: `${API_URL.Vwater_API}/Menu/Search?time=${time}&area_id=${areaId}`,
            method: "GET",
        });
    };
    getProductByFilter = (menuId, productTypeId) => {
        return axios({
            url: `${API_URL.Vwater_API}/FilterByType?type_id=${productTypeId}&menu_id=${menuId}`,
            method: "GET",
        });
    }
    getProductById = (id) => {
        return axios({
            url: `${API_URL.Vwater_API}/Product/${id}`,
            method: "GET",
        });
    }
}
export const productService = new ProductService();
