import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs } from 'antd';
import { OverView } from './OverView';
import { UnitCourse } from './UnitCourse';
import QueueClassCourse from './Queue';
import './style.scss';

interface MangerDetailCourseProps {
    children?: React.ReactElement;
}

export const MangerDetailCourse = (props: MangerDetailCourseProps) => {
    const { id } = useParams();
    const tabs = [
        { label: 'Tổng quan', key: '1', children: <OverView /> },
        { label: 'Thông tin khóa', key: 'item-2', children:<UnitCourse/> },
        { label: 'Yêu cầu vào lớp', key: 'item-3', children: <QueueClassCourse /> },
    ];
    return (
        <div className="container-detail-course">
            <Tabs items={tabs} defaultActiveKey={'1'} />
        </div>
    )
}
