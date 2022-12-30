import React, { useEffect, useState } from 'react';
import { Avatar, Badge, Button, Form, Spin } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { Obj } from '../../../../../global/interface';
import AvatarUser from '../../../../../assets/img/AvatarUser.jpg';
import './style.scss';
import { formatTimeLast } from '../../../../../utils';
import { useSelector } from 'react-redux';
import { State } from '../../../../../redux-saga/reducer/reducer';
import { useDispatch } from 'react-redux';
import { UserAction } from '../../../../Login/action';
import { ADD_COMMENT_COURSE_CLEAR, ADD_COMMENT_COURSE_REQUEST } from '../../../../../redux-saga/user/reducer';
import { useParams } from 'react-router-dom';
import { Toaster } from '../../../../../utils/ToastMess';

interface InfoCourseProps {
    idCourse?: string;
    content?: string;
    comment: Obj[];
    statusQuery?: boolean
}
export const InfoCourse = (props: InfoCourseProps) => {
    const dispatch = useDispatch();
    const { id } = useParams()
    const onFinish = (e: Obj) => {
        setSpinComment(true)
        dispatch(UserAction({
            type: ADD_COMMENT_COURSE_REQUEST,
            payload: {
                params: {
                    _idCourse: id
                },
                body: e
            }
        }))
    }
    const [spin, setSpin] = useState<boolean>(true);
    const getRqComment = useSelector((state: State) => state.AddCommentCourseReducer);
    const [spinComment, setSpinComment] = useState<boolean>(false);
    useEffect(() => {
        if (getRqComment) {
            if (!getRqComment.pending) {
                setSpinComment(false);
                if ((getRqComment.response as Obj).success) {

                } else {
                    Toaster.Error('Đăng thất bại!');
                }
                Toaster.Success('Đăng bình luận thành công!');
                dispatch(UserAction({
                    type: ADD_COMMENT_COURSE_CLEAR
                }))
            }
        }
    }, [getRqComment])
    useEffect(() => {
        if (!props.statusQuery) {
            setSpin(false);
        }
    }, [props.statusQuery])
    return (
        <div className="container-info">
            <div className="content">
                {props.content || ''}
            </div>
            <h3 className="title-comment">Bình luận</h3>
            <div className="comment">
                {spin ? <Spin /> : ((((props.comment && (props.comment).length !== 0)) ? (
                    (((props.comment as Obj)?.listComment as Array<Obj>).map((item, idx) => {
                        return (
                            <div className="content-comment" key={item.user._id as string + idx}>
                                <div className="item-comment">
                                    <div className="img-user-comment">
                                        <Badge>
                                            <Avatar shape="circle" size="large" src={AvatarUser} />
                                        </Badge>
                                    </div>
                                    <div className="summary-info">
                                        <p className="name-user">{item.user.username}</p>
                                        <p className="time-comment">{formatTimeLast(new Date(item.time as string))}</p>
                                        <p className="content">{item.content}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })))
                    : (<>Chưa có bình luận, hãy là người đầu tiên để lại bình luận nhé!</>)))}
            </div>
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
                        {spinComment ? <Spin /> : <Button htmlType='submit'>Đăng</Button>}
                    </Form>
                </div>
            </div>
        </div>
    )
}
