import React from 'react';
import { Avatar, Badge, Button, Form } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Obj } from '../../../../../global/interface';
import AvatarUser from '../../../../../assets/img/AvatarUser.jpg';
import './style.scss';

interface InfoCourseProps {
    idCourse?: string;
    content?: string;
    comment: Obj[];
}
export const InfoCourse = (props: InfoCourseProps) => {
    const onFinish = (e: any) => {
        console.log(e);
    }
    return (
        <div className="container-info">
            <div className="content">
                {props.content || ''}
            </div>
            <h3 className="title-comment">Bình luận</h3>
            {props.comment?.length !== 0 ? (<>
                <div className="comment">
                    <div className="content-comment">
                        <div className="item-comment">
                            <div className="img-user-comment">
                                <Badge>
                                    <Avatar shape="circle" size="large" src={AvatarUser} />
                                </Badge>
                            </div>
                            <div className="summary-info">
                                <p className="name-user">Nguyễn Văn Cường</p>
                                <p className="time-comment">Một giờ trước</p>
                                <p className="content">Quá là hay ông zà ơi!!!!</p>
                            </div>
                        </div>
                        <div className="item-comment">
                            <div className="img-user-comment">
                                <Badge>
                                    <Avatar shape="circle" size="large" src={AvatarUser} />
                                </Badge>
                            </div>
                            <div className="summary-info">
                                <p className="name-user">Nguyễn Văn Cường</p>
                                <p className="time-comment">Một giờ trước</p>
                                <p className="content">Quá là hay ông zà ơi!!!!</p>
                            </div>
                        </div>
                        <div className="item-comment">
                            <div className="img-user-comment">
                                <Badge>
                                    <Avatar shape="circle" size="large" src={AvatarUser} />
                                </Badge>
                            </div>
                            <div className="summary-info">
                                <p className="name-user">Nguyễn Văn Cường</p>
                                <p className="time-comment">Một giờ trước</p>
                                <p className="content">Quá là hay ông zà ơi!!!!</p>
                            </div>
                        </div>
                        <div className="item-comment">
                            <div className="img-user-comment">
                                <Badge>
                                    <Avatar shape="circle" size="large" src={AvatarUser} />
                                </Badge>
                            </div>
                            <div className="summary-info">
                                <p className="name-user">Nguyễn Văn Cường</p>
                                <p className="time-comment">Một giờ trước</p>
                                <p className="content">Quá là hay ông zà ơi!!!!</p>
                            </div>
                        </div>
                        <div className="item-comment">
                            <div className="img-user-comment">
                                <Badge>
                                    <Avatar shape="circle" size="large" src={AvatarUser} />
                                </Badge>
                            </div>
                            <div className="summary-info">
                                <p className="name-user">Nguyễn Văn Cường</p>
                                <p className="time-comment">Một giờ trước</p>
                                <p className="content">Quá là hay ông zà ơi!!!!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>) : (<>Chưa có bình luận, hãy là người đầu tiên để lại bình luận nhé!</>)}

            <div className="write-comment">
                <h3>Để lại bình luận</h3>
                <div className="form-comment">
                    <Form
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                        className="my-form"
                    >
                        <Form.Item
                            name="comment"
                        >
                            <TextArea rows={4} placeholder="Write your comments here..." style={{ height: '100%', resize: 'none' }} className="cmts" name='commentuser' required />
                        </Form.Item>
                        <Button htmlType='submit'>Đăng</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
