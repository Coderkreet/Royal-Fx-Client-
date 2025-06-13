import { Axios } from "../context/MainContent";

const userApi = "/user";
const adminApi = "/admin";
export async function createUserApi(payload) {
  const response = await Axios.post(`${userApi}/register`, payload);
  return response?.data;
}
export async function loginUserApi(payload) {
  const response = await Axios.post(`${userApi}/login`, payload);
  return response?.data;
}
export async function loginUserWithUsername(payload) {
  const response = await Axios.post(`${userApi}/login-with-username`, payload);
  return response?.data;
}
export async function sendForForgetWithUsername(payload) {
  const response = await Axios.post(`${userApi}/forget-password`, payload);
  return response?.data;
}
export async function verifyOtpForForgetWithUsername(payload) {
  const response = await Axios.post(`${userApi}/verify-forget-otp`, payload);
  return response?.data;
}
export async function createNewPassword(payload) {
  const response = await Axios.post(`${userApi}/create-new-password`, payload);
  return response?.data;
}
export async function loginAdminApi(payload) {
  const response = await Axios.post(`${adminApi}/login`, payload);
  return response?.data;
}

export async function sendRegisterOtp(payload) {
  const response = await Axios.post(`${userApi}/register-with-email`, payload);
  return response?.data;
}
export async function verifyRegisterOtp(payload) {
  const response = await Axios.post(`${userApi}/user-otp-verify`, payload);
  return response?.data;
}

export async function getCurrentUser() {
  const response = await Axios.get(`${userApi}/current-user`);
  return response?.data;
}


const token = localStorage.getItem("token");

export async function loginWithUserIDApi(payload) {
  console.log("Payload for /login:", payload); // 👈
  const response = await Axios.post(`${userApi}/login`, payload, {
    withCredentials: true,
  });
  return response?.data;
}
export async function loginWithWallet(payload) {
  // console.log(payload);
  const response = await Axios.post(`${userApi}/login`, payload, {
    withCredentials: true,
  });
  return response?.data;
}

export async function registerWithWallet(payload) {
  const finalPayload = {
    ...payload,
    // referredBy: payload.referredBy || "NEXA8766",
  };

  const response = await Axios.post(
    `${userApi}/register`,
    finalPayload,
    {
      withCredentials: true,
    }
  );

  return response?.data;
}
