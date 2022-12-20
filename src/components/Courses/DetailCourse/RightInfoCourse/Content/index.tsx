import React from 'react';
import { Obj } from '../../../../../global/interface';
import { ReactComponent as IconTick } from '../../../../../assets/svg/IconTick.svg';
import './style.scss';
interface ContentInfoSourceProps {
    children?: React.ReactElement;
    crrCourse: Obj;
}
export const ContentInfoSource = (props: ContentInfoSourceProps) => {
    const dataCourse = props.crrCourse;
    const dataUnit = dataCourse.previewUnit as Obj[];
    return (
        <div className="container-content-info-course">
            <h3>Tổng quan</h3>
            {dataUnit.length === 0 ? <div>Chưa có dữ liệu</div> : dataUnit.map((item) => {
                return (
                    <div className="level-course" key={item._id as string}>
                        <span className="title">{item.unitName as string}</span>
                        <ul className="list-units">
                            {item.lesson.map((unitItem: Obj, idx: number) => {
                                return (
                                    <li key={item._id + unitItem._id}>
                                        <span className="title-unit">U{idx + 1}</span>
                                        <span className="name-unit">{unitItem.lessonName.trim()}</span>
                                        <IconTick className={`status true`} />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}
