import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { User } from '../../redux-saga/reducer/selectors';

export const AuthProtect = (props: any) => {
    const currentUser = useSelector(User);
    if (!currentUser) {
        return <Navigate to={'/account/login'} />
    }
    return (
        <>{props.children}</>
    )
}
