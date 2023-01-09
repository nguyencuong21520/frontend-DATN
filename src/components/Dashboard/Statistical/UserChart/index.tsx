import React, { Component } from "react";
import { connect } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { State } from "../../../../redux-saga/reducer/reducer";
import { chartConfig } from "./config";
import "./style.scss";
import { Action, Obj } from "../../../../global/interface";
import { UserAction } from "../../../../redux-saga/user/action";
import { USERS_DASH_BOARD } from "../../../../redux-saga/user/reducer";
import { getData } from "../../../../utils/Hook";

interface Props {
  userDashboard: Obj | null;
  UserAction(payload: Action): void;
}
class UserChart extends Component<Props> {
  private chartOpstion: Highcharts.Options;
  private chartRef: React.RefObject<{ chart: Highcharts.Chart }>;
  constructor(props: Props) {
    super(props);
    this.chartOpstion = chartConfig(getData(this.props.userDashboard)?.user || {});
    if (!this.props.userDashboard) {
      this.queryData();
    }
    this.chartRef = React.createRef();
  }
  shouldComponentUpdate(nextProps: Props): boolean {
    if (nextProps.userDashboard) {
      if (!nextProps.userDashboard.pending) {
        const data = getData(nextProps.userDashboard)
        this.chartOpstion = chartConfig(data.user);
        console.log(nextProps)
        this.chartRef.current?.chart.update(this.chartOpstion);
        return true;
      }
    }
    return false;
  }
  queryData = () => {
    this.props.UserAction({
      type: USERS_DASH_BOARD
    })
  }
  render() {
    return (
      <div className="container-statis-course">
        <HighchartsReact highcharts={Highcharts} options={this.chartOpstion} />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  userDashboard: state.UsersDashBoardReducer
});

const mapDispatchToProps = {
  UserAction
};

export default connect(mapStateToProps, mapDispatchToProps)(UserChart);
