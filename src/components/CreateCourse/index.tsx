import React, { useState } from 'react';
import { Steps } from 'antd';
import { InitCourse } from './InitCourse';
import './style.scss';
import { AddUnit } from './AddUnit';
import { AddLesson } from './AddLesson';
import { useSelector } from 'react-redux';
import { State } from '../../redux-saga/reducer/reducer';
import { getData } from '../../utils/Hook';

const { Step } = Steps;
interface Props {
    child?: React.ReactElement;
}

export const CreateaCourse = (props: Props) => {
    const [crrStep, setCrrStep] = useState<number>(0);
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
                    crrStep === 0 ? (<InitCourse setCrrStep={(step: number) => { setCrrStep(step) }} user={user} />) : (crrStep === 1 ? (<AddUnit setCrrStep={(step: number) => { setCrrStep(step) }} />) : (<AddLesson setCrrStep={(step: number) => { setCrrStep(step) }} />))
                }
            </div>
        </div>
    )
}
