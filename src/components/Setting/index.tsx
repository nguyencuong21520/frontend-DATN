import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as validateYup from "yup";
import { Input, Spin } from "antd";
import { Upload } from "antd";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import ImgCrop from "antd-img-crop";
import { Obj } from "../../global/interface";
import { Toaster } from "../../utils/ToastMess";
import { useGetUser } from "../../utils/Hook";
import { UserAction } from "../../redux-saga/user/action";
import { USER_UPDATE_INFO_REQUEST } from "../../redux-saga/user/reducer";
import { State } from "../../redux-saga/reducer/reducer";
import "./style.scss";
import { TYPE_FILE } from "../../global/enum";
import { uploadFile } from "../../firebase";

// eslint-disable-next-line no-useless-escape
const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

// const schemasValidate =
export const Setting = () => {
  const currentUser = useGetUser();
  const updateInfoUser = useSelector((state: State) => state.UserUpdateInfoReducer);
  const query = useRef<boolean>(false);
  const [spin, setSpin] = useState<boolean>(false);
  const [fileList, setFileList] = useState<any[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: currentUser.img,
    },
  ]);
  const dispatch = useDispatch();
  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const [errUpload, setErrUpload] = useState<string | null>(null);
  const [progess, setProgress] = useState(0);
  const setSourceFile = (url: string) => {
    setFileList([{ ...fileList, url: url }])
  }
  console.log(fileList)
  const propsFile: UploadProps = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    customRequest(e) {
      uploadFile(TYPE_FILE.IMG, e.file, setProgress, setSourceFile, setErrUpload);
    },
  }
  useEffect(() => {
    if (query.current) {
      if (updateInfoUser) {
        if (!updateInfoUser.pending) {
          if ((updateInfoUser?.response as Obj)?.success) {
            Toaster.Success('Cập nhật thành công!');
            setSpin(false);
          } else {
            Toaster.Error('Cập nhật thất bại!');
            setSpin(false);
          }
          query.current = false;
        }
      }
    }
  }, [updateInfoUser])
  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const {
    handleSubmit,
    handleChange,
    handleReset,
    handleBlur,
    errors,
    touched,
    values,
  } = useFormik({
    initialValues: {
      _id: currentUser?._id || '',
      username: currentUser?.username as string || '',
      email: currentUser?.email as string || '',
      phone: currentUser?.phone as string || '',
      img: currentUser?.img as string || '',
      changePassword: "",
      confirmPassword: "",
    },
    validationSchema: validateYup.object().shape({
      username: validateYup.string().required("Tên không được trống"),
      phone: validateYup
        .string()
        .required("Số điện thoại không được trống")
        .matches(phoneRegExp, "Số điện thoại không đúng định dạng"),
      email: validateYup
        .string()
        .email("Email chưa đúng định dạng")
        .required("Email không được trống"),
    }),
    onSubmit: (values) => {
      dispatch(UserAction({
        type: USER_UPDATE_INFO_REQUEST,
        payload: {
          body: {
            ...values,
            img: fileList[0].url
          },
          params: {
            _id: values._id
          }
        }
      }))
      setSpin(true);
      query.current = true;
    },
  });
  return (
    <div className="container-setting">
      <h1>Cài đặt</h1>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <strong>Hình ảnh</strong>
            <ImgCrop rotate>
              <Upload
                listType="picture-card"
                // fileList={fileList}
                maxCount={1}
                {...propsFile}
              // onChange={onChange}
              // onPreview={onPreview}
              >
                {fileList.length < 5 && "+ Upload"}
              </Upload>
            </ImgCrop>
          </div>
          <div className="row">
            <label htmlFor="username" className="label">
              Tên người dùng
            </label>
            <Input
              id="username"
              name="username"
              className="input"
              placeholder="Tên của bạn"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
              <p className="error-text">{errors.username}</p>
            )}
          </div>
          <div className="row">
            <label htmlFor="email" className="label">
              Email
            </label>
            <Input
              id="email"
              name="email"
              placeholder="Email của bạn"
              className="input"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && touched.email && (
              <p className="error-text">{errors.email}</p>
            )}
          </div>
          <div className="row">
            <label htmlFor="phone" className="label">
              Số điện thoại
            </label>
            <Input
              id="phone"
              name="phone"
              placeholder="Số điện thoại"
              className="input"
              value={values.phone}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            {errors.phone && touched.phone && (
              <p className="error-text">{errors.phone}</p>
            )}
          </div>
          <div className="row flex-row">
            <strong>Thay đổi mật khẩu</strong>
            <div className="input-password">
              <Input
                name="changePassword"
                className="input"
                value={values.changePassword}
                placeholder="Mật khẩu mới"
                onChange={handleChange}
              />
              <Input
                name="confirmPassword"
                className="input"
                placeholder="Xác nhận mật khẩu"
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row flex-row-footer">
            <button onClick={handleReset}>Đặt lại</button>
            {!spin ? <button type="submit">Cập nhật</button> : (<div style={{ textAlign: 'center' }}><Spin /></div>)}
          </div>
        </form>
      </div>
    </div>
  );
};
