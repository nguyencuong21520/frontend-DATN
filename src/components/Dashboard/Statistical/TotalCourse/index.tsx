import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { State } from "../../../../redux-saga/reducer/reducer";
import { chartConfig } from "./config";
import "./style.scss";

interface TotalCourseProps {}
class TotalCourse extends Component<TotalCourseProps> {
  private chartOpstion: Highcharts.Options;
  constructor(props: TotalCourseProps) {
    super(props);
    this.chartOpstion = chartConfig();
  }
  shouldComponentUpdate(): boolean {
    return false;
  }
  render() {
    return (
      <div className="container-statis-course">
        <HighchartsReact highcharts={Highcharts} options={this.chartOpstion} />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TotalCourse);
