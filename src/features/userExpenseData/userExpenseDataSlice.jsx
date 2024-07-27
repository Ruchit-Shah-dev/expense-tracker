import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: {
    name: "",
    totalBudget: "",
    food: "",
    travel: "",
    utilities: "",
    other: "",
  },
  prevData: {
    name: "",
    totalBudget: "",
    food: "",
    travel: "",
    utilities: "",
    other: "",
  },
};

export const userExpenseDataSlice = createSlice({
  name: "userExpenseData",
  initialState,
  reducers: {
    changeInputValue: (state, action) => {
      // console.log(action);
      const { id, value } = action.payload;
      // console.log(id, value, state.userData);
      state.userData[id] = value;
    },
    resetValue: (state) => {
      state.userData = {
        name: "",
        totalBudget: "",
        food: "",
        travel: "",
        utilities: "",
        other: "",
      };
    },
    storePrevData: (state, action) => {
      state.prevData = action.payload;
    },
    handleGoBack: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export default userExpenseDataSlice.reducer;

export const { changeInputValue, resetValue, storePrevData, handleGoBack } =
  userExpenseDataSlice.actions;
