import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { validatorEmail } from '../../utils/validator/email';
import { Toaster } from '../../utils/ToastMess';
import { State } from '../../redux-saga/reducer/reducer';
import { UserAction } from '../../redux-saga/user/action';
import { USER_SIGN_UP_REQUEST } from '../../redux-saga/user/reducer';
import { ReactComponent as Sms } from '../../assets/svg/Sms.svg';
import './style.scss';
import { Obj } from '../../global/interface';

interface RegisterType {
    username: string;
    email: string;
    password: string;
    confirmpassword: string;
    accept: boolean;
    owner: boolean;
}
export const Register = () => {
    const [spin, setSpin] = useState<boolean>(false);
    const dataSignUp = useSelector((state: State) => state.UserSignUp);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Đăng ký';
        if (dataSignUp) {
            if (!dataSignUp.pending) {
                if ((dataSignUp?.response as Obj)?.success) {
                    Toaster.Success('Đăng ký thành công!');
                    setSpin(false);
                    setTimeout(() => {
                        navigate('/account/login', { replace: true })
                    }, 1500)
                } else {
                    setSpin(false);
                    Toaster.Error((dataSignUp?.response as Obj)?.response.message);
                }
            }
        }
    }, [dataSignUp, navigate])
    const onFinish = (user: RegisterType) => {
        try {
            if (!validatorEmail(user.email)) throw new Error('Bạn cần nhập đúng định dạn email!');
            if (!user.accept) throw new Error('Bạn cần đồng ý nhận email cập nhật!');
            if (!user.owner) throw new Error('Bạn cần đồng ý điều khoản!');
            if (!validatorEmail(user.email)) throw new Error('Bạn cần nhập đúng định dạn email!');
            if (user.password.length < 6 || user.confirmpassword.length < 6) throw new Error('Mật khẩu cần lớn hơn 6 ký tự!');
            if (user.password !== user.confirmpassword) throw new Error('Mật khẩu không trùng!');
            setSpin(true);
            dispatch(UserAction({
                type: USER_SIGN_UP_REQUEST,
                payload: {
                    body: user
                }
            }))
        } catch (err: string | any) {
            setTimeout(() => {
                Toaster.Error(err.message.toString())
                setSpin(false)
            }, 1000)
        }
    }
    return (
        <div className="container-register">
            <h1 style={{ color: '#0E1435', textAlign: 'center' }}>Đăng ký</h1>
            <h3 className="color-blur" style={{ textAlign: 'center', marginBottom: 30 }}>Quản lý tất cả lớp học của bạn</h3>
            <div className="form-register">
                <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    className="my-form"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Username không được trống' }]}
                    >
                        <Input type='text' placeholder='Usre name' className="color-blur inpt" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Email không được trống' }]}
                    >
                        <Input type='email' placeholder='Email' className="color-blur inpt" suffix={<Sms />} />
                    </Form.Item>

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
                    <div className="footer-fnc">
                        <Form.Item name="accept" valuePropName="checked" wrapperCol={{ offset: 8, span: 0 }}>
                            <Checkbox style={{ color: '#C8C9DA' }} >Đồng ý, nhận email cập nhật</Checkbox>
                        </Form.Item>
                        <Form.Item name="owner" valuePropName="checked" wrapperCol={{ offset: 8, span: 0 }}>
                            <Checkbox style={{ color: '#C8C9DA' }}>Tôi đồng ý với <span style={{ color: '#616496' }}>Điều khoản, quyền riêng tư</span></Checkbox>
                        </Form.Item>
                    </div>
                    {spin === false ? (<Button type="primary" htmlType="submit" className="btn-login" >
                        Tạo tài khoản
                    </Button>) : <div className="spin" style={{ textAlign: 'center' }}><Spin /></div>}
                </Form>
            </div>
            <div className="login">
                <span className="color-blur">Bạn chưa có tài khoản? </span>
                <Link to={'/account/login'} style={{ color: '#616496' }}>Đăng nhập</Link>
            </div>
        </div>
    )
}
