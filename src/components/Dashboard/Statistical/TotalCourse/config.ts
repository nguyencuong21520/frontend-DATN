import Highcharts from "highcharts";
import { Obj } from "../../../../global/interface";
export const chartConfig = (data: Obj): Highcharts.Options => {
  console.log(data)
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
        data: [data.BASIC?.Excel, data.ADVANCED?.Excel, data.INTENSVIVE?.Excel],
      },
      {
        name: "Word",
        type: "column",
        data: [data.BASIC?.Word, data.ADVANCED?.Word, data.INTENSVIVE?.Word],
      },
      {
        name: "Powerpoint",
        type: "column",
        data: [data.BASIC?.PP, data.ADVANCED?.PP, data.INTENSVIVE?.PP],
      },
      {
        name: "Window",
        type: "column",
        data: [data.BASIC?.Window, data.ADVANCED?.Window, data.INTENSVIVE?.Window],
      },
    ],
  };
};
