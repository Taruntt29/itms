import { createSlice } from "@reduxjs/toolkit";
import {
  encryptData,
  decryptData,
  PASSWORD_KEY,
  USERID_KEY,
  ROLE_KEY,
  WAREHOUSE_KEY,
} from "../../utils/SECURE";

const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("user");
    if (serializedState === null) {
      return undefined;
    }
    const secureData = JSON.parse(serializedState);
    const { password, userId, userRoleId, warehouse } = secureData;
    const rawData = {
      password: decryptData(password, PASSWORD_KEY),
      userId: decryptData(userId, USERID_KEY),
      userRoleId: decryptData(userRoleId, ROLE_KEY),
      warehouse: decryptData(warehouse, WAREHOUSE_KEY),
    };
    return rawData;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

const initialState = {
  userData: loadState(),
};

const userDataSlice = createSlice({
  name: "userdata",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { password, userId, userRoleId, warehouse } = action.payload.user;
      const secureUser = {
        password: encryptData(password, PASSWORD_KEY),
        userId: encryptData(userId, USERID_KEY),
        userRoleId: encryptData(userRoleId, ROLE_KEY),
        warehouse: encryptData(warehouse, WAREHOUSE_KEY),
      };

      sessionStorage.setItem("user", JSON.stringify(secureUser));
      state.userData = action.payload.user;
    },
  },
});

export const { setUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
