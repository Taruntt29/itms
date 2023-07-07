import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/auth-slice";
import userDataReducer from "./userdata-slice/usedata-slice";
import allSelectDataReducer from "./select-data-slice/selectData-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userDataReducer,
    selectData: allSelectDataReducer,
  },
});

export default store;
