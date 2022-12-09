import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Obj } from "../../../../global/interface";
import { TYPE_FILE } from "../../../../global/enum";
import IconPlay from "../../../../assets/img/IconPlay.png";
import { ModalEditUnit } from "./ModalEditUnit";
import "./style.scss";

const mockupData = [
  {
    idUnit: "10021",
    title: "Unit1: Làm quen với Excel",
    data: [
      {
        _id: "lesson1",
        title: "Thực hành làm quen",
        link: "link:SCORM/TLU/IND",
        type: "SCORM",
      },
      {
        _id: "lesson2",
        title: "Hướng dẫn thực hành",
        link: "link:SCORM/TLU/IND",
        type: "VIDEO",
      },
    ],
  },
  {
    idUnit: "121221",
    title: "Unit2: Học lưu file trong Excel",
    data: [
      {
        _id: "less23212",
        title: "Thực hành làm quenhihih",
        link: "link:SCORM/TLU/IND",
        type: "SCORM",
      },
      {
        _id: "00128323",
        title: "Hướng dẫn thực phẩm",
        link: "link:SCORM/TLU/IND",
        type: "VIDEO",
      },
    ],
  },
];
interface lessonChosen {
  idUnit?: string;
  type?: TYPE_FILE;
}

export const UnitCourse = () => {
  const [lesson, setLesson] = useState<lessonChosen>({});
  const [visibleModal, setVisibleModal] = useState<boolean>();
  const [dataUnit, setDataUnit] = useState<Obj>({});

  const handleViewLesson = (id: string, type: TYPE_FILE) => {
    setLesson({
      idUnit: id,
      type: type,
    });
  };
  const handlePopUpEditData = (visible: boolean) => {
    setVisibleModal(visible);
  };
  useEffect(() => {}, [lesson]);
  return (
    <div className="container-unit-course">
      <div className="left">
        <div className="bounder">
          {mockupData.map((item) => {
            return (
              <div className="unit" key={item.idUnit}>
                <h2>
                  {item.title}
                  <EditOutlined
                    className="edit"
                    onClick={() => {
                      handlePopUpEditData(true);
                      setDataUnit(item);
                    }}
                  />
                </h2>
                {item.data?.map((data) => {
                  return (
                    <div className="item item-unit">
                      <img src={IconPlay} alt="play" />
                      <Tooltip title="Tổng quan">
                        <u
                          onClick={() => {
                            handleViewLesson(item.idUnit, TYPE_FILE.SCORM);
                          }}
                        >
                          {data.title}
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
        {Object.keys(lesson).length === 0 ? (
          <div className="overview">Xem trước bài học ở đây</div>
        ) : (
          <>view nè</>
        )}
      </div>
      {visibleModal && (
        <ModalEditUnit
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          dataUnit={dataUnit}
        />
      )}
    </div>
  );
};
