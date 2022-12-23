import React from 'react';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Obj } from '../../../../../../global/interface';
import IconPlay from '../../../../../../assets/img/IconPlay.png';
import ScormIcon from '../../../../../../assets/img/ScormIcon.png';
import { TYPE_FILE } from '../../../../../../global/enum';
import { ActiveLesson } from '../../..';
import './style.scss';

interface DropdownCourseDataProps {
    dataUnit: Obj[];
    handleActiveLesson(data: ActiveLesson): void;
}
export const DropdownCourse = (props: DropdownCourseDataProps) => {
    return (
        <div className="container-dropdown-course">
            <Collapse
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                expandIconPosition='end'
                className="site-collapse-custom-collapse"
            >
                {props.dataUnit?.map((item, idx) => {
                    return (
                        <Collapse.Panel header={<h3 className="title">Khoá {idx + 1} - {item.unitName}</h3>} key={item._id as string} className="site-collapse-custom-panel">
                            {item.lesson.map((unit: Obj, idx: number) => {
                                return (
                                    <p className="summary-unit"
                                        onClick={() => {
                                            props.handleActiveLesson({
                                                type: unit.type,
                                                src: unit.source
                                            })
                                        }}
                                        key={idx}
                                    ><img src={unit.type === TYPE_FILE.SCORM ? ScormIcon : IconPlay} alt="play" key={unit._id as string} />{unit.lessonName as string}</p>
                                )
                            })}
                        </Collapse.Panel>
                    )
                })}
            </Collapse>
        </div>
    )
}
