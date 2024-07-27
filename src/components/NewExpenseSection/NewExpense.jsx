import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  manageExpenseInput,
  addNewExpense,
} from "../../features/updateExpenseData/updateExpenseDataSlice";
export default function NewExpense() {
  const expenseData = useSelector(
    (state) => state.updateExpenseData.newExpense
  );
  console.log(expenseData);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addNewExpense({
        id: Math.floor(Math.random() * 100),
        transaction: expenseData.name,
        category: expenseData.category,
        amount: expenseData.amount,
      })
    );
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    dispatch(manageExpenseInput({ id, value }));
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Expense Name : </label>
      <input
        placeholder="Expense Name"
        type="text"
        required
        id="name"
        value={expenseData.name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="category">Expense Category : </label>
      <select
        id="category"
        required
        value={expenseData.category}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a Category
        </option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Utilities">Utilities</option>
        <option value="Other">Other</option>
      </select>
      <br />
      <label htmlFor="amount">Expense Amount : </label>
      <input
        type="number"
        required
        min="1"
        id="amount"
        placeholder="Expense Amount"
        value={expenseData.amount}
        onChange={handleChange}
      />
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
