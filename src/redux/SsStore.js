import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import loadingReducer from "./slice/loadingSlice";
const SsStore = configureStore({
  reducer: {
    userInfo: userReducer,
    loading: loadingReducer,
  },
});

export default SsStore;
