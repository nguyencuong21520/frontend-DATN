import React, { useEffect, useState } from 'react';
import { Button, Input, Spin } from 'antd';
import * as validateYup from "yup";
import { useFormik } from 'formik';
import './style.scss';
import { useDispatch } from 'react-redux';
import { CourcesAction } from '../../../redux-saga/course/action';
import { CREATE_UNIT_COURSE_REQUEST } from '../../../redux-saga/course/reducer';
import { useSelector } from 'react-redux';
import { State } from '../../../redux-saga/reducer/reducer';
import { Obj } from '../../../global/interface';

interface Props {
    child?: React.ReactElement;
    setCrrStep(step: number): void;
}
export const AddUnit = (props: Props) => {
    const [spin, setSpin] = useState<boolean>(false);
    const dispatch = useDispatch();
    const idCourseCrr = useSelector((state: State) => state.CreateCourseReducer);
    const createUnit = useSelector((state: State) => state.CreateUnitCourseReducer);
    const { handleChange, handleSubmit, handleBlur, touched, errors, values } = useFormik({
        initialValues: {
            unitName: ''
        },
        validationSchema: validateYup.object().shape({
            unitName: validateYup.string().required()
        }),
        onSubmit: (values) => {
            setSpin(true);
            dispatch(CourcesAction({
                type: CREATE_UNIT_COURSE_REQUEST,
                payload: {
                    params: {
                        _idCourse: ((idCourseCrr?.response as Obj)?.response as Obj)?.data.insertedId
                    },
                    body: {
                        ...values
                    }
                }
            }))
        }
    });
    useEffect(() => {
        if (createUnit && !createUnit.pending) {
            setSpin(false);
            if ((createUnit.response as Obj)?.success) {
                props.setCrrStep(2)
            }
        }
    }, [createUnit])
    return (
        <div className="container-add-unit">
            <form onSubmit={handleSubmit}>
                <span>Tên học phần</span>
                <Input type="text" placeholder="Đặt tên học phần" name='unitName' className="ipt-add-unit" value={values.unitName} onChange={handleChange} onBlur={handleBlur} />
                {errors.unitName && touched.unitName && errors.unitName && <p style={{ color: 'red' }}>Tên học phần không được trống</p>}
                {spin ? <Spin /> : <Button htmlType='submit'>Tạo</Button>}
            </form>
        </div>
    )
}
