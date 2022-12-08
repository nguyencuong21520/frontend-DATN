import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Obj } from '../../../global/interface';
import { State } from '../../../redux-saga/reducer/reducer';
import { CourcesAction } from '../action';
import { COURCES_REQUEST_GET_DATA } from '../reducer';
import { Content } from './InfoCourse/Content';
import { InfoCourse } from './InfoCourse/Info';
import { ContentInfoSource } from './RightInfoCourse/Content';
import { Info } from './RightInfoCourse/Info/Info';
import './style.scss';

export enum ContentDetailCourse {
    INFO = 'INFO',
    CONTENT = 'CONTENT',
    STUDIENT = 'STUDIENT'
}

const ListContent = [
    {
        key: ContentDetailCourse.INFO,
        content: 'Thông tin'
    },
    {
        key: ContentDetailCourse.CONTENT,
        content: 'Nội dung'
    },
    {
        key: ContentDetailCourse.STUDIENT,
        content: 'Học sinh'
    },
]

const DetailCourse = () => {
    const { id } = useParams();
    const [contentTab, setContentTab] = useState<ContentDetailCourse>(ContentDetailCourse.INFO);
    const cources = useSelector((state: State) => state.Cources);
    const dataCources = (cources?.response as Obj)?.response.data as Record<string, unknown>[] || [];
    const detailCource = dataCources.find((item) => {
        return item._id as string === id;
    })
    const dispatch = useDispatch();

    useEffect(() => {
        if (!cources) {
            dispatch(CourcesAction({
                type: COURCES_REQUEST_GET_DATA
            }))
        }
    }, []);
    const ComponentConent: Record<ContentDetailCourse, React.ReactElement> = {
        [ContentDetailCourse.INFO]: <InfoCourse idCourse={id} content={detailCource?.summaryCource as string || ''} comment={detailCource?.comment as Obj[]} />,
        [ContentDetailCourse.CONTENT]: <Content />,
        [ContentDetailCourse.STUDIENT]: <>Học sinh</>
    }
    return (
        <div className="container-detail-course">
            {!detailCource ? (<div>Không có dữ liệu</div>) : (
                <>
                    <div className="overview-course">
                        <div className="title">
                            <h3 className="title-course">Khóa học</h3>
                            <h4 className="breadcrumb"><span style={{ color: '#767278' }}>Khóa học &gt; </span> Chi tiết</h4>
                        </div>
                        <div className="container-overview">
                            <div className="intro-overview">
                                <div className="video-intro">
                                    <video className="video" controls width="100%" src={detailCource.videoThumbnail as string || ''}>
                                    </video>
                                </div>
                                <div className="overview">
                                    <h3>{detailCource.nameCource as string || ''}</h3>
                                    <h4>Tác giả: {detailCource.author as string || ''}</h4>
                                    <div className="intro">
                                        <ul className="list-tabs">
                                            {ListContent.map((item) => {
                                                return (
                                                    <li key={item.key} className={`${contentTab === item.key ? 'actived' : null}`} onClick={() => {
                                                        setContentTab(item.key)
                                                    }}>{item.content}</li>
                                                )
                                            })}
                                        </ul>

                                    </div>
                                </div>
                            </div>
                            {ComponentConent[contentTab]}
                        </div>
                    </div>
                    <div className="right-info-course">
                        {contentTab === ContentDetailCourse.INFO && <Info />}
                        {contentTab === ContentDetailCourse.CONTENT && <ContentInfoSource />}
                    </div>
                </>
            )}

        </div>
    )
}



export default DetailCourse