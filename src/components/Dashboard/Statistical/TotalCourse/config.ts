import Highcharts from "highcharts";
import { Obj } from "../../../../global/interface";
export const chartConfig = (data: Obj): Highcharts.Options => {
  return {
    chart: {
      type: "column",
    },
    title: {
      text: "Tổng lượng khoá học",
    },
    colors: ["#24bb55", "#248bbb", "#bd393c", "#4a8df7"],
    xAxis: {
      categories: ["Cơ bản", "Nâng cao", "Chuyên sâu"],
    },
    credits: {
      enabled: false,
    },
    yAxis: {
      title: {
        text: "Tổng",
      },
    },

    series: [
      {
        name: "Excel",
        type: "column",
        data: [
          data.BASIC?.Excel || 0,
          data.ADVANCED?.Excel || 0,
          data.INTENSVIVE?.Excel || 0,
        ],
      },
      {
        name: "Word",
        type: "column",
        data: [
          data.BASIC?.Word || 0,
          data.ADVANCED?.Word || 0,
          data.INTENSVIVE?.Word || 0,
        ],
      },
      {
        name: "Powerpoint",
        type: "column",
        data: [
          data.BASIC?.PP || 0,
          data.ADVANCED?.PP || 0,
          data.INTENSVIVE?.PP || 0,
        ],
      },
      {
        name: "Window",
        type: "column",
        data: [
          data.BASIC?.Window || 0,
          data.ADVANCED?.Window || 0,
          data.INTENSVIVE?.Window || 0,
        ],
      },
    ],
  };
};
