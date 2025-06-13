import { Axios } from "../context/MainContent";

const userApi = "/user";
export async function getProductLists() {
  const response = await Axios.get(`${userApi}/get-miners`);
  return response?.data;
}
export async function getProductPurchaseHistory() {
  const response = await Axios.get(`${userApi}/get-purchased-miners`);
  return response?.data;
}
export async function purchaseProduct(payload) {
  const response = await Axios.post(`${userApi}/purchase-miner`, payload);
  return response?.data;
}
export async function changeStatusTOUnlock(payload) {
  const response = await Axios.put(`${userApi}/unlock-miner`, payload);
  return response?.data;
}

  export async function getProductHoldingData() {
    const response = await Axios.get(`${userApi}/get-holdings`);
    return response?.data;
  }

  export async function getOurPlans() {
    const response = await Axios.get(`${userApi}/get-plans`);
    return response?.data;
  }

