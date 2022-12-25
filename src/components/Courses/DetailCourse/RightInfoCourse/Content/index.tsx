import React, { useEffect, useState } from 'react';
import { Obj } from '../../../../../global/interface';
import { ReactComponent as IconTick } from '../../../../../assets/svg/IconTick.svg';
import { Spin } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../../../../redux-saga/reducer/reducer';
import { GET_ONE_DETAIL_ONE_COURSE } from '../../../reducer';
import { getData } from '../../../../../utils/Hook';
import { CourcesAction } from '../../../action';
import './style.scss';
import { MASK_DONE_COURSE_CLEAR, MASK_DONE_COURSE_QUERY } from '../../../../../redux-saga/user/reducer';
interface ContentInfoSourceProps {
    children?: React.ReactElement;
    crrCourse: Obj;
    statusEnroll: boolean;
}
export const ContentInfoSource = (props: ContentInfoSourceProps) => {
    const dispatch = useDispatch();
    const dataDetailCourse = useSelector((state: State) => state.OneCourceDetailReducer);
    const crrDetail = getData(dataDetailCourse);
    const [spin, setSpin] = useState<boolean>(true);
    const [crrMask, setCrrMask] = useState<Array<string>>([]);

    const handleMaskDone = (_idLesson: string) => {
        setCrrMask((prev) => {
            prev.push(_idLesson)
            return [...prev]
        });
        dispatch(CourcesAction({
            type: MASK_DONE_COURSE_QUERY,
            payload: {
                body: {
                    lessonId: _idLesson
                }
            }
        }))
    }
    console.log(dataDetailCourse)
    useEffect(() => {
        if (!dataDetailCourse) {
            dispatch(CourcesAction({
                type: GET_ONE_DETAIL_ONE_COURSE,
                payload: {
                    body: {
                        _idCourse: props.crrCourse._id
                    }
                }
            }))
        }
        if (crrDetail) {
            if (!crrDetail.pending) {
                setSpin(false)
            }
        }
        return () => {
            dispatch(CourcesAction({
                type: MASK_DONE_COURSE_CLEAR
            }))
        }
    }, [dataDetailCourse])
    return (
        <div className="container-content-info-course">
            <h3>Tổng quan</h3>
            {!crrDetail ? <Spin /> : !crrDetail.pending && (crrDetail.response as Obj)?.success ? <div>Chưa có dữ liệu</div> : ((crrDetail[0] as Obj)?.unit as Obj[])?.map((item: Obj) => {
                return (
                    <div className="level-course" key={item._id as string}>
                        <span className="title">{item.unitName as string}</span>
                        <ul className="list-units">
                            {item.lesson.map((unitItem: Obj, idx: number) => {
                                return (
                                    <li key={item._id + unitItem._id}>
                                        <span className="title-unit">U{idx + 1}</span>
                                        <span className="name-unit">{unitItem.lessonName.trim()}</span>
                                        {(props.statusEnroll === true && (spin ? <Spin /> :
                                            <IconTick className={`status ${(unitItem.done === true && 'done') || (crrMask.includes(unitItem._id) && 'done')}`} onClick={() => {
                                                if (!unitItem.done) {
                                                    handleMaskDone(unitItem._id);
                                                }
                                            }} />))
                                        }
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
