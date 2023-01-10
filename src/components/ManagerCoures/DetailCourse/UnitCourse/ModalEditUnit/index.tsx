import React, { useState } from "react";
import { Input, Modal } from "antd";
import { Obj } from "../../../../../global/interface";
import { ModalEditLesson } from "./ModalEditLesson";
import "./style.scss";

interface ModalEditUnitProps {
  children?: React.ReactElement;
  visibleModal?: boolean;
  setVisibleModal(visible: boolean): void;
  dataLesson: Obj;
}
export const ModalEditUnit = (props: ModalEditUnitProps) => {
  const [visibleModalEdit, setVisibleModalEdit] = useState<boolean>(false);

  const [dataLesson, setDataLesson] = useState<Obj>({});
  return (
    <Modal
      open={props.visibleModal}
      onOk={() => {
        props.setVisibleModal(false);
      }}
      okText="Ok"
      title="Chỉnh sửa thông tin bài học"
      className="modal-edit-unit"
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div className="container-info">
        <div className="row">
          <label htmlFor="title-unit">
            <strong>Tiêu đề học phần</strong>
          </label>
          <Input
            placeholder="Tiêu đề học phần"
            value={props.dataLesson.title}
            id="title-unit"
          />
        </div>
        {props.dataLesson.data?.map((item: Obj) => {
          return (
            <div className="row-file">
              File:{" "}
              <u
                onClick={() => {
                  setDataLesson(item);
                  setVisibleModalEdit(true);
                }}
              >
                {item.title}
              </u>
            </div>
          );
        })}
        {visibleModalEdit && (
          <ModalEditLesson
            dataLesson={dataLesson}
            setVisibleModalEdit={setVisibleModalEdit}
            visibleModalEdit={visibleModalEdit}
          />
        )}
      </div>
    </Modal>
  );
};
