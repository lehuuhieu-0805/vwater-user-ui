import axios from 'axios';
import { API_URL } from '../confgurations/constants';

class AuthenService {
  getAreas = () => {
    return axios({
      url: `${API_URL.Vwater_API}/Area`,
      method: "GET",
    });
  };
  getAreaById = (id) => {
    return axios({
      url: `${API_URL.Vwater_API}/Area/${id}`,
      method: "GET",
    });
  };
  getApartmmentById = (id) => {
    return axios({
      url: `${API_URL.Vwater_API}/Apartment/${id}`,
      method: "GET",
    });
  };
  getDeliveryTypes = () => {
    return axios({
      url: `${API_URL.Vwater_API}/DeliveryType`,
      method: "GET",
    });
  };
  getDeliveryTypeById = (id) => {
    return axios({
      url: `${API_URL.Vwater_API}/DeliveryType/${id}`,
      method: "GET",
    });
  };
  saveCustomer = (customer) => {
    return axios({
      url: `${API_URL.Vwater_API}/Customer`,
      method: "POST",
      data: customer
    });
  };
  saveDeliveryAddress = (deliveryAddress) => {
    return axios({
      url: `${API_URL.Vwater_API}/DeliveryAddress`,
      method: "POST",
      data: deliveryAddress
    });
  }
}
export const authenService = new AuthenService();
