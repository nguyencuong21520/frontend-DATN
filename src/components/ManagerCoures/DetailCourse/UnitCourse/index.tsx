import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Obj } from "../../../../global/interface";
import { TYPE_FILE } from "../../../../global/enum";
import IconPlay from "../../../../assets/img/IconPlay.png";
import { ModalEditUnit } from "./ModalEditUnit";
import { useSelector } from "react-redux";
import { State } from "../../../../redux-saga/reducer/reducer";
import { getData } from "../../../../utils/Hook";
import ScormIcon from "../../../../assets/img/ScormIcon.png";
import { ReactComponent as Plus } from '../../../../assets/svg/plus.svg';
import "./style.scss";
import { useNavigate } from "react-router-dom";


export const UnitCourse = () => {
  const [unit, setUnit] = useState<Obj>({});
  const [visibleModal, setVisibleModal] = useState<boolean>();
  const [lesson, setDataLesson] = useState<Obj>({});
  const detailCourse = useSelector((state: State) => state.OneCourceDetailReducer);
  const data = getData(detailCourse)[0];
  const nav = useNavigate();
  console.log(data)
  const handleViewUnit = (src: string, type: TYPE_FILE) => {
    setUnit({
      src: src,
      type: type,
    });
  };
  const handlePopUpEditData = (visible: boolean) => {
    setVisibleModal(visible);
  };
  const handleAddUnit = () => {
    nav(`/create/course/${data._id}/unit`, { replace: true })
  }
  const handleAddLesson = (id: string) => {
    nav(`/create/course/${id}/lesson`, { replace: true })
  }
  useEffect(() => {
    console.log(unit)
  }, [unit]);
  return (
    <div className="container-unit-course">
      <div className="left">
        <div className="bounder">
          <div className="top">
            {data?.unit.length === 0 && (<><div className="no-data">Chưa có bài học, hãy thêm mới nhé</div></>)}

            <Tooltip title="Thêm học phần" trigger={["hover"]}><Plus onClick={handleAddUnit} /></Tooltip>
          </div>

          {data?.unit.length !== 0 && data?.unit.map((item: Obj) => {
            return (
              <div className="unit" key={item._id}>
                <h2>
                  {item.unitName}
                  <EditOutlined
                    className="edit"
                    onClick={() => {
                      handlePopUpEditData(true);
                      setDataLesson(item);
                    }}
                  />
                  <Tooltip title="Thêm bài học" trigger={["hover"]}><Plus onClick={() => {
                    handleAddLesson(item._id as string)
                  }} /></Tooltip>
                </h2>
                {item.lesson?.map((data: Obj) => {
                  return (
                    <div className="item item-unit" key={data._id}>
                      <img src={data.type === TYPE_FILE.VIDEO ? IconPlay : ScormIcon} alt="play" />
                      <Tooltip title="Tổng quan">
                        <u
                          onClick={() => {
                            handleViewUnit(data.source, data.type);
                          }}
                        >
                          {data.lessonName}
                        </u>
                      </Tooltip>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="right">
        {Object.keys(unit).length === 0 ? (
          <div className="overview">Xem trước bài học ở đây</div>
        ) : (
          <div className="view">
            {unit.type === TYPE_FILE.SCORM ?
              <iframe src={unit.src} className="scorm-view" title=" "></iframe> : (<video
                className="video"
                controls
                width="100%"
                src={(unit.src as string) || ""}
              ></video>)}
          </div>
        )}
      </div>
      {visibleModal && (
        <ModalEditUnit
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          dataLesson={lesson}
        />
      )}
    </div>
  );
};
