import React from 'react';
import { Progress } from 'antd';
import { DropdownCourse } from './DropDownCourse';
import './style.scss';

const mockupData = [
    {
        key: 'LV1',
        title: 'Khoá 1 - Giới thiệu về excel',
        units: [
            'U1: Presentation',
            'U2: Job opportunities (career profile)',
            'U3: How to get the most out of this course!'
        ]
    },
    {
        key: 'LV2',
        title: 'Khoá 2 - Làm việc chuyên sâu',
        units: [
            'U4: Hiểu về biểu thức',
            'U5: Cấu trúc điều kiện',
            'U6: Thực hành biểu thức, cấu trúc điều kiện'
        ]
    },

]
export const Content = () => {
    return (
        <div className="container-range-time-course">
            <div className="current-time-range">
                <div className="left">
                    <span className="couting-course">
                        Course 1 of 6
                    </span>
                    <h3>Course 1 - Introduction</h3>
                    <Progress percent={30} className="progress-bar-time" showInfo={false} />
                    <label htmlFor="progress-bar-time">
                        2 completed units of 11 available
                    </label>
                </div>
                <div className="right">
                    <button>Go to Unit 3</button>
                </div>
            </div>
            <div className="unit-course">
                <DropdownCourse dataCourse={mockupData}/>
            </div>
        </div>
    )
}
