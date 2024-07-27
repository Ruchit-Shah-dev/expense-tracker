import { configureStore } from "@reduxjs/toolkit";
import userExpenseDataReducer from "./features/userExpenseData/userExpenseDataSlice";
import updateExpenseDataSlice from "./features/updateExpenseData/updateExpenseDataSlice";

export const store = configureStore({
  reducer: {
    userExpenseData: userExpenseDataReducer,
    updateExpenseData: updateExpenseDataSlice,
  },
});
