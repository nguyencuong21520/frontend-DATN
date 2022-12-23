import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Progress } from 'antd';
import { Excel } from '../../assets/img';
import { Lock } from '../../assets/img';
import { UnLock } from '../../assets/img';
import { ReactComponent as AvgPoint } from '../../assets/svg/AvgPoint.svg';
import { ReactComponent as IconLamp } from '../../assets/svg/IconLamp.svg';
import { ReactComponent as Iconfnc } from '../../assets/svg/Iconfnc.svg';
import { ReactComponent as ArrowRight } from '../../assets/svg/ArrowRight.svg';
import { ReactComponent as Test15 } from '../../assets/svg/Test15.svg';
import { ReactComponent as MessMail } from '../../assets/svg/MessMail.svg';
import { ReactComponent as TimeRange } from '../../assets/svg/TimeRange.svg';
import { ReactComponent as LampThink } from '../../assets/svg/LampThink.svg';
import { ReactComponent as FinalTest } from '../../assets/svg/FinalTest.svg';
import './style.scss';
import { getDomain } from '../../utils';

interface DashBoard {
    key: string;
    point: string;
    title: string;
    icon: React.ReactElement,
    bottom?: React.ReactElement | string;
}
interface TypeDataCourses {
    id: number;
    name: string;
    img: React.ReactElement;
    summary: string;
    time: string;
    status: boolean;
}
interface PerformType {
    icon: React.ReactElement;
    title: string;
    remind: string;
}
const perfom: Array<PerformType> = [
    {
        icon: <Test15 />,
        title: 'Kiểm tra 15 phút',
        remind: 'Hạn: 20:00 20/10'
    },
    {
        icon: <MessMail />,
        title: 'Bạn đã được thêm vào lớp',
        remind: 'Excel cơ bản'
    },
    {
        icon: <LampThink />,
        title: 'Nhắc nhở học tập',
        remind: 'Lớp Excel cơ bản'
    },
    {
        icon: <FinalTest />,
        title: 'Kiểm tra học kỳ',
        remind: 'Hạn: 00:00 09/10'
    }

]
const mockupDataCourses: Array<TypeDataCourses> = [
    {
        id: 1,
        name: 'Excel',
        img: <Excel />,
        summary: 'Excel cơ bản',
        time: '15 lessons (10h5m)',
        status: true
    },
    {
        id: 2,
        name: 'Excel',
        img: <Excel />,
        summary: 'Excel cơ bản',
        time: '15 lessons (10h5m)',
        status: false
    },
    {
        id: 3,
        name: 'Excel',
        img: <Excel />,
        summary: 'Excel cơ bản',
        time: '15 lessons (10h5m)',
        status: true
    },
    {
        id: 4,
        name: 'Excel',
        img: <Excel />,
        summary: 'Excel cơ bản',
        time: '15 lessons (10h5m)',
        status: true
    },
    {
        id: 5,
        name: 'Excel',
        img: <Excel />,
        summary: 'Excel cơ bản',
        time: '15 lessons (10h5m)',
        status: false
    },
    {
        id: 6,
        name: 'Excel',
        img: <Excel />,
        summary: 'Excel cơ bản',
        time: '15 lessons (10h5m)',
        status: true
    }
]
const analysisDashboard: Array<DashBoard> = [
    {
        key: 'avg.point',
        point: '7.0',
        title: 'Điểm trung bình',
        icon: <AvgPoint />,
        bottom: <Progress percent={30} size="small" />
    },
    {
        key: 'finish',
        point: '5',
        title: 'Số bài đã làm',
        icon: <IconLamp />
    },
    {
        key: 'class',
        point: '2',
        title: 'Số lớp học',
        icon: <Iconfnc />
    },
    {
        key: 'flag',
        point: '3',
        title: 'Cần làm',
        icon: <Iconfnc />,
        bottom: <Link to={'/courses'} className="start">Bắt đầu <ArrowRight /></Link>
    },
]
export const Home = () => {
    useEffect(() => {
        document.title = 'Trang chủ';
    }, [])
    getDomain();
    return (
        <div className="container-home">
            <div className="top-home">
                {analysisDashboard.map((item, idx) => {
                    return (
                        <div className="item" key={item.key + idx}>
                            <div className="top-item">
                                <div className="icon">{item.icon}</div>
                                <div className="Summary">
                                    <strong className="number-summary">{item.point}</strong>
                                    <br />
                                    <span>{item.title}</span>
                                </div>
                            </div>
                            {
                                item.bottom ? (
                                    <div className="bottom-item">
                                        {item.bottom}
                                    </div>
                                ) : null
                            }
                        </div>
                    )
                })}
            </div>
            <div className="content-main">
                <div className="left-main">
                    <div className="head">
                        <span>Nổi bật</span>
                    </div>
                    <div className="main-home">
                        {mockupDataCourses.map((item, index) => {
                            return (
                                <div className={`item-course cell${index + 1}`} key={index}>
                                    <div className="img-title">
                                        <span className="span title">{item.name}</span>
                                        <img src={Excel} alt="subj" className="img-subj" />
                                    </div>
                                    <div className="summary">
                                        <span className="span name-subj">{item.summary}</span>
                                        <div className="footer">
                                            <div className="time">
                                                <TimeRange className="icon" />
                                                <span className="time">{item.time}</span>
                                            </div>
                                            {item.status === true ? <img src={UnLock} alt="UnLock" /> : <img src={Lock} alt="Lock" />}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="right">
                    <div className="head">
                        <span>Cần thực hiện</span>
                    </div>
                    <div className="content">
                        {perfom.map((item) => {
                            return (
                                <div className="item-remind" key={item.title + Math.random() * 100}>
                                    <div className="icon">{item.icon}</div>
                                    <div className="summary">
                                        <span className="title">{item.title}</span>
                                        <br />
                                        <span className="remind">{item.remind}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
