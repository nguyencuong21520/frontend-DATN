import React, { useEffect, useRef, useState } from 'react';
import * as validateYup from "yup";
import { useFormik } from 'formik';
import './style.scss';
import { Input, Spin, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, message, Upload } from 'antd';
import { Obj } from '../../../global/interface';
import { useDispatch } from 'react-redux';
import { CourcesAction } from '../../../redux-saga/course/action';
import { CREATE_COURSE_CLEAR, CREATE_LESSON_UNIT_CLEAR, CREATE_LESSON_UNIT_REQUEST, CREATE_UNIT_COURSE_CLEAR } from '../../../redux-saga/course/reducer';
import { useSelector } from 'react-redux';
import { State } from '../../../redux-saga/reducer/reducer';
import { Toaster } from '../../../utils/ToastMess';
import { uploadFile } from '../../../firebase';
import { TYPE_FILE } from '../../../global/enum';
interface Props {
    child?: React.ReactElement;
    setCrrStep(step: number): void;
}

export const AddLesson = (props: Props) => {
    const { handleChange, handleSubmit, handleBlur, touched, errors, values } = useFormik({
        initialValues: {
            lessonName: '',
            source: '',
            type: 'VIDEO'
        },
        validationSchema: validateYup.object().shape({
            lessonName: validateYup.string().required('Bạn cần điền tên bài học'),
        }),
        onSubmit: () => {
            handleCreateLesson()
        }
    });
    const dispatch = useDispatch();
    const createUnit = useSelector((state: State) => state.CreateUnitCourseReducer);
    const createLesson = useSelector((state: State) => state.CreateLessonUnitReducer);
    const handleCreateLesson = () => {
        const bodyData = {
            ...values,
            source: sourceFile
        }
        dispatch(CourcesAction({
            type: CREATE_LESSON_UNIT_REQUEST,
            payload: {
                params: {
                    _idUnit: ((createUnit?.response as Obj)?.response.data as Obj)?.insertedId
                },
                body: bodyData

            }
        }))
        setSpin(true);
    }
    const [sourceFile, setSourceFile] = useState<string>('');
    const [errUpload, setErrUpload] = useState<string | null>(null);
    const [spin, setSpin] = useState<boolean>(false);
    const fileUpload = useRef();
    const uploadQuery = useRef(false);
    const [progess, setProgress] = useState(0);
    useEffect(() => {
        if (uploadQuery.current && values.type === 'VIDEO') {
            if (progess === 100) {
                (document.querySelector('.container-add-lesson .ant-upload-text-icon') as HTMLElement)!.style.display = 'none';
                message.success(`Tải lên thành công!`);
                uploadQuery.current = false;
            }
        }
    }, [progess])
    useEffect(() => {
        if (errUpload) {
            message.error(errUpload);
            setErrUpload(null);
        }
    }, [errUpload])
    const propsFile: UploadProps = {
        name: 'file',
        ...(values.type === 'SCORM' && {
            action: 'http://ec2-54-199-158-253.ap-northeast-1.compute.amazonaws.com:3002/upload'
        }),
        headers: {
            authorization: 'authorization-text',
        },
        ...(values.type === 'SCORM' && {
            beforeUpload(file: Obj, FileList) {
                if (file.type !== 'application/zip') {
                    message.error('File SCORM phải là định dạng zip!');
                    FileList = []
                    return false;
                }
            }
        }),
        onChange(info) {
            if (values.type === 'VIDEO') {
                if (info.fileList.length === 0) {
                    setProgress(0);
                }
            } else {
                if (info.file.status && info.file.status !== 'removed') {
                    if (info.file.status !== 'uploading') {
                        setSourceFile((info.fileList[0].response.response as Obj)?.message.index)
                    }
                    if (info.file.status === 'done') {
                        message.success(`Tải file thành công!`);
                    } else if (info.file.status === 'error') {
                        message.error(`Tải lên thất bại!`);
                    }
                }
            }
        },
        ...(values.type === 'VIDEO' && {
            customRequest(e) {
                uploadQuery.current = true
                uploadFile(values.type as TYPE_FILE, e.file, setProgress, setSourceFile, setErrUpload);
            },
        })
    };
    useEffect(() => {
        if (createLesson) {
            if (!createLesson.pending) {
                if ((createLesson?.response as Obj)?.success) {
                    Toaster.Success('Thêm khoá học thành công!');
                    dispatch(CourcesAction({
                        type: CREATE_COURSE_CLEAR
                    }))
                    dispatch(CourcesAction({
                        type: CREATE_UNIT_COURSE_CLEAR
                    }))
                    dispatch(CourcesAction({
                        type: CREATE_LESSON_UNIT_CLEAR
                    }))
                } else {
                    Toaster.Error('Thêm khoá học thất bại!');
                }
                setSpin(false);
            }
        }
    }, [createLesson])
    return (
        <div className="container-add-lesson">
            <form onSubmit={handleSubmit}>
                <label htmlFor="lesson-name">Tên bài học</label>
                <Input type='text' name='lessonName' placeholder='Tên bài học' id='lesson-name' value={values.lessonName} onChange={handleChange} onBlur={handleBlur} />
                <p className="error">{errors.lessonName && touched.lessonName && errors.lessonName}</p>
                <label htmlFor="type-file">Kiểu file</label>
                <select name="type" id="type-file" onChange={handleChange}>
                    <option value="VIDEO">Video</option>
                    <option value="SCORM">SCORM</option>
                </select>
                <br />
                <label htmlFor="file" style={{ marginRight: '10px' }}>Chọn file tại đây</label>
                <Upload {...propsFile} id="file" name='file' maxCount={1} ref={fileUpload} >
                    <Button icon={<UploadOutlined />}>Kích để upload</Button>
                </Upload>
                {values.type === 'VIDEO' && <Progress percent={Math.ceil(progess)} status={!errUpload ? 'normal' : 'exception'} />}
                <p className="error">{sourceFile === '' ? 'Hiện chưa có file bài học' : ''}</p>
                {spin ? <Spin /> : <Button htmlType='submit'>Hoàn tất</Button>}
            </form>
        </div>
    )
}
