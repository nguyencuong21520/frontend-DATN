import React from 'react';
import { Header } from '../header';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../side-bar';
import './style.scss';

export const Layout = () => {
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
