import React, { useEffect, useState } from 'react';
import { Button, Input, Spin } from 'antd';
import { useFormik } from "formik";
import * as validateYup from "yup";
import { Obj } from '../../../global/interface';
import { useSelector } from 'react-redux';
import { State } from '../../../redux-saga/reducer/reducer';
import { useDispatch } from 'react-redux';
import './style.scss';
import { UserAction } from '../../../redux-saga/user/action';
import { GET_ALL_USER_REQUEST } from '../../../redux-saga/user/reducer';
import { getData } from '../../../utils/Hook';
import { IMG_COURSE, USER, VideoThumbnail } from '../../../global/enum';
import { CourcesAction } from '../../../redux-saga/course/action';
import { CREATE_COURSE_REQUEST } from '../../../redux-saga/course/reducer';

const optionsMajor = [
    {
        label: 'Excel',
        value: 'Excel'
    },
    {
        label: 'Word',
        value: 'Word'
    },
    {
        label: 'Powerpoint',
        value: 'PP'
    },
    {
        label: 'Cơ bản',
        value: 'Window'
    },
]
const optionsLevel = [
    {
        label: 'Cơ bản',
        value: 'BASIC'
    },
    {
        label: 'Nâng cao',
        value: 'ADVANCED'
    },
    {
        label: 'Chuyên sâu',
        value: 'INTENSVIVE'
    },
]
interface Props {
    children?: React.ReactElement;
    setCrrStep(step: number): void;
    user: null | Object;
}
export const InitCourse = (props: Props) => {
    const { handleSubmit, handleChange, handleBlur, handleReset, touched, errors, values } = useFormik({
        initialValues: {
            major: "Excel",
            nameCourse: "",
            img: "",
            summaryCourse: "",
            videoThumbnail: "",
            level: "BASIC"

        },
        validationSchema: validateYup.object().shape({
            major: validateYup.string().required("Chuyên môn không được thiếu"),
            nameCourse: validateYup.string().required("Bạn cần cung cấp tên khoá học"),
            summaryCourse: validateYup.string().required("Bạn cần cung cấp tổng quan khoá học"),
        }),
        onSubmit: (values) => {
            const mapBody = {
                ...values,
                img: values.major === "Excel" ? IMG_COURSE['EXCEL'] : (values.major === "Word" ? IMG_COURSE['WORD'] : IMG_COURSE['PP']),
                videoThumbnail: values.major === "Excel" ? VideoThumbnail['EXCEL'] : (values.major === "Word" ? VideoThumbnail['WORD'] : VideoThumbnail['PP']),
            }
            dispatch(CourcesAction({
                type: CREATE_COURSE_REQUEST,
                payload: {
                    body: mapBody
                }
            }))
            setSpin(true);
        },
    });
    const getDataUser = useSelector((state: State) => state.GetAllUserReducer);
    const [userTeacher, setUserTeacher] = useState<Array<Obj>>([]);
    const [pickTeacher, setPickTeacher] = useState<string>("");
    const requestCreateCourse = useSelector((state: State) => state.CreateCourseReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        if (requestCreateCourse && !requestCreateCourse.pending) {
            setSpin(false);
            if ((requestCreateCourse.response as Obj)?.success) {
                props.setCrrStep(1)
            }
        }
    }, [requestCreateCourse]);
    useEffect(() => {
        if (((props.user as Obj)?.role as string) === USER.ADMIN) {
            if (!getDataUser) {
                dispatch(UserAction({
                    type: GET_ALL_USER_REQUEST
                })
                )
            }
            if (getDataUser) {
                if (!getDataUser.pending) {
                    if (getData(getDataUser)) {
                        setUserTeacher(() => {
                            return (getData(getDataUser) as Obj[])?.filter((item) => item.role === USER.TEACHER) || []
                        });
                    }
                    setSpinGetTeacher(false);
                }
            }
        }
    }, [getDataUser])
    useEffect(() => {
        if (userTeacher.length !== 0) {
            setPickTeacher(userTeacher[0]._id as string || '');
        }
    }, [userTeacher])
    const [spin, setSpin] = useState<boolean>(false);
    const [spinGetTeacher, setSpinGetTeacher] = useState<boolean>(true);
    return (
        <div className="container-init-course">
            <form onSubmit={handleSubmit}>
                <div>
                    <span>Bộ môn</span>
                    <select name="major" value={values.major} onChange={handleChange} onBlur={handleBlur} id="select-major" className="select">
                        {optionsMajor.map((item, idx) => {
                            return (
                                <option value={item.value} key={idx}>{item.label}</option>
                            )
                        })}
                    </select>
                    <p className="error">{errors.major && touched.major && errors.major}</p>
                </div>
                {
                    ((props.user as Obj)?.role as string) === USER.ADMIN && (
                        <div>
                            <span>Giáo viên</span>
                            {!spinGetTeacher ? (userTeacher.length !== 0 ? <select name="author" value={pickTeacher} onChange={e => {
                                setPickTeacher(e.target.value);
                            }} className="select">
                                {userTeacher.map((item, idx) => {
                                    return (
                                        <option value={item._id as string} key={idx}>{item.username as string}</option>
                                    )
                                })}
                            </select> : <span>Ôi không có giáo viên nào hết!</span>) : (<div style={{ textAlign: 'center' }}><Spin /></div>)}
                            <p className="error">{pickTeacher.length === 0 ? 'Chưa có giáo viên' : ''}</p>
                        </div>)
                }

                <div>
                    <span>Tên khoá học</span>
                    <Input value={values.nameCourse} name="nameCourse" onChange={handleChange} onBlur={handleBlur} />
                    <p className="error">{errors.nameCourse && touched.nameCourse && errors.nameCourse}</p>
                </div>
                <div>
                    <span>Mô tả khoá học</span>
                    <br />
                    <textarea value={values.summaryCourse} name="summaryCourse" onChange={handleChange} onBlur={handleBlur} />
                    <br />
                    <p className="error">{errors.summaryCourse && touched.summaryCourse && errors.summaryCourse}</p>
                </div>
                <div>
                    <span>Cấp độ</span>
                    <select name="level" value={values.level} onChange={handleChange} onBlur={handleBlur} className="select">
                        {optionsLevel.map((item, idx) => {
                            return (
                                <option value={item.value} key={idx}>{item.label}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="group_btn">
                    <Button onClick={handleReset}>Đặt lại</Button>
                    {!spin ? <Button htmlType="submit">Tạo</Button> : (<Spin className="spin-add" />)}
                </div>
            </form >
        </div >
    )
}
