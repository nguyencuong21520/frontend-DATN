import React, { useEffect } from "react";
import Course from "./Statistical/Course";
import UserChart from "./Statistical/UserChart";
import TotalCourse from "./Statistical/TotalCourse";
import "./style.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { State } from "../../redux-saga/reducer/reducer";
import { CourcesAction } from "../../redux-saga/course/action";
import { USERS_DASH_BOARD } from "../../redux-saga/user/reducer";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const userDashboard = useSelector((state: State) => state.UsersDashBoardReducer);

  useEffect(() => {
    document.title = "Dash board";
    if (!userDashboard) {
      dispatch(CourcesAction({
        type: USERS_DASH_BOARD
      }))
    }
  }, []);

  return (
    <div className="container-dashboard">
      <div className="chart">
        <div className="plot child">
          <UserChart />
          <Course />
        </div>
        <div className="total-course child">
          <TotalCourse />
        </div>
      </div>
    </div>
  );
};
