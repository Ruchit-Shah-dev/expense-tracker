import React, { useEffect } from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import style from "./ExpenseTable.module.css";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense } from "../../features/updateExpenseData/updateExpenseDataSlice";

export default function ExpenseTable() {
  const pillArray = ["All", "Food", "Travels", "Utilities", "Other"];

  const [clickedIndex, setClickedIndex] = useState(0);

  const dispatch = useDispatch();

  const allExpenseData = useSelector(
    (state) => state.updateExpenseData.allExpenseData
  );

  const [filteredExpenseData, setFilteredExpenseData] = useState([]);

  useEffect(() => {
    setFilteredExpenseData([...allExpenseData]);
  }, [allExpenseData]);

  console.log(allExpenseData);

  const handleClick = (index, value) => {
    setClickedIndex(index);
    console.log(value === "All");
    if (value === "All") setFilteredExpenseData([...allExpenseData]);
    else
      setFilteredExpenseData(
        allExpenseData.filter((item) => item.category === value)
      );
  };

  const deleteIconClick = (id) => {
    console.log(id);
    const output = allExpenseData.filter((item) => item.id !== id);
    dispatch(deleteExpense(output));
  };

  return (
    <div>
      <Stack direction="row" spacing={1}>
        {pillArray.map((item, index) => (
          <button
            key={index}
            onClick={() => handleClick(index, item)}
            className={index === clickedIndex ? style.clickedButton : ""}
          >
            {item}
          </button>
        ))}
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Serial Number</TableCell>
              <TableCell align="right">Transaction</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenseData &&
              filteredExpenseData.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index}
                  </TableCell>
                  <TableCell align="right">{item.transaction}</TableCell>
                  <TableCell align="right">{item.category}</TableCell>
                  <TableCell align="right">{item.amount}</TableCell>
                  <TableCell
                    align="right"
                    onClick={() => deleteIconClick(item.id)}
                  >
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
