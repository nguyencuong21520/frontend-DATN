import Highcharts from "highcharts";
import { Obj } from "../../../../global/interface";
export const chartConfig = (data: Obj): Highcharts.Options => {
  const stu = (data['STUDENT'] as Array<Obj>)?.sort((a, b) => {
    const ti1 = new Date(a.createTime as string);
    const ti2 = new Date(b.createTime as string);
    return ti1.getTime() - ti2.getTime()
  }).map((item: Obj, idx: number) => {
    const ti = new Date(item.createTime as string);
    return {
      y: idx + 1,
      x: ti.getTime()
    }
  })

  const admin = (data['ADMIN'] as Array<Obj>)?.sort((a, b) => {
    const ti1 = new Date(a.createTime as string);
    const ti2 = new Date(b.createTime as string);
    return ti1.getTime() - ti2.getTime()
  }).map((item: Obj, idx: number) => {
    const ti = new Date(item.createTime as string);
    return {
      y: idx + 1,
      x: ti.getTime()
    }
  })

  const teacher = (data['TEACHER'] as Array<Obj>)?.sort((a, b) => {
    const ti1 = new Date(a.createTime as string);
    const ti2 = new Date(b.createTime as string);
    return ti1.getTime() - ti2.getTime()
  }).map((item: Obj, idx: number) => {
    const ti = new Date(item.createTime as string);
    return {
      y: idx + 1,
      x: ti.getTime()
    }
  })
  return {
    chart: {
      type: "spline",
    },
    title: {
      text: "Số lượng người dùng hệ thống",
    },
    colors: ["#24bb55", "#248bbb", "#bd393c"],
    yAxis: [
      {
        title: {
          text: "Số khoá đã tạo",
        },
      },
    ],
    tooltip: {
      xDateFormat: '%d/%m/%Y'
    },
    xAxis: [
      {
        type: 'datetime',

        title: {
          text: "Mốc thời gian",
        },
        labels: {
          format: '{value:%d/%m/%Y}'
        }
      },
    ],
    series: [
      {
        type: "spline",
        data: admin,
        name: "Admin",
      },
      {
        type: "spline",
        data: stu,
        name: "Học sinh",
      },
      {
        type: "spline",
        data: teacher,
        name: "Giáo viên",
      },
    ],
  };
};
