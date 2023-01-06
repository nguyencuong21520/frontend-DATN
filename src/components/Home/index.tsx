import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Progress, Spin } from "antd";
import { WatingIcon } from "../../assets/img";
import { Lock } from "../../assets/img";
import { UnLock } from "../../assets/img";
import { ReactComponent as AvgPoint } from "../../assets/svg/AvgPoint.svg";
import { ReactComponent as IconLamp } from "../../assets/svg/IconLamp.svg";
import { ReactComponent as Iconfnc } from "../../assets/svg/Iconfnc.svg";
import { ReactComponent as ArrowRight } from "../../assets/svg/ArrowRight.svg";
import { ReactComponent as Test15 } from "../../assets/svg/Test15.svg";
import { ReactComponent as MessMail } from "../../assets/svg/MessMail.svg";
import { ReactComponent as TimeRange } from "../../assets/svg/TimeRange.svg";
import { ReactComponent as LampThink } from "../../assets/svg/LampThink.svg";
import { ReactComponent as FinalTest } from "../../assets/svg/FinalTest.svg";
import "./style.scss";
import { State } from "../../redux-saga/reducer/reducer";
import { CourcesAction } from "../../redux-saga/course/action";
import { COURCES_REQUEST_GET_DATA, GET_COURSE_VL } from "../../redux-saga/course/reducer";
import { getData } from "../../utils/Hook";
import { Obj } from "../../global/interface";
import { MAJOR_THUMBNAIL } from "../Courses";

interface DashBoard {
  key: string;
  point: string;
  title: string;
  icon: React.ReactElement;
  bottom?: React.ReactElement | string;
}
interface PerformType {
  icon: React.ReactElement;
  title: string;
  remind: string;
}
const perfom: Array<PerformType> = [
  {
    icon: <Test15 />,
    title: "Kiểm tra 15 phút",
    remind: "Hạn: 20:00 20/10",
  },
  {
    icon: <MessMail />,
    title: "Bạn đã được thêm vào lớp",
    remind: "Excel cơ bản",
  },
  {
    icon: <LampThink />,
    title: "Nhắc nhở học tập",
    remind: "Lớp Excel cơ bản",
  },
  {
    icon: <FinalTest />,
    title: "Kiểm tra học kỳ",
    remind: "Hạn: 00:00 09/10",
  },
];

const analysisDashboard: Array<DashBoard> = [
  {
    key: "avg.point",
    point: "7.0",
    title: "Điểm trung bình",
    icon: <AvgPoint />,
    bottom: <Progress percent={30} size="small" />,
  },
  {
    key: "finish",
    point: "5",
    title: "Số bài đã làm",
    icon: <IconLamp />,
  },
  {
    key: "class",
    point: "2",
    title: "Số lớp học",
    icon: <Iconfnc />,
  },
  {
    key: "flag",
    point: "3",
    title: "Cần làm",
    icon: <Iconfnc />,
    bottom: (
      <Link to={"/courses"} className="start">
        Bắt đầu <ArrowRight />
      </Link>
    ),
  },
];
export const Home = () => {
  const course = useSelector((state: State) => state.Cources);
  const navigate = useNavigate()
  const [spin, setSpin] = useState(true);
  const data = getData(course) || [];
  const dispatch = useDispatch();
  const vlRole = useSelector((state: State) => state.RoleViewAppVLReducer);
  useEffect(() => {
    document.title = "Trang chủ";

    if (!course) {
      if ((vlRole?.response as Obj)?.payload.dataRole) {
        dispatch(
          CourcesAction({
            type: GET_COURSE_VL,
          })
        );
      } else {
        dispatch(
          CourcesAction({
            type: COURCES_REQUEST_GET_DATA,
          })
        );
      }
    }
    if (course && !course.pending) {
      setSpin(false);
    }
  }, [course]);
  return (
    <div className="container-home">
      <div className="top-home">
        {analysisDashboard.map((item, idx) => {
          return (
            <div className="item" key={item.key + idx}>
              <div className="top-item">
                <div className="icon">{item.icon}</div>
                <div className="Summary">
                  <strong className="number-summary">{item.point}</strong>
                  <br />
                  <span>{item.title}</span>
                </div>
              </div>
              {item.bottom ? (
                <div className="bottom-item">{item.bottom}</div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="content-main">
        <div className="left-main">
          <div className="head">
            <span>Nổi bật</span>
          </div>
          <div className="main-home">
            {spin ? (
              <Spin />
            ) : (
              data.map((item: Obj, index: number) => {
                return (
                  <div
                    className={`item-course cell${index + 1}`}
                    key={item._id as string}
                    onClick={() => {
                      navigate(`/courses/detail/${item._id as string}`);
                    }}
                  >
                    <div className="img-title">
                      <span className="span title">{item.major as string}</span>
                      <img
                        src={
                          String((item as Obj)?.major)
                            .toLowerCase()
                            .includes("word")
                            ? MAJOR_THUMBNAIL["Word"]
                            : String((item as Obj)?.major)
                              .toLowerCase()
                              .includes("excel")
                              ? MAJOR_THUMBNAIL["Excel"]
                              : String((item as Obj)?.major)
                                .toLowerCase()
                                .includes("power")
                                ? MAJOR_THUMBNAIL["PP"] : item.img

                        }
                        alt="subj"
                        className="img-subj"
                      />
                    </div>
                    <div className="summary">
                      <span className="span name-subj">
                        {item.nameCourse as string}
                      </span>
                      <div className="footer">
                        <div className="time">
                          <TimeRange className="icon" />
                          <span className="time">
                            {(item.time as string) || ""}
                          </span>
                        </div>
                        {item.enroll === true ? (
                          <img src={UnLock} alt="UnLock" />
                        ) : item.enroll === "waiting" ? (
                          <img src={WatingIcon} alt="wating" />
                        ) : (
                          <img src={Lock} alt="Lock" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="right">
          <div className="head">
            <span>Cần thực hiện</span>
          </div>
          <div className="content">
            {perfom.map((item) => {
              return (
                <div
                  className="item-remind"
                  key={item.title + Math.random() * 100}
                >
                  <div className="icon">{item.icon}</div>
                  <div className="summary">
                    <span className="title">{item.title}</span>
                    <br />
                    <span className="remind">{item.remind}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
