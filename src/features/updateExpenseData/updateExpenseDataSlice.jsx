import { createSlice } from "@reduxjs/toolkit";

export const updateExpenseDataSlice = createSlice({
  name: "updateExpenseData",
  initialState: {
    updateExpense: false,
    newExpense: {
      name: "",
      category: "",
      amount: "",
    },
    allExpenseData: [],
  },
  reducers: {
    changeExpenseData: (state) => {
      state.updateExpense = !state.updateExpense;
    },
    manageExpenseInput: (state, action) => {
      // console.log(action);
      const { id, value } = action.payload;
      // console.log(id, value, state.userData);
      state.newExpense[id] = value;
    },
    addNewExpense: (state, action) => {
      state.allExpenseData.push(action.payload);
      state.newExpense = {
        name: "",
        category: "",
        amount: "",
      };
    },
    removeLastExpense: (state) => {
      state.allExpenseData.pop();
    },
    deleteExpense: (state, action) => {
      console.log(action.payload);
      state.allExpenseData = action.payload;
    },
  },
});

export default updateExpenseDataSlice.reducer;

export const {
  changeExpenseData,
  manageExpenseInput,
  addNewExpense,
  removeLastExpense,
  deleteExpense,
} = updateExpenseDataSlice.actions;
