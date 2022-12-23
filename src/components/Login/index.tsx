import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Checkbox, Form, Input, Spin } from 'antd';
import { Obj } from '../../global/interface';
import { Toaster } from '../../utils/ToastMess';
import { State } from '../../redux-saga/reducer/reducer';
import { ReactComponent as Sms } from '../../assets/svg/Sms.svg';
import { UserAction } from '../../redux-saga/user/action';
import { USER_REQUEST_LOGIN_API } from '../../redux-saga/user/reducer';
import './style.scss';
interface LoginType {
    email: string;
    password: string;
}
export const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useRef<boolean>(false);
    const userSignIn = useSelector((state: State) => state.User);
    const [spin, setSpin] = useState<boolean>(false);
    useEffect(() => {
        document.title = 'Đăng nhập';
        if (spin) {
            if (userSignIn) {
                if (!userSignIn.pending) {
                    if ((userSignIn?.response as Obj)?.success) {
                        Toaster.Success('Đăng nhập thành công!');
                        setSpin(false);
                        localStorage.removeItem('access_token');
                        localStorage.setItem('access_token', `Bearer ${(userSignIn.response as Obj)?.response?.token}`)
                        setTimeout(() => {
                            navigate('/', { replace: true });
                        }, 2000)
                    } else {
                        setSpin(false);
                        Toaster.Error('Đăng nhập thất bại!');
                    }
                    query.current = false
                }
            }
        }
    }, [userSignIn, navigate, spin])
    const onFinish = (e: LoginType) => {
        setSpin(true);
        dispatch(UserAction({
            type: USER_REQUEST_LOGIN_API,
            payload: {
                body: e
            }
        }))
        query.current = true;
    }
    return (
        <div className="container-login">
            <h1 style={{ color: '#0E1435', textAlign: 'center' }}>Chào mừng trở lại</h1>
            <h3 className="color-blur" style={{ textAlign: 'center', marginBottom: 30 }}>Chào mừng trở lại TLU Classroom</h3>
            <div className="form-login">
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

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Mật khẩu không được trống' }]}
                    >
                        <Input.Password placeholder='Mật khẩu' className="color-blur inpt" />
                    </Form.Item>
                    <div className="footer-fnc">
                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 0 }}>
                            <Checkbox style={{ color: '#C8C9DA' }}>Ghi nhớ</Checkbox>
                        </Form.Item>
                        <Link to={'/account/forgot-password'} style={{ color: '#616496' }}>Lấy lại mật khẩu</Link>
                    </div>
                    {!spin ? (<Button type="primary" htmlType="submit" className="btn-login" >
                        Đăng nhập
                    </Button>) : (<div style={{ textAlign: 'center' }}><Spin /></div>)}

                </Form>
            </div>
            <div className="register">
                <span className="color-blur">Bạn chưa có tài khoản? </span>
                <Link to={'/account/register'} style={{ color: '#616496' }} replace>Đăng ký</Link>
            </div>
        </div>
    )
}
