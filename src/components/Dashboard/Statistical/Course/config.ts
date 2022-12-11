import Highcharts from "highcharts";
export const chartConfig = (): Highcharts.Options => {
  return {
    chart: {
      type: "spline",
    },
    title: {
      text: "Thống kê lượng khoá học",
    },
    colors: ["#24bb55", "#248bbb", "#bd393c"],
    yAxis: [
      {
        title: {
          text: "Số khoá đã tạo",
        },
      },
    ],
    xAxis: [
      {
        title: {
          text: "Mốc thời gian",
        },
      },
    ],
    series: [
      {
        type: "spline",
        data: [1, 2, 1, 4, 3, 6],
        name: "Khoá học Excel",
      },
      {
        type: "spline",
        data: [0.3, 1.7, 0.3, 4, 7, 5.5],
        name: "Khoá học Word",
      },
      {
        type: "spline",
        data: [3, 7, 7.1, 7.4, 7.6, 8],
        name: "Khoá học Powerpoint",
      },
    ],
  };
};
