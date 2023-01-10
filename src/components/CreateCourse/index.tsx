import React, { useState } from 'react';
import { Steps } from 'antd';
import { InitCourse } from './InitCourse';
import './style.scss';
import { AddUnit } from './AddUnit';
import { AddLesson } from './AddLesson';
import { useSelector } from 'react-redux';
import { State } from '../../redux-saga/reducer/reducer';
import { getData } from '../../utils/Hook';
import { useParams } from 'react-router-dom';

const { Step } = Steps;
interface Props {
    child?: React.ReactElement;
}

export const CreateaCourse = (props: Props) => {
    const { type, id } = useParams();
    const getStep = type ? (type === 'unit' ? 1 : (type === 'lesson' ? 2 : 0)) : 0;
    const [crrStep, setCrrStep] = useState<number>(getStep);
    const crrUser = useSelector((state: State) => state.User);
    const dataCrrUser = getData(crrUser);
    const user = {
        role: dataCrrUser?.role,
        _id: dataCrrUser?._id
    }
    return (
        <div className="contaienr-create-course">
            <div className="header-step">
                <Steps
                    size="default"
                    current={crrStep}
                >
                    <Step title="Khởi tạo" />
                    <Step title="Thêm học phần" />
                    <Step title="Thêm bài học" />
                </Steps>
            </div>
            <div className="container-main">
                {
                    crrStep === 0 ? (<InitCourse setCrrStep={(step: number) => { setCrrStep(step) }} user={user} />) : (crrStep === 1 ? (<AddUnit idCourse={id} setCrrStep={(step: number) => { setCrrStep(step) }} />) : (type === 'lesson' ? (<AddLesson idCourse={id} setCrrStep={(step: number) => { setCrrStep(step) }} />) : (<AddLesson setCrrStep={(step: number) => { setCrrStep(step) }} />)))
                }
            </div>
        </div>
    )
}
