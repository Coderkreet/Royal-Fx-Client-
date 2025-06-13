import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice";
import loadingReducer from "./slice/loadingSlice";
const SsStore = configureStore({
  reducer: {
    userInfo: userSlice,
    loading: loadingReducer,
  },
});

export default SsStore;
