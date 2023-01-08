import React, { useEffect, useRef, useState } from 'react';
import { Modal, Popconfirm, Spin } from 'antd';
import TableStudents from './TableStudents';
import { useSelector } from 'react-redux';
import { Obj } from '../../../../global/interface';
import { IMG_COURSE } from '../../../../global/enum';
import { getData } from '../../../../utils/Hook';
import { State } from '../../../../redux-saga/reducer/reducer';
import { DropIcon } from '../../../../assets/img';
import './style.scss';
import { useDispatch } from 'react-redux';
import { CourcesAction } from '../../../../redux-saga/course/action';
import { DROP_COUSE_REQUEST } from '../../../../redux-saga/course/reducer';
import { useParams } from 'react-router-dom';
import { Toaster } from '../../../../utils/ToastMess';
interface OverViewProps {
    children?: React.ReactElement;
    idCourse?: string;
}
export const OverView = (props: OverViewProps) => {
    const { id } = useParams();
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const crrCourse = useSelector((state: State) => state.OneCourceDetailReducer);
    const crrUser = getData(useSelector((state: State) => state.User));
    const dropCourse = useSelector((state: State) => state.DropCourseReducer);
    const dropQuery = useRef(false);
    const [spin, setSpin] = useState(false);
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dataCourse = getData(crrCourse) || [];
    const listStudent = (((dataCourse[0] as Obj)?.student as Obj)?.listStudent as Obj[])?.filter(item => item.user._id !== crrUser._id) || [];
    const handleModal = (visible: boolean) => {
        setVisibleModal(visible)
    }
    useEffect(() => {
        if (dropCourse) {
            if (!dropCourse.pending) {
                if ((dropCourse.response as Obj)?.success) {
                    Toaster.Success('Xoá khoá học thành công!')
                } else {
                    Toaster.Error('Xoá khoá học thất bại!')
                }
                setSpin(false);
            }
        }
    }, [dropCourse])
    const handleDropCourse = () => {
        dispatch(CourcesAction({
            type: DROP_COUSE_REQUEST,
            payload: {
                params: {
                    _idCourse: id
                }
            }
        }))
    }
    return (
        <div className="container-overview">
            <div className="part-info">
                <div className="left">
                    <img src={(dataCourse[0] as Obj)?.major.includes('Word') ? IMG_COURSE.WORD : ((dataCourse[0] as Obj)?.major.includes('Excel') ? IMG_COURSE.EXCEL : IMG_COURSE.PP)} alt="Course" />
                </div>
                <div className="right">
                    <h2>Khóa học: {(dataCourse[0] as Obj)?.nameCourse}
                        <Popconfirm title="Bạn muốn xoá khoá học này?" okText="Đồng ý" cancelText="Hủy" onConfirm={() => {
                            handleDropCourse();
                            setSpin(true);
                            dropQuery.current = true;
                        }}>
                            <div className="drop-course">
                                {spin ? <Spin /> :
                                    <img src={DropIcon} alt="drop" />}
                            </div>
                        </Popconfirm>
                    </h2>
                    <p>Tổng quan: {(dataCourse[0] as Obj)?.summaryCourse || 'Chưa có dữ liệu'}</p>
                </div>
            </div>
            <div className="list-student">
                <p className="text">
                    <strong>Danh sách học sinh</strong>
                    <u onClick={() => {
                        handleModal(true);
                    }}>Mở rộng</u>
                </p>
                <Modal
                    open={visibleModal}
                    onOk={() => {
                        handleModal(false)
                    }} onCancel={() => {
                        handleModal(false)
                    }}
                    title="Thông tin học sinh"
                    className="detail-students-table-teacher"
                ><TableStudents onDetail listStudent={listStudent} idCourse={props.idCourse} /></Modal>
                <TableStudents listStudent={listStudent} />
            </div>
        </div>
    )
}
