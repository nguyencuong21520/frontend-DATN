import React, { useState } from 'react';
import { Steps } from 'antd';
import { InitCourse } from './InitCourse';
import './style.scss';
import { AddUnit } from './AddUnit';
import { AddLesson } from './AddLesson';

const { Step } = Steps;
interface Props {
    child?: React.ReactElement;
}

export const CreateaCourse = (props: Props) => {
    const [crrStep, setCrrStep] = useState<number>(0);
    return (
        <div className="contaienr-create-course">
            <div className="header-step">
                <Steps
                    size="default"
                    current={crrStep}
                >
                    <Step title="Khởi tạo" />
                    <Step title="Thêm nội dung" />
                    <Step title="Thêm bài học" />
                </Steps>
            </div>
            <div className="container-main">
                {
                    crrStep === 0 ? (<InitCourse />) : (crrStep === 1 ? (<AddUnit />) : (<AddLesson />))
                }
            </div>
        </div>
    )
}
