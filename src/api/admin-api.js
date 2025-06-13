
import { Axios } from "../context/MainContent";

const adminApi = "/admin";
const token = localStorage.getItem('token');

export async function getAdminInfo() {
  const response = await Axios.get(`${adminApi}/get-admin`);
  return response?.data;
}
export async function getDashboardData() {
  const response = await Axios.get(`${adminApi}/get-dashboard-data`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response?.data;
}

export async function getAllUserList() {
  const response = await Axios.get(`${adminApi}/get-all-users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response?.data;
}
export async function getCoinData() {
  const response = await Axios.get(`${adminApi}/get-nebulux-data`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response?.data;
}

export async function getNebuluxPurchaseHistory() {
  const response = await Axios.get(`${adminApi}/get-nebulux-purchase-history`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response?.data;
}


export async function userStatusToggle(id) {
  const response = await Axios.post(`${adminApi}/user-block/${id}`);
  return response?.data;
}



export async function getAdminDepositFundHistory() {
  const response = await Axios.get(`${adminApi}/get-fund-deposit-history`);
  return response?.data;
}
export async function getAdminWithdrawalHistory() {
  const response = await Axios.get(`${adminApi}/get-withdrawal-history`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response?.data;
}
export async function getAllUserIDNameList() {
  const response = await Axios.get(`${adminApi}/all-user-id-name`);
  return response?.data;
}
export async function getFilteredMinerByUserId(id) {
  const response = await Axios.get(`${adminApi}/get-user-purchased-miner/${id}`);
  return response?.data;
}
export async function getFilteredHoldingsByUserId(id) {
  const response = await Axios.get(`${adminApi}/get-user-holdings-trading/${id}`);
  return response?.data;
}


  export async function getReferralIncomHistory() {
    const response = await Axios.get(`${adminApi}/get-miner-income-history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response?.data;
  }
  export async function getMinersIncomHistory() {
    const response = await Axios.get(`${adminApi}/get-miner-income-history`);
    return response?.data;
  }


  export async function getMinerPurchaseHistory() {
    const response = await Axios.get(`${adminApi}/get-purchase-history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response?.data;
  }

  export async function getIncomeHistory() {
    const response = await Axios.get(`${adminApi}/get-income-history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response?.data;
  }

  export async function getRoiHistory() {
    const response = await Axios.get(`${adminApi}/get-roi-history`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response?.data;
  }