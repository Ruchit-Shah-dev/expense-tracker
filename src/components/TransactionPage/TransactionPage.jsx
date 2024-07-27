import React from "react";
import Header from "../Header/Header";
import { useSelector, useDispatch } from "react-redux";
import Insight from "../InsightsSection/Insight";
import NewExpense from "../NewExpenseSection/NewExpense";
import ExpenseTable from "../ExpenseTableSection/ExpenseTable";
export default function TransactionPage() {
  const userData = useSelector((state) => state.userExpenseData.userData);
  //   console.log(userData);
  return (
    <div>
      <Header />
      <Insight />
      <NewExpense />
      <ExpenseTable />
    </div>
  );
}
