import React from "react";
import style from "./LandingPage.module.css";
// import { useState } from "react";
// import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import {
  changeInputValue,
  resetValue,
  handleGoBack,
} from "../../features/userExpenseData/userExpenseDataSlice";
import { changeExpenseData } from "../../features/updateExpenseData/updateExpenseDataSlice";

export default function LandingPage() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userExpenseData.userData);
  const prevData = useSelector((state) => state.userExpenseData.prevData);
  console.log(prevData);
  const dispatch = useDispatch();
  const updateExpense = useSelector(
    (state) => state.updateExpenseData.updateExpense
  );
  //   const [userData, setUserDate] = useState({
  //     name: "",
  //     totalBudget: "",
  //     food: "",
  //     travel: "",
  //     utilities: "",
  //     other: "",
  //   });
  //   console.log(userData);
  console.log(updateExpense);
  const handleChange = (e) => {
    const { id, value } = e.target;
    // // console.log(id, value, typeof value);
    // setUserDate({ ...userData, [id]: value });

    dispatch(changeInputValue({ id, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      Number(userData.totalBudget) >=
      Number(userData.food) +
        Number(userData.travel) +
        Number(userData.utilities) +
        Number(userData.other)
    ) {
      const value = String(
        Number(userData.other) +
          (Number(userData.totalBudget) -
            (Number(userData.food) +
              Number(userData.travel) +
              Number(userData.utilities) +
              Number(userData.other)))
      );

      //   console.log(userData.other, typeof userData.other);
      //   setUserDate({ ...userData, other: String(userData.other) });
      const id = "other";
      dispatch(changeInputValue({ id, value }));

      updateExpense && dispatch(changeExpenseData());

      navigate("/transactionPage");
    } else {
      alert("Total Categorical budget should not exceed monthly budget");
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name : </label>
        <input
          placeholder="name"
          type="text"
          required
          id="name"
          value={userData.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="totalBudget">Total Budget : </label>
        <input
          type="number"
          required
          min="1"
          id="totalBudget"
          placeholder="Total budget amount"
          value={userData.totalBudget}
          onChange={handleChange}
        />
        <br />

        <label htmlFor="food">Food : </label>
        <input
          type="number"
          required
          id="food"
          placeholder="Budget for food"
          value={userData.food}
          onChange={handleChange}
        />
        <label htmlFor="travel">Travel : </label>
        <input
          type="number"
          required
          id="travel"
          placeholder="Budget for Travel"
          value={userData.travel}
          onChange={handleChange}
        />
        <label htmlFor="utilities">Utilities : </label>
        <input
          type="number"
          required
          id="utilities"
          placeholder="Budget for Utilities"
          value={userData.utilities}
          onChange={handleChange}
        />
        <label htmlFor="other">Other : </label>
        <input
          type="number"
          required
          id="other"
          placeholder="Budget for Other Expenses"
          value={userData.other}
          onChange={handleChange}
        />

        <br />
        {updateExpense ? (
          <div>
            <button onClick={() => handleSubmit}>Update Budget</button>
            <button
              onClick={() => {
                dispatch(resetValue());
                dispatch(changeExpenseData());
              }}
            >
              New Tracker
            </button>
            <button
              onClick={() => {
                dispatch(handleGoBack(prevData));
                dispatch(changeExpenseData());
                navigate("/transactionPage");
              }}
            >
              Go Back
            </button>
          </div>
        ) : (
          <button type="submit">Submit</button>
        )}
      </form>
    </div>
  );
}
