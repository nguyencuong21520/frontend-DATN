import React, { useState } from "react";
import { useFormik } from "formik";
import * as validateYup from "yup";
import { Input } from "antd";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import "./style.scss";

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

// const schemasValidate =
export const Setting = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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
      _id: "khoa trần",
      username: "Trần Đăng Khoa",
      email: "khoa@gmail.com",
      phone: "0991232",
      linkImg: "https:đẹp trai",
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
      console.log(values);
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
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                onChange={onChange}
                onPreview={onPreview}
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
            <button type="submit">Cập nhật</button>
          </div>
        </form>
      </div>
    </div>
  );
};
