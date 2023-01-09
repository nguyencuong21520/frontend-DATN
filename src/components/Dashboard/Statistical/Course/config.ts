import Highcharts from "highcharts";
import { Obj } from "../../../../global/interface";
export const chartConfig = (data: Obj): Highcharts.Options => {
  const exc = (data["Excel"] as Array<Obj>)
    ?.sort((a, b) => {
      const ti1 = new Date(a.createTime as string);
      const ti2 = new Date(b.createTime as string);
      return ti1.getTime() - ti2.getTime();
    })
    .map((item: Obj, idx: number) => {
      const ti = new Date(item.createTime as string);
      return {
        y: idx + 1,
        x: ti.getTime(),
      };
    });

  const wor = (data["Word"] as Array<Obj>)
    ?.sort((a, b) => {
      const ti1 = new Date(a.createTime as string);
      const ti2 = new Date(b.createTime as string);
      return ti1.getTime() - ti2.getTime();
    })
    .map((item: Obj, idx: number) => {
      const ti = new Date(item.createTime as string);
      return {
        y: idx + 1,
        x: ti.getTime(),
      };
    });

  const pp = (data["PP"] as Array<Obj>)
    ?.sort((a, b) => {
      const ti1 = new Date(a.createTime as string);
      const ti2 = new Date(b.createTime as string);
      return ti1.getTime() - ti2.getTime();
    })
    .map((item: Obj, idx: number) => {
      const ti = new Date(item.createTime as string);
      return {
        y: idx + 1,
        x: ti.getTime(),
      };
    });
  const win = (data["Window"] as Array<Obj>)
    ?.sort((a, b) => {
      const ti1 = new Date(a.createTime as string);
      const ti2 = new Date(b.createTime as string);
      return ti1.getTime() - ti2.getTime();
    })
    .map((item: Obj, idx: number) => {
      const ti = new Date(item.createTime as string);
      return {
        y: idx + 1,
        x: ti.getTime(),
      };
    });

  return {
    chart: {
      type: "spline",
    },
    title: {
      text: "Thống kê số lượng khoá học",
    },
    colors: ["#24bb55", "#248bbb", "#bd393c", "#4a8df7"],
    yAxis: [
      {
        title: {
          text: "Số khoá đã tạo",
        },
      },
    ],
    tooltip: {
      xDateFormat: "%d/%m/%Y",
    },
    xAxis: [
      {
        type: "datetime",

        title: {
          text: "Mốc thời gian",
        },
        labels: {
          format: "{value:%d/%m/%Y}",
        },
      },
    ],
    series: [
      {
        type: "spline",
        data: exc,
        name: "Khoá học Excel",
      },
      {
        type: "spline",
        data: wor,
        name: "Khoá học Word",
      },
      {
        type: "spline",
        data: pp,
        name: "Khoá học Powerpoint",
      },
      {
        type: "spline",
        data: win,
        name: "Khoá học Window",
      },
    ],
  };
};
