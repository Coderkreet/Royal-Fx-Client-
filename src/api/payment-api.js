import { Axios } from "../context/MainContent";

const userApi = "/user";
export async function addDepositAmount(payload) {
  const response = await Axios.post(`${userApi}/deposit-amount`, payload);
  return response?.data;
}
export async function sendWithdrawalAmountRequest(payload) {
  const response = await Axios.post(`${userApi}/withdraw-amount`, payload);
  return response?.data;
}
