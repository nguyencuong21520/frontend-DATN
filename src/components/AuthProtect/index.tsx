import React, { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Obj } from '../../global/interface';
import { State } from '../../redux-saga/reducer/reducer';
import { UserAction } from '../../redux-saga/user/action';
import { USER_FETCH_INFO_REQUEST } from '../../redux-saga/user/reducer';

export const AuthProtect = (props: any) => {
    const dispatch = useDispatch();
    const [spin, setSpin] = useState<boolean>(true);
    const query = useRef<boolean>(true);
    const currentUser = useSelector((state: State) => state.User);
    const navigate = useNavigate();
    useEffect(() => {
        if (query.current) {
            if (!currentUser && localStorage.getItem('access_token')) {
                dispatch(UserAction({
                    type: USER_FETCH_INFO_REQUEST
                }))
                query.current = false
            } else if (!localStorage.getItem('access_token')) {
                navigate('/account/login', { replace: true });
            }
        }
    }, [])
    useEffect(() => {
        if (currentUser) {
            if (!currentUser.pending) {
                if ((currentUser?.response as Obj)?.success) {
                    setSpin(false);
                    query.current = false;
                    console.log((currentUser?.response as Obj));
                } else {
                    localStorage.removeItem('access_token');
                    setSpin(false);
                    navigate('/account/login', { replace: true });
                }
            }
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
        <>{props.children}</>
    )
}
