import React from 'react';
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
            </div>
            <div className="unit-course">
                <DropdownCourse dataUnit={props.unit.unit as Obj[]} handleActiveLesson={props.setCurrentLesson} />
            </div>
        </div>
    )
}
