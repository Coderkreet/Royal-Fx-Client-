import { Axios } from "../context/MainContent";

const userApi = "/user";
export async function getUserSwapingData() {
  const response = await Axios.get(`${userApi}/get-swaping-data`);
  return response?.data;
}
export async function postswapConvertData(payload) {
  const response = await Axios.post(`${userApi}/swap-amount`, payload);
  return response?.data;
}
export async function postreSwapConvertData(payload) {
  const response = await Axios.post(`${userApi}/re-swap-amount`, payload);
  return response?.data;
}


export async function getSwapHoldingHistory() {
  const response = await Axios.get(`${userApi}/swap-history`);
  return response?.data;
}
export async function getHoldTokenHistory() {
  const response = await Axios.get(`${userApi}/get-hold-token-history`);
  return response?.data;
}
