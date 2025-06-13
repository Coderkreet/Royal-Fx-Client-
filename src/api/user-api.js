import { Axios } from "../context/MainContent";

const userApi = "/user";
const walletApi = "/wallet";

export async function getUserInfo() {
  const response = await Axios.get(`${userApi}/profile`);
  return response?.data;
}
export async function getDirectUsers() {
  const response = await Axios.get(`${userApi}/get-direct-users`);
  return response?.data;
}
export async function getWithdrawalHistory() {
  const response = await Axios.get(`${userApi}/withdrawal-history`);
  return response?.data;
}
export async function getWalletBalance() {
  const response = await Axios.get(`${walletApi}/balance`);
  return response?.data;
}

export async function updateUserProfile(payload) {
  const response = await Axios.post(`${userApi}/update-profile`, payload);
  return response?.data;
}

  export async function getReferralIncomHistory() {
    const response = await Axios.get(`${userApi}/get-refer-income-history`);
    return response?.data;
  }

  export async function getMinersIncomHistory() {
    const response = await Axios.get(`${userApi}/get-miner-income-history`);
    return response?.data;
  }

    export async function getNebuluxPurchaseData() {
    const response = await Axios.get(`${userApi}/get-nebulux-purchase-data`);
 
    return response?.data;
  }

  
    export async function getNebuluxData() {
    const response = await Axios.get(`${userApi}/get-nebulux-data`);
  
    return response?.data;
  }

export async function purchaseNebuluxCoin(payload) {
  const response = await Axios.post(`${userApi}/purchase-nebulux-coin`, payload);
  console.log(response);
  return response?.data;
}

export async function transferToTopup(payload) {
  const response = await Axios.post(`${userApi}/transfer-amount`, payload);
  return response?.data;
}

export async function getUserTransactionHistory() {
  const response = await Axios.get(`${userApi}/transaction-history`);
  return response?.data;
}

export async function getUserDepositHistory() {
  const response = await Axios.get(`${userApi}/deposits-history`);
  return response?.data;
}

export async function getPurchasedMiners() {
  const response = await Axios.get(`${userApi}/get-purchased-miners`);
  return response?.data;
}

export async function getUserRoi() {
  const response = await Axios.get(`${userApi}/get-roi-income-history`);
  return response?.data;
}


