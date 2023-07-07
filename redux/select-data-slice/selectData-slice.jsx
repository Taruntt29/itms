import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roleData: [],
  branchData: [],
};

const allSelectData = createSlice({
  name: "selectData",
  initialState,
  reducers: {
    setRoleSelectData(state, action) {
      state.roleData = action.payload.data;
    },
    setBranchSelectData(state, action) {
      state.branchData = action.payload.data;
    },
  },
});

export const { setRoleSelectData, setBranchSelectData } = allSelectData.actions;
export default allSelectData.reducer;
