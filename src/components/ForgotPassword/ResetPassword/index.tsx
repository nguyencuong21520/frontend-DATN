import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Spin } from 'antd';
import { Toaster } from '../../../utils/ToastMess';
import { ReactComponent as MobilePhone } from '../../../assets/svg/MobilePhone.svg';
import './style.scss';

export const ResetPassword = () => {
  useEffect(() => {
    document.title = 'Đổi mật khẩu'
}, [])
  const [spin, setSpin] = useState<boolean>(false);
  const onFinish = (e: any) => {
    setSpin(true);
    try {
      if (e.password.length < 6 || e.confirmpassword.length < 6) throw new Error('Mật khẩu cần lớn hơn 6 ký tự!')
      if (e.password !== e.confirmpassword) throw new Error('Mật khẩu không trùng!')
      //TODO: Call APIs
      setTimeout(() => {
        Toaster.Success('Đặt lại mật khẩu thành công!')
        setSpin(false)
      }, 1000)
    } catch (err: string | any) {
      setTimeout(() => {
        Toaster.Error(err.message.toString())
        setSpin(false)
      }, 1000)
    }
  }
  useLayoutEffect(() => {
    const logo = document.querySelector('svg.logo')
    logo?.setAttribute('style', 'display:none;')
    return () => {
      logo?.setAttribute('style', 'display:block;')
    }
  }, [])

  return (
    <div className="container-resetpass" id="forgot-pass">
      <div className="top-banner">
        <div className="mobile">
          <MobilePhone />
        </div>
        <h3 style={{ textAlign: 'center' }}>Đặt mật khẩu mới</h3>
      </div>
      <div className="form-resetpass">
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="my-form"
        >
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Mật khẩu không được trống' }]}
          >
            <Input.Password placeholder='Mật khẩu' className="color-blur inpt" />
          </Form.Item>
          <Form.Item
            name="confirmpassword"
            rules={[{ required: true, message: 'Bạn cần xác nhận nhận khẩu' }]}
          >
            <Input.Password placeholder='Xác nhận mật khẩu' className="color-blur inpt" />
          </Form.Item>
          {!spin ? (<Button type="primary" htmlType="submit" className="btn-login" >
            Đặt lại mật khẩu
          </Button>) : (<div style={{ textAlign: 'center' }}><Spin /></div>)}
          <div className="login">
            <span className="color-blur">Quay về trang </span>
            <Link to={'/account/login'} style={{ color: '#616496' }} replace>Đăng nhập</Link>
          </div>
        </Form>

      </div>

    </div>
  )
}
