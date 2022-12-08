import React from 'react';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import IconPlay from '../../../../../../assets/img/IconPlay.png';
import './style.scss';

interface DropdownCourseDataProps {
    dataCourse?: Array<{
        key: string;
        title: string;
        units: Array<string>;
    }>
}
const text = `U1: Presentation`;
export const DropdownCourse = (props: DropdownCourseDataProps) => {
    return (
        <div className="container-dropdown-course">
            <Collapse
                bordered={false}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                expandIconPosition='end'
                className="site-collapse-custom-collapse"
            >
                {props.dataCourse?.map((item) => {
                    return (
                        <Collapse.Panel header={<h3 className="title">{item.title}</h3>} key={item.key} className="site-collapse-custom-panel">
                            {item.units.map((unit) => {
                                return (
                                    <p className="summary-unit"><img src={IconPlay} alt="play" key={item.key + item.title} />{unit}</p>
                                )
                            })}
                        </Collapse.Panel>
                    )
                })}
            </Collapse>
        </div>
    )
}
