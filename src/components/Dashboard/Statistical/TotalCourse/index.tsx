import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { State } from "../../../../redux-saga/reducer/reducer";
import { chartConfig } from "./config";
import "./style.scss";
import { Obj } from "../../../../global/interface";
import { UserAction } from "../../../../redux-saga/user/action";
import { getData } from "../../../../utils/Hook";
import { Spin } from "antd";

interface Props {
  userDashboard: Obj | null;
}
class TotalCourse extends Component<Props> {
  private chartOpstion: Highcharts.Options;
  private chartRef: React.RefObject<{ chart: Highcharts.Chart }>;
  constructor(props: Props) {
    super(props);
    this.chartOpstion = chartConfig(getData(this.props.userDashboard)?.course.byLV || {});
    this.chartRef = React.createRef();
  }
  shouldComponentUpdate(nextProps: Props): boolean {
    if (nextProps.userDashboard) {
      if (!nextProps.userDashboard.pending) {
        const data = getData(nextProps.userDashboard)
        this.chartOpstion = chartConfig((data.course as Obj).byLV);
        this.chartRef.current?.chart.update(this.chartOpstion);
      }
    }
    return true;
  }
  render() {
    return (
      <div className="container-statis-course">
        {this.props.userDashboard?.pending ? <Spin /> : (<HighchartsReact highcharts={Highcharts} options={this.chartOpstion} />)}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  userDashboard: state.UsersDashBoardReducer
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TotalCourse);
