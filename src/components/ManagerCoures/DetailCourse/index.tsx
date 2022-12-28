import React, { useEffect, useState } from 'react';
import { Spin, Tabs } from 'antd';
import { OverView } from './OverView';
import { UnitCourse } from './UnitCourse';
import QueueClassCourse from './Queue';
import './style.scss';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { State } from '../../../redux-saga/reducer/reducer';
import { useDispatch } from 'react-redux';
import { CourcesAction } from '../../Courses/action';
import { GET_ONE_DETAIL_ONE_COURSE, GET_ONE_DETAIL_ONE_COURSE_CLEAR } from '../../Courses/reducer';
import { Obj } from '../../../global/interface';

interface MangerDetailCourseProps {
    children?: React.ReactElement;
}

export const MangerDetailCourse = (props: MangerDetailCourseProps) => {
    const { id } = useParams();
    const getDetailCourse = useSelector((state: State) => state.OneCourceDetailReducer);
    const [spin, setSpin] = useState<boolean>(true);
    const [noData, setNodata] = useState<boolean>(false);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!getDetailCourse) {
            dispatch(CourcesAction({
                type: GET_ONE_DETAIL_ONE_COURSE,
                payload: {
                    body: {
                        _idCourse: id
                    }
                }
            }))
        }
        if (getDetailCourse) {
            if (!getDetailCourse.pending) {
                if ((getDetailCourse.response as Obj)?.success) {
                    setNodata(false);
                } else {
                    setNodata(true);
                }
                setSpin(false);
            }
        }
        return () => {
            if ((getDetailCourse?.response as Obj)?.success) {
                dispatch(CourcesAction({
                    type: GET_ONE_DETAIL_ONE_COURSE_CLEAR
                }))
            }
        }
    }, [id, getDetailCourse, dispatch])
    const tabs = [
        { label: 'Tổng quan', key: '1', children: <OverView /> },
        { label: 'Thông tin khóa', key: 'item-2', children: <UnitCourse /> },
        { label: 'Yêu cầu vào lớp', key: 'item-3', children: <QueueClassCourse idCourse={id as string} /> },
    ];
    return (
        <div className="container-detail-course">
            {spin ? <Spin /> : (noData ? <div>Không có dữ liệu</div> : <Tabs items={tabs} defaultActiveKey={'1'} />)}
        </div>
    )
}
