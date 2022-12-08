import React, { useState } from 'react';
import { Modal } from 'antd';
import { Excel } from '../../../../assets/img';
import TableStudents from './TableStudents';
import './style.scss';
interface OverViewProps {
    children?: React.ReactElement;
}
export const OverView = (prop: OverViewProps) => {
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const handleModal = (visible: boolean) => {
        setVisibleModal(visible)
    }
    return (
        <div className="container-overview">
            <div className="part-info">
                <div className="left">
                    <img src={Excel} alt="Course" />
                </div>
                <div className="right">
                    <h2>Khóa học: Excel Cơ bản</h2>
                    <p>Tổng quan: Ứng dụng thành thạo 150 hàm Excel, Pivot Table, kỹ thuật lọc, định dạng dữ liệu, vẽ biểu đồ chuyên nghiệp...vào công việc
                        Hình thành và phát triển tư duy tổ chức, xử lý dữ liệu khoa học
                        Rèn luyện kỹ năng báo cáo theo các công việc cụ thể để sử dụng Excel thành thạo, đáp ứng tiêu chuẩn về kỹ năng Excel của các doanh nghiệp, tập đoàn Tự xây dựng hệ thống báo cáo động, hệ thống quản trị chuyên nghiệp để đo lường hiệu quả công việc Có chuyên gia Excel bên cạnh 24/7 để hỏi khi cần
                        Được làm quen với công việc thực tế tại các tập đoàn, doanh nghiệp lớn
                        Cơ hội thăng tiến lên vị trí Quản lý, phát triển sự nghiệp nhanh chóng
                        Tiết kiệm chi phí và thời gian so với học offline, thời gian học linh hoạt Vượt qua các kỳ thi cấp chứng nhận năng lực</p>
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
                ><TableStudents onDetail /></Modal>
                <TableStudents />
            </div>
        </div>
    )
}
