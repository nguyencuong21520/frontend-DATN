import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input, Spin } from 'antd';
import { ReactComponent as Sms } from '../../assets/svg/Sms.svg';
import { ReactComponent as MobilePhone } from '../../assets/svg/MobilePhone.svg';
import './style.scss';

export const ForgotPassword = () => {
    const [spin, setSpin] = useState<boolean>(false);
    const onFinish = (e: any) => {
        console.log(e);
        setSpin(true);
        setTimeout(() => {
            setSpin(false)
        }, 1000)
    }
    useEffect(() => {
        document.title = 'Quên mật khẩu'
    }, [])
    useLayoutEffect(() => {
        const logo = document.querySelector('svg.logo')
        logo?.setAttribute('style', 'display:none;')
        return () => {
            logo?.setAttribute('style', 'display:block;')
        }
    }, [])

    return (
        <div className="container-forgotpass" id="forgot-pass">
            <div className="top-banner">
                <div className="mobile">
                    <MobilePhone />
                </div>
                <h3>Nhập E-mail được liên kết với tài khoản của bạn và chúng tôi sẽ gửi E-mail kèm theo hướng dẫn để đặt lại mật khẩu của bạn</h3>
            </div>
            <div className="form-forgotpass">
                <Form
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                    className="my-form"
                >
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Email không được trống' }]}
                    >
                        <Input type='email' placeholder='Email' className="color-blur inpt" suffix={<Sms />} />
                    </Form.Item>
                    {!spin ? (<Button type="primary" htmlType="submit" className="btn-login" >
                        Khôi phục mật khẩu
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
