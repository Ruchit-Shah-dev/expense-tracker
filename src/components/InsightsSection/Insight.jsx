import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector, useDispatch } from "react-redux";
import { removeLastExpense } from "../../features/updateExpenseData/updateExpenseDataSlice";

export default function Insight() {
  const userData = useSelector((state) => state.userExpenseData.userData);
  const allExpenseData = useSelector(
    (state) => state.updateExpenseData.allExpenseData
  );
  const dispatch = useDispatch();
  console.log(allExpenseData);
  function createData(category, budget) {
    let expense = allExpenseData.length
      ? allExpenseData
          .filter((item) => item.category === category)
          .reduce((acc, cv) => acc + Number(cv.amount), 0)
      : 0;

    const expenseNum = Number(expense);
    const budgetNum = Number(budget);

    if (expenseNum > budgetNum) {
      const answer = window.confirm(
        `Hey, your ${category} expense is exceeding your current budget. Do you want to proceed?`
      );

      if (answer) {
        // User confirmed to proceed
        const limitStatus = "exceeded";
        const balance = budgetNum - expenseNum;
        return {
          category,
          limitStatus,
          budget: budgetNum,
          expense: expenseNum,
          balance,
        };
      } else {
        // User did not confirm, calculate remaining budget

        dispatch(removeLastExpense());
        console.log(
          "Expense was removed and the action was saved to the database."
        );
        const limitStatus = "within";
        let expense = allExpenseData.length
          ? allExpenseData
              .filter((item) => item.category === category)
              .reduce((acc, cv) => acc + Number(cv.amount), 0)
          : 0;
        const balance = budgetNum - Number(expense);
        return {
          category,
          limitStatus,
          budget: budgetNum,
          expense: expense,
          balance,
        };
      }
    } else {
      // Expense is within the budget
      const limitStatus = "within";
      const balance = budgetNum - expenseNum;
      return {
        category,
        limitStatus,
        budget: budgetNum,
        expense: expenseNum,
        balance,
      };
    }
  }

  const rows = [
    createData("All", userData.totalBudget),
    createData("Food", userData.food),
    createData("Travel", userData.travel),
    createData("Utilities", userData.utilities),
    createData("Other", userData.other),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category</TableCell>
            <TableCell align="right">Limit Status</TableCell>
            <TableCell align="right">Budget</TableCell>
            <TableCell align="right">Expense</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell align="right">{row.limitStatus}</TableCell>
              <TableCell align="right">{row.budget}</TableCell>
              <TableCell align="right">{row.expense}</TableCell>
              <TableCell align="right">{row.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
