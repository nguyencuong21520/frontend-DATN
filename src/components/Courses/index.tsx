import React, { useEffect, useReducer, useState } from "react";
import { Dropdown, Menu, Space, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { Obj } from "../../global/interface";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../redux-saga/reducer/reducer";
import { COURCES_REQUEST_GET_DATA } from "./reducer";
import { CourcesAction } from "./action";
import { ReactComponent as DropdownArrow } from "../../assets/svg/DropdownArrow.svg";
import { ReactComponent as Filters } from "../../assets/svg/Filters.svg";
import { ReactComponent as ShapeCube } from "../../assets/svg/ShapeCube.svg";
import { ReactComponent as TimeRange } from "../../assets/svg/TimeRange.svg";
import { Excel } from "../../assets/img";
import { Word } from "../../assets/img";
import { PP } from "../../assets/img";
import { Lock } from "../../assets/img";
import { UnLock } from "../../assets/img";
import { WatingIcon } from "../../assets/img";
import "./style.scss";
import { getData } from "../../utils/Hook";

const initFieldsFilter = {
  sortBy: "Popular",
  courses: "Courses",
  category: "Category",
};
const reducerFilter = (
  filter: Obj,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case "SortBy":
      return {
        ...filter,
        sortBy: action.payload,
      };
    case "Courses":
      return {
        ...filter,
        courses: action.payload,
      };
    case "Category":
      return {
        ...filter,
        category: action.payload,
      };
    default:
      return filter;
  }
};
export const MAJOR_THUMBNAIL: Record<string, string> = {
  Excel: Excel,
  Word: Word,
  PP: PP
};
export const Cources = () => {
  const [filter, dispatch] = useReducer(reducerFilter, initFieldsFilter);
  const [spin, setSpin] = useState(true);
  const cources = useSelector((state: State) => state.Cources);
  const dataCources =getData(cources) ||
    [];
  const dispatchAction = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Khóa học";
    if (!cources) {
      dispatchAction(
        CourcesAction({
          type: COURCES_REQUEST_GET_DATA,
        })
      );
    }
    if (cources && !(cources?.pending)) {
      setSpin(false);
    }
  }, [cources]);
  const menuSortBy = (
    <Menu
      items={[
        {
          label: <span>Popular</span>,
          key: "1",
          onClick: (e) => {
            dispatch({
              type: "SortBy",
              payload: e.key === "1" ? "Popular" : "",
            });
          },
        },
        {
          label: <span>Basic</span>,
          key: "2",
          onClick: (e) => {
            dispatch({
              type: "SortBy",
              payload: e.key === "2" ? "Basic" : "",
            });
          },
        },
        {
          label: <span>Hard</span>,
          key: "3",
          onClick: (e) => {
            dispatch({
              type: "SortBy",
              payload: e.key === "3" ? "Hard" : "",
            });
          },
        },
      ]}
    />
  );
  const menuCourses = (
    <Menu
      items={[
        {
          label: <span>Courses</span>,
          key: "1",
          onClick: (e) => {
            dispatch({
              type: "Courses",
              payload: e.key === "1" ? "Courses" : "",
            });
          },
        },
        {
          label: <span>Scratch</span>,
          key: "2",
          onClick: (e) => {
            dispatch({
              type: "Courses",
              payload: e.key === "2" ? "Scratch" : "",
            });
          },
        },
        {
          label: <span>Word</span>,
          key: "3",
          onClick: (e) => {
            dispatch({
              type: "Courses",
              payload: e.key === "3" ? "Word" : "",
            });
          },
        },
        {
          label: <span>Excel</span>,
          key: "4",
          onClick: (e) => {
            dispatch({
              type: "Courses",
              payload: e.key === "4" ? "Excel" : "",
            });
          },
        },
      ]}
    />
  );
  const menuCategory = (
    <Menu
      items={[
        {
          label: <span>All Category</span>,
          key: "1",
          onClick: (e) => {
            dispatch({
              type: "Category",
              payload: e.key === "1" ? "All Category" : "",
            });
          },
        },
        {
          label: <span>For Word</span>,
          key: "2",
          onClick: (e) => {
            dispatch({
              type: "Category",
              payload: e.key === "2" ? "For Word" : "",
            });
          },
        },
        {
          label: <span>For Sratch</span>,
          key: "3",
          onClick: (e) => {
            dispatch({
              type: "Category",
              payload: e.key === "3" ? "For Sratch" : "",
            });
          },
        },
        {
          label: <span>For Excel</span>,
          key: "4",
          onClick: (e) => {
            dispatch({
              type: "Courses",
              payload: e.key === "4" ? "For Excel" : "",
            });
          },
        },
      ]}
    />
  );
  return (
    <div className="container-courses">
      <div className="top-container">
        <div className="title">
          <h3>Khóa học</h3>
        </div>
        <div className="filter">
          <div className="fields">
            <div className="field sort-by">
              <strong>Sort by:</strong>
              <Dropdown overlay={menuSortBy} trigger={["click"]}>
                <Space style={{ cursor: "pointer" }}>
                  <span style={{ color: "#767278", fontWeight: 400 }}>
                    {filter.sortBy}
                  </span>
                  <DropdownArrow />
                </Space>
              </Dropdown>
            </div>
            <div className="field by-courses">
              <Dropdown overlay={menuCourses} trigger={["click"]}>
                <Space style={{ cursor: "pointer" }}>
                  <span style={{ color: "#767278", fontWeight: 400 }}>
                    {filter.courses}
                  </span>
                  <DropdownArrow />
                </Space>
              </Dropdown>
            </div>
            <div className="field category">
              <strong>Category:</strong>
              <Dropdown overlay={menuCategory} trigger={["click"]}>
                <Space style={{ cursor: "pointer" }}>
                  <span style={{ color: "#767278", fontWeight: 400 }}>
                    {filter.category}
                  </span>
                  <DropdownArrow />
                </Space>
              </Dropdown>
            </div>
          </div>
          <div className="accept-filter">
            <button className="btn">
              <Filters /> Filters
            </button>
            <button className="btn">
              <ShapeCube />
            </button>
          </div>
        </div>
      </div>
      <div className="main-courses">
        {spin ? <Spin /> : (
          !spin && dataCources.length === 0 ? (
            <div>Không có dữ liệu!</div>
          ) : (
            dataCources.map((item:Obj, index:number) => {
              return (
                <div
                  className={`item-course cell${index + 1}`}
                  key={item._id as string}
                  onClick={() => {
                    navigate(`detail/${item._id as string}`);
                  }}
                >
                  <div className="img-title">
                    <span className="span title">{item.major as string}</span>
                    <img
                      src={String((item as Obj)?.nameCourse).toLowerCase().includes('word') ? MAJOR_THUMBNAIL['Word'] : String((item as Obj)?.nameCourse).toLowerCase().includes('excel') ? MAJOR_THUMBNAIL['Excel'] : String((item as Obj)?.nameCourse).toLowerCase().includes('powerpoint') ? MAJOR_THUMBNAIL['PP'] : ''}
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
                      ) : (item.enroll === 'waiting' ? (<img src={WatingIcon} alt="wating" />) : (
                        <img src={Lock} alt="Lock" />)
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )
        )}

      </div>
    </div>
  );
};
