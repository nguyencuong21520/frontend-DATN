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
export const InitCourse = () => {
    const { handleSubmit, handleChange, handleBlur, handleReset, touched, errors, values } = useFormik({
        initialValues: {
            major: "Excel",
            nameCource: "",
            img: "",
            summaryCource: "",
            videoThumbnail: "",
            level: "BASIC"

        },
        validationSchema: validateYup.object().shape({
            major: validateYup.string().required("Chuyên môn không được thiếu"),
            nameCource: validateYup.string().required("Bạn cần cung cấp tên khoá học"),
            summaryCource: validateYup.string().required("Bạn cần cung cấp tổng quan khoá học"),
        }),
        onSubmit: (values) => {
            const mapBody = {
                ...values,
                img: values.major === "Excel" ? IMG_COURSE['EXCEL'] : (values.major === "Word" ? IMG_COURSE['WORD'] : IMG_COURSE['PP']),
                videoThumbnail: values.major === "Excel" ? VideoThumbnail['EXCEL'] : (values.major === "Word" ? VideoThumbnail['WORD'] : VideoThumbnail['PP']),
            }
            console.log(mapBody)
        },
    });
    const getDataUser = useSelector((state: State) => state.GetAllUserReducer);
    const [userTeacher, setUserTeacher] = useState<Array<Obj>>([]);
    const [pickTeacher, setPickTeacher] = useState<string>("");
    const dispatch = useDispatch();
    useEffect(() => {
        if (!getDataUser) {
            dispatch(UserAction({
                type: GET_ALL_USER_REQUEST
            })
            )
        }
        if (getDataUser) {
            if (!getDataUser.pending) {
                setUserTeacher(() => {
                    return (getData(getDataUser) as Obj[]).filter((item) => item.role === USER.TEACHER)
                });
                setSpinGetTeacher(false);
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
                </div>
                <div>
                    <span>Tên khoá học</span>
                    <Input value={values.nameCource} name="nameCource" onChange={handleChange} onBlur={handleBlur} />
                    <p className="error">{errors.nameCource && touched.nameCource && errors.nameCource}</p>
                </div>
                <div>
                    <span>Mô tả khoá học</span>
                    <br />
                    <textarea value={values.summaryCource} name="summaryCource" onChange={handleChange} onBlur={handleBlur} />
                    <br />
                    <p className="error">{errors.summaryCource && touched.summaryCource && errors.summaryCource}</p>
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
                <div>
                    <Button onClick={handleReset}>Đặt lại</Button>
                    {!spin ? <Button htmlType="submit">Tạo</Button> : (<div style={{ textAlign: 'center' }}><Spin /></div>)}
                </div>
            </form >
        </div >
    )
}
