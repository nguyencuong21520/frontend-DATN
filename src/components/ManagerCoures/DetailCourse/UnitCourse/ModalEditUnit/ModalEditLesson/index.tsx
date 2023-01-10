import React, { useEffect, useRef, useState } from "react";
import { Button, message, Upload, UploadProps, Input, Modal, Progress, Spin } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import { UploadOutlined } from "@ant-design/icons";
import { Obj } from "../../../../../../global/interface";
import "./style.scss";
import { useFormik } from "formik";
import { uploadFile } from "../../../../../../firebase";
import { TYPE_FILE } from "../../../../../../global/enum";

interface ModalEditLessonProps {
  children?: React.ReactElement;
  visibleModalEdit?: boolean;
  setVisibleModalEdit(visible: boolean): void;
  dataLesson: Obj;
}
export const ModalEditLesson = (props: ModalEditLessonProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileUpload = useRef();
  console.log(props.dataLesson)
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      _id: props.dataLesson._id,
      lessonName: props.dataLesson.lessonName,
      source: props.dataLesson.source,
      link: props.dataLesson.link,
      type: props.dataLesson.type
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  console.log(values);
  const [progess, setProgress] = useState(0);
  const [sourceFile, setSourceFile] = useState<string>('');
  const [errUpload, setErrUpload] = useState<string | null>(null);
  useEffect(() => {
    return () => {
      setUploading(false);
    };
  }, [props.visibleModalEdit]);
  const [spin, setSpin] = useState<boolean>(false);
  useEffect(() => {
    if (values.type === 'VIDEO') {
      if (progess === 100) {
        (document.querySelector('.container-add-lesson .ant-upload-text-icon') as HTMLElement)!.style.display = 'none';
        message.success(`Tải lên thành công!`);
      }
    }
  }, [progess])
  const propsFile: UploadProps = {
    name: 'file',
    ...(values.type === 'SCORM' && {
      action: 'http://ec2-54-199-158-253.ap-northeast-1.compute.amazonaws.com:3002/upload'
    }),
    headers: {
      authorization: 'authorization-text',
    },
    ...(values.type === 'SCORM' && {
      beforeUpload(file: Obj, FileList) {
        if (file.type !== 'application/zip') {
          message.error('File SCORM phải là định dạng zip!');
          FileList = []
          return false;
        }
      }
    }),
    onChange(info) {
      if (values.type === 'VIDEO') {
        if (info.fileList.length === 0) {
          setProgress(0);
        }
      } else {
        if (info.file.status && info.file.status !== 'removed') {
          if (info.file.status !== 'uploading') {
            setSourceFile((info.fileList[0].response.response as Obj)?.message.index)
          }
          if (info.file.status === 'done') {
            message.success(`Tải file thành công!`);
          } else if (info.file.status === 'error') {
            message.error(`Tải lên thất bại!`);
          }
        }
      }
    },
    ...(values.type === 'VIDEO' && {
      customRequest(e) {
        uploadFile(values.type as TYPE_FILE, e.file, setProgress, setSourceFile, setErrUpload);
      },
    })
  };
  return (
    <div className="modal-edit-lesson">
      <Modal
        open={props.visibleModalEdit}
        onOk={() => {
          props.setVisibleModalEdit(false);
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
            value={values.lessonName}
            id="title-lesson"
            name="lessonName"
            onChange={handleChange}
          />
          <label htmlFor="upload-new-file">Cập nhật file</label>
          <br />
          <Upload {...propsFile} id="file" name='file' maxCount={1} ref={fileUpload} >
            <Button icon={<UploadOutlined />}>Kích để upload</Button>
          </Upload>
          {values.type === 'VIDEO' && <Progress percent={Math.ceil(progess)} status={!errUpload ? 'normal' : 'exception'} />}
          <p className="error">{sourceFile === '' ? 'Hiện chưa có file bài học' : ''}</p>
          {spin ? <Spin /> : <Button className="btn_done" htmlType='submit'>Hoàn tất</Button>}
        </form>
      </Modal>
    </div>
  );
};
