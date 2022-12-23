import React from 'react';
import { Progress } from 'antd';
import { DropdownCourse } from './DropDownCourse';
import { Obj } from '../../../../../global/interface';
import { ActiveLesson } from '../..';
import './style.scss';
interface Props {
    child?: React.ReactElement;
    unit: Obj;
    setCurrentLesson: (data: ActiveLesson) => void;
}
export const Content = (props: Props) => {
    return (
        <div className="container-range-time-course">
            <div className="current-time-range">
                <div className="left">
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
                <DropdownCourse dataUnit={props.unit.unit as Obj[]} handleActiveLesson={props.setCurrentLesson} />
            </div>
        </div>
    )
}
