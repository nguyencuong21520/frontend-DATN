import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { Obj } from '../../global/interface';
import { SideBar } from '../side-bar';
import { UserAction } from '../Login/action';
import { State } from '../../redux-saga/reducer/reducer';
import { USER_FETCH_INFO_REQUEST } from '../../redux-saga/user/reducer';
import { Header } from '../header';
import './style.scss';

export const Layout = () => {
    const dispatch = useDispatch();
    const [spin, setSpin] = useState<boolean>(true);
    const query = useRef<boolean>(false);
    const currentUser = useSelector((state: State) => state.User)
    console.log(currentUser);
    useEffect(() => {
        if (currentUser) {
            if (!currentUser.pending) {
                if ((currentUser?.response as Obj)?.success) {
                    setSpin(false);

                } else {
                    setSpin(false);
                }
                query.current = false
            }
        } else {
            dispatch(UserAction({
                type: USER_FETCH_INFO_REQUEST
            }))
        }

    }, [dispatch, currentUser]);
    if (spin) {
        return (
            <div className="fetch-data-user">
                <Spin />
            </div>
        )
    }
    return (
        <div className="page">
            <div className="side-bar-container">
                <SideBar />
            </div>
            <div className="right-container">
                <div className="header">
                    <Header />
                </div>
                <div className="container">

                    <div className="main">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
