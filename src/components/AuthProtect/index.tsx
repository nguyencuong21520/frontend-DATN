import { Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Obj } from '../../global/interface';
import { State } from '../../redux-saga/reducer/reducer';
import { UserAction } from '../../redux-saga/user/action';
import { USER_FETCH_INFO_REQUEST } from '../../redux-saga/user/reducer';

export const AuthProtect = (props: any) => {
    const dispatch = useDispatch();
    const [spin, setSpin] = useState<boolean>(true);
    const query = useRef<boolean>(false);
    const currentUser = useSelector((state: State) => state.User)
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
    if (!(currentUser?.response as Obj)?.success) {
        return <Navigate to={'/account/login'} />
    }
    return (
        <>{props.children}</>
    )
}
