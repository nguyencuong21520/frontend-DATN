import React, { useState } from 'react';
import { Modal, Popconfirm } from 'antd';
import TableStudents from './TableStudents';
import { useSelector } from 'react-redux';
import { Obj } from '../../../../global/interface';
import { IMG_COURSE } from '../../../../global/enum';
import { getData } from '../../../../utils/Hook';
import { State } from '../../../../redux-saga/reducer/reducer';
import { DropIcon } from '../../../../assets/img';
import './style.scss';
import { useDispatch } from 'react-redux';
interface OverViewProps {
    children?: React.ReactElement;
    idCourse?: string;
}
export const OverView = (props: OverViewProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const crrCourse = useSelector((state: State) => state.OneCourceDetailReducer);
    const crrUser = getData(useSelector((state: State) => state.User));
    const [spin, setSpin] = useState(false);
    const dispatch = useDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dataCourse = getData(crrCourse) || [];
    const listStudent = (((dataCourse[0] as Obj)?.student as Obj)?.listStudent as Obj[])?.filter(item => item.user._id !== crrUser._id) || [];
    const handleModal = (visible: boolean) => {
        setVisibleModal(visible)
    }
    const handleDropCourse = () => {

    }
    return (
        <div className="container-overview">
            <div className="part-info">
                <div className="left">
                    <img src={(dataCourse[0] as Obj)?.major.includes('Word') ? IMG_COURSE.WORD : ((dataCourse[0] as Obj)?.major.includes('Excel') ? IMG_COURSE.EXCEL : IMG_COURSE.PP)} alt="Course" />
                </div>
                <div className="right">
                    <h2>Khóa học: {(dataCourse[0] as Obj)?.nameCourse}
                        <Popconfirm title="Bạn muốn xoá khoá học này?" okText="Đồng ý" cancelText="Hủy">
                            <div className="drop-course">
                                <img src={DropIcon} alt="drop" />
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
