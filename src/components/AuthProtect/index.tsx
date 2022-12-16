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
    const query = useRef<boolean>(false);
    const currentUser = useSelector((state: State) => state.User);
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser && localStorage.getItem('access_token')) {
            dispatch(UserAction({
                type: USER_FETCH_INFO_REQUEST
            }))
        }
    }, [])
    useEffect(() => {
        if (currentUser) {
            if (!currentUser.pending) {
                if ((currentUser?.response as Obj)?.success) {
                    console.log(currentUser)
                    setSpin(false);
                }
                else {
                    localStorage.removeItem('access_token');
                    setSpin(false);
                    navigate('/account/login', { replace: true });
                }
                query.current = false
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
