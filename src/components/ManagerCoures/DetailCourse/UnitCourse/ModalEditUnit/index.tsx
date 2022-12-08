import React, { useState } from 'react';
import { Button, message, Upload, Tooltip, UploadProps, Input, Modal } from 'antd';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import { UploadOutlined } from '@ant-design/icons';
import { Obj } from '../../../../../global/interface';
import './style.scss';

interface ModalEditUnitProps {
    children?: React.ReactElement;
    visibleModal?: boolean;
    setVisibleModal(visible: boolean): void;
    dataUnit: Obj;
}
export const ModalEditUnit = (props: ModalEditUnitProps) => {
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach((file) => {
            formData.append('files[]', file as RcFile);
        });
        setUploading(true);
        // You can use any AJAX library you like
        fetch('https://www.mocky.io/v2/5cc8019d300000980a055e76', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.json())
            .then(() => {
                setFileList([]);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const propsUpload: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
        }, 2000);
    };
    console.log(props.dataUnit);
    return (
        <Modal
            open={props.visibleModal}
            onOk={() => {
                handleOk()
            }} onCancel={() => {
                props.setVisibleModal(false);
            }}
            confirmLoading={confirmLoading}
            okText='Cập nhật'
            title="Chỉnh sửa thông tin bài học"
            className="modal-edit-unit" >
            <div className="container-info">
                <div className="row">
                    <label htmlFor="title-unit">
                        <strong>Tiêu đề học phần</strong>
                    </label>
                    <Input placeholder="Tiêu đề học phần" value={props.dataUnit.title} id="title-unit" />
                </div>
                <div className="row">
                    <label htmlFor="title-file">
                        <strong>Bài học</strong>
                    </label>
                    <br />
                    <Input placeholder="Tiêu đề học phần" value={props.dataUnit.title} id="title-file" className="title-unit" />
                    <Upload {...propsUpload} maxCount={1}>
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                    <Button
                        type="primary"
                        onClick={handleUpload}
                        disabled={fileList.length === 0}
                        loading={uploading}
                        style={{ marginTop: 16 }}
                    >
                        {uploading ? 'Uploading' : 'Start Upload'}
                    </Button>
                </div>
            </div>
        </Modal>
    )
}
