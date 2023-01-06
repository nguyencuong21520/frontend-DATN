import React, { useEffect, useRef, useState } from 'react';
import { Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Obj } from '../../global/interface';
import { State } from '../../redux-saga/reducer/reducer';
import { UserAction } from '../../redux-saga/user/action';
import { USER_FETCH_INFO_REQUEST } from '../../redux-saga/user/reducer';
import { set } from 'date-fns';

export const AuthProtect = (props: any) => {
    const dispatch = useDispatch();
    const [spin, setSpin] = useState<boolean>(true);
    const query = useRef<boolean>(true);
    const currentUser = useSelector((state: State) => state.User);
    const navigate = useNavigate();
    const vlRole = useSelector((state: State) => state.RoleViewAppVLReducer);
    useEffect(() => {
        if ((vlRole?.response as Obj)?.payload.dataRole) {
            setSpin(false)
        }
        else if (query.current) {
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
        if ((vlRole?.response as Obj)?.payload.dataRole) {
            setSpin(false)

        }
        else if (currentUser) {
            if (!currentUser.pending) {
                if ((currentUser?.response as Obj)?.success) {
                    setSpin(false);
                    query.current = false;
                } else {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem(`enrollRequest${currentUser._id}`);
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
