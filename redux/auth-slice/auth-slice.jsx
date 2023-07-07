import { createSlice } from "@reduxjs/toolkit";
import {
  API_KEY,
  decryptData,
  encryptData,
  STATUS_KEY,
} from "../../utils/SECURE";

const initialState = {
  isLogin: !!sessionStorage.getItem("token"),
  token: decryptData(sessionStorage.getItem("token"), API_KEY) || "",
  // isLogin: true,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setLogin(state, action) {
      sessionStorage.setItem(
        "login",
        encryptData(action.payload.status.toString(), STATUS_KEY)
      );
      sessionStorage.setItem(
        "token",
        encryptData(action.payload.token, API_KEY)
      );
      state.isLogin = action.payload.status;
    },
    setLogout(state) {
      sessionStorage.clear();
      state.isLogin = false;
      state.token = "";
    },
    // setRefreshToken(state, action) {
    //   sessionStorage.setItem(
    //     "token",
    //     encryptData(action.payload.token, API_KEY)
    //   );
    //   state.token = action.payload.token;
    // },
  },
});

export const { setLogin, setLogout, setRefreshToken } = authSlice.actions;
export default authSlice.reducer;
