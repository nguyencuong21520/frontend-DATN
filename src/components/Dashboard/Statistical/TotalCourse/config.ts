import Highcharts from "highcharts";
export const chartConfig = (): Highcharts.Options => {
  return {
    chart: {
      type: "column",
    },
    title: {
      text: "Tổng lượng khoá học",
    },
    colors: ["#24bb55", "#248bbb", "#bd393c"],
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
        data: [6, 10, 20],
      },
      {
        name: "Word",
        type: "column",
        data: [2, 5, 6],
      },
      {
        name: "Powerpoint",
        type: "column",
        data: [1, 3, 4],
      },
    ],
  };
};
