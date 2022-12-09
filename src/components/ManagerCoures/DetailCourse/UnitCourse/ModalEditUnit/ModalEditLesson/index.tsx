import React, { useEffect, useState } from "react";
import { Button, message, Upload, UploadProps, Input, Modal } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { Obj } from "../../../../../../global/interface";
import "./style.scss";
import { useFormik } from "formik";

interface ModalEditLessonProps {
  children?: React.ReactElement;
  visibleModalEdit?: boolean;
  setVisibleModalEdit(visible: boolean): void;
  dataLesson: Obj;
}
export const ModalEditLesson = (props: ModalEditLessonProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      _id: props.dataLesson._id,
      title: props.dataLesson.title,
      type: props.dataLesson.type,
      link: props.dataLesson.link,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(values);
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("files[]", file as RcFile);
    });
    setUploading(true);
    // You can use any AJAX library you like
    fetch("https://www.mocky.io/v2/5cc8019d300000980a055e76", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };
  useEffect(() => {
    return () => {
      setUploading(false);
    };
  }, [props.visibleModalEdit]);
  const handleUpdate = () => {};
  const propsUpload: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);

      return false;
    },
    fileList,
  };
  return (
    <div className="modal-edit-lesson">
      <Modal
        open={props.visibleModalEdit}
        onOk={() => {
          handleUpdate();
        }}
        onCancel={() => {
          props.setVisibleModalEdit(false);
        }}
        okText="Cập nhật"
        title="Cập nhật"
        className="modal-edit-unit"
      >
        <form onSubmit={handleSubmit}>
          <label htmlFor="title-lesson">
            <b>Tiêu đề</b>
          </label>
          <Input
            value={values.title}
            id="title-lesson"
            name="title"
            onChange={handleChange}
          />
          <label htmlFor="upload-new-file">Cập nhật file</label>
          <br />
          <Upload {...propsUpload} id="upload-new-file">
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
            style={{ marginTop: 16 }}
          >
            {uploading ? "Uploading" : "Start Upload"}
          </Button>
        </form>
      </Modal>
    </div>
  );
};
