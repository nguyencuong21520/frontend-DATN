import React, { useEffect } from "react";
import Course from "./Statistical/Course";
import TotalCourse from "./Statistical/TotalCourse";
import "./style.scss";

export const Dashboard = () => {
  useEffect(() => {
    document.title = "Dash board";
  }, []);

  return (
    <div className="container-dashboard">
      <div className="chart">
        <div className="plot child">
          <Course />
          <Course />
        </div>
        <div className="total-course child">
          <TotalCourse />
        </div>
      </div>
    </div>
  );
};
