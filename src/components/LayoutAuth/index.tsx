import React from 'react';
import { Outlet } from 'react-router-dom';
import { Carousel } from 'antd';
import Slide from '../../assets/img/Slide.png';
import { ReactComponent as Sun } from '../../assets/svg/Sun.svg';
import { ReactComponent as Tluc } from '../../assets/svg/Tluc.svg';
import './style.scss';

export const LayoutAuth = () => {
    return (
        <div className="container-auth">
            <div className="left-slide">
                <Carousel autoplay className="slide">
                    <div className="img-carousel">
                        <img src={Slide} alt="Learning" />
                    </div>
                    <div className="img-carousel">
                        <img src={Slide} alt="Learning" />
                    </div>
                    <div className="img-carousel">
                        <img src={Slide} alt="Learning" />
                    </div>
                    <div className="img-carousel">
                        <img src={Slide} alt="Learning" />
                    </div>
                    <div className="img-carousel">
                        <img src={Slide} alt="Learning" />
                    </div>
                </Carousel>
            </div>
            <div className="container">
                <div className="top-icon">
                    <Sun className="sun" />
                    <Tluc className="logo" />
                </div>
                <Outlet />
            </div>
        </div>
    )
}
