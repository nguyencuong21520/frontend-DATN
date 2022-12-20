import React, { useEffect } from 'react';
import { Tag } from 'antd';
import { useSelector } from 'react-redux';
import { State } from '../../../../../redux-saga/reducer/reducer';
import { useDispatch } from 'react-redux';
import { UserAction } from '../../../../../redux-saga/user/action';
import { Action } from '../../../../../global/interface';
import { USER_ENROLL_REQUEST } from '../../../../../redux-saga/user/reducer';
import Lock from '../../../../../assets/img/Lock.png';
import { ReactComponent as IconStudent } from '../../../../../assets/svg/IconStudent.svg';
import { ReactComponent as IconPractice } from '../../../../../assets/svg/IconPractice.svg';
import { ReactComponent as TimeRange } from '../../../../../assets/svg/TimeRange.svg';
import { ReactComponent as Statiscal } from '../../../../../assets/svg/Statiscal.svg';
import './style.scss';
const InfoList: Array<Record<string, React.ReactElement | string>> = [
  {
    icon: <IconStudent />,
    content: '20 học sinh'
  },
  {
    icon: <IconPractice />,
    content: '50 Bài học (9h 11m)'
  },
  {
    icon: <TimeRange />,
    content: '3 Bài tập'
  },
  {
    icon: <Statiscal />,
    content: 'Cấp độ'
  },

]
interface Props {
  child?: React.ReactElement;
  idCourse?: string;
}
export const Info = (props: Props) => {
  const log = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };
  const dispatch = useDispatch();
  const userEnroll = useSelector((state: State) => state.UserEnrollReducer);
  useEffect(() => {
    console.log(userEnroll)
  }, [userEnroll])
  const handleRequestEnroll = () => {
    const payload: Action = {
      type: USER_ENROLL_REQUEST,
      payload: {
        params: {
          _idCourse: props.idCourse as string
        }
      }
    }
    dispatch(UserAction(payload))
  }
  return (
    <div className="container-tab-info-course">
      <div className="fnc-join-class block">
        <div className="icon-lock">
          <img src={Lock} alt="Lock" />
        </div>
        <button onClick={handleRequestEnroll}>Tham gia</button>
      </div>
      <div className="take block">
        <span className="title">Bạn sẽ học được gì?</span>
        <p>Kiến thức và thực hành các thao tác cơ bản với excel</p>
      </div>
      <div className="summary-course block">
        <span className="title">Thông tin</span>
        <ul>
          {InfoList.map((item) => {
            return (
              <li key={item.content as string}>
                <div className="icon">
                  {item.icon}
                </div>
                {item.content}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="tag block">
        <span className="title">Tags:</span>
        <br />
        <div className="container-tag">
          <Tag closable onClose={log}>
            Basic
          </Tag>
          <Tag closable onClose={log}>
            Nguyễn Văn Cường
          </Tag>
          <Tag closable onClose={log}>
            Excel
          </Tag>
        </div>
      </div>
    </div>
  )
}
