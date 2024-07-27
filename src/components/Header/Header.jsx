import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeExpenseData } from "../../features/updateExpenseData/updateExpenseDataSlice";
import { storePrevData } from "../../features/userExpenseData/userExpenseDataSlice";
import style from "./Header.module.css";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userExpenseData.userData);
  // const prevData = useSelector((state) => state.userExpenseData.prevData);
  const updateExpense = useSelector(
    (state) => state.updateExpenseData.updateExpense
  );
  console.log(userData, updateExpense);

  const handleChange = () => {
    dispatch(storePrevData(userData));
    dispatch(changeExpenseData());
    navigate("/");
  };

  return (
    <div className={style.headerContainer}>
      <p>{userData.name}</p>
      <button onClick={handleChange}>New/Update Tracker</button>
    </div>
  );
}
