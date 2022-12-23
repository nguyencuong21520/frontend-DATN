import { Modal } from 'antd';
import React from 'react';
import './style.scss';

interface Props {
    child?: React.ReactElement;
    scr: string;
    visible?: boolean;
    setVisible(visible?: boolean): void;
}
export const ModalScorm = (props: Props) => {
    return (
        <div className="container-modal-scrom">
            <Modal
                open={props.visible}
                onCancel={() => {
                    props.setVisible(false);
                }}
                title="Tập luyện với SCORM"
                className="modal-play-scorm"
                width={1500}
            >
                <iframe src={props.scr} title="SCORM Practice"></iframe>
            </Modal>
        </div>
    )
}
