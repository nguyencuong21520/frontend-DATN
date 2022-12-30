import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TYPE_FILE } from "../../../global/enum";
import { Obj } from "../../../global/interface";
import { State } from "../../../redux-saga/reducer/reducer";
import { getData } from "../../../utils/Hook";
import { CourcesAction } from "../../../redux-saga/course/action";
import { COURCES_REQUEST_GET_DATA, GET_ONE_DETAIL_ONE_COURSE } from "../../../redux-saga/course/reducer";
import { Content } from "./InfoCourse/Content";
import { ModalScorm } from "./InfoCourse/Content/DropDownCourse/ModalScorm";
import { InfoCourse } from "./InfoCourse/Info";
import { ContentInfoSource } from "./RightInfoCourse/Content";
import { Info } from "./RightInfoCourse/Info/Info";
import "./style.scss";

export enum ContentDetailCourse {
    INFO = "INFO",
    CONTENT = "CONTENT",
    STUDIENT = "STUDIENT",
}

const ListContent = [
    {
        key: ContentDetailCourse.INFO,
        content: "Thông tin",
    },
    {
        key: ContentDetailCourse.CONTENT,
        content: "Nội dung",
    },
    {
        key: ContentDetailCourse.STUDIENT,
        content: "Học sinh",
    },
];

export interface ActiveLesson {
    type: string;
    src: string;
}
const DetailCourse = () => {
    const { id } = useParams();
    const [contentTab, setContentTab] = useState<ContentDetailCourse>(
        ContentDetailCourse.INFO
    );
    const cources = useSelector((state: State) => state.Cources);
    const dataCources = getData(cources) || [];
    const detailCource = dataCources.find((item: Obj) => {
        return (item._id as string) === id;
    });
    const [currentLesson, setCurrentLesson] = useState<ActiveLesson | null>(null);
    const dataDetailCourse = useSelector((state: State) => state.OneCourceDetailReducer);
    const [statusQuery, setStatusQuery] = useState<boolean>(true);
    const crrDetail = getData(dataDetailCourse) || [];
    const setActiveLesson = (data: ActiveLesson) => {
        setCurrentLesson(data);
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if (dataDetailCourse) {
            if (!dataDetailCourse.pending) {
                setStatusQuery(false);
            }
        }
    }, [statusQuery, dataDetailCourse])
    useEffect(() => {
        if (!cources) {
            dispatch(
                CourcesAction({
                    type: COURCES_REQUEST_GET_DATA,
                })
            );
        }
        if (!dataDetailCourse) {
            dispatch(CourcesAction({
                type: GET_ONE_DETAIL_ONE_COURSE,
                payload: {
                    body: {
                        _idCourse: id
                    }
                }
            }))
        }
    }, [cources, dispatch]);
    const ComponentConent: Record<ContentDetailCourse, React.ReactElement> = {
        [ContentDetailCourse.INFO]: (
            <InfoCourse
                idCourse={id}
                content={(detailCource?.summaryCourse as string) || ""}
                comment={(crrDetail[0] as Obj)?.comment as Obj[] || []}
                statusQuery={statusQuery}
            />
        ),
        [ContentDetailCourse.CONTENT]: <Content unit={detailCource} setCurrentLesson={setActiveLesson} />,
        [ContentDetailCourse.STUDIENT]: <>Học sinh</>,
    };
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    useEffect(() => {
        if (currentLesson && currentLesson.type === TYPE_FILE.SCORM) {
            setVisibleModal(true);
        }
        window.scrollTo({
            behavior: "smooth",
            top: 0
        })
    }, [currentLesson]);
    useEffect(() => {
        if (!visibleModal) {
            if (detailCource) {
                setCurrentLesson(null)
            }
        }
    }, [detailCource, visibleModal])
    return (
        <div className="container-detail-course">
            {visibleModal && <ModalScorm visible={visibleModal} setVisible={(visible: boolean) => { setVisibleModal(visible) }} scr={currentLesson?.src as string} />}

            {!detailCource ? (
                <div>Không có dữ liệu</div>
            ) : (
                <>
                    <div className="overview-course">
                        <div className="title">
                            <h3 className="title-course">Khóa học</h3>
                            <h4 className="breadcrumb">
                                <span style={{ color: "#767278" }}>Khóa học &gt; </span> Chi
                                tiết
                            </h4>
                        </div>
                        <div className="container-overview">
                            <div className="intro-overview">
                                <div className="video-intro">
                                    {!currentLesson ? (
                                        <video
                                            className="video"
                                            controls
                                            width="100%"
                                            src={(detailCource.videoThumbnail as string) || ""}
                                        ></video>) : (
                                        currentLesson.type === TYPE_FILE.VIDEO ? (
                                            <video
                                                className="video"
                                                controls
                                                width="100%"
                                                src={(currentLesson.src as string) || ""}
                                            ></video>
                                        ) : (<h1>SCORM Pratice</h1>)
                                    )}

                                </div>
                                <div className="overview">
                                    <h3>{(detailCource.nameCourse as string) || ""}</h3>
                                    <h4>Tác giả: {((detailCource.author as Obj)?.username as string) || ""}</h4>
                                    <div className="intro">
                                        <ul className="list-tabs">
                                            {ListContent.map((item) => {
                                                return (
                                                    <li
                                                        key={item.key}
                                                        className={`${contentTab === item.key ? "actived" : null
                                                            }`}
                                                        onClick={() => {
                                                            setContentTab(item.key);
                                                        }}
                                                    >
                                                        {item.content}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {ComponentConent[contentTab]}
                        </div>
                    </div>
                    <div className="right-info-course">
                        {contentTab === ContentDetailCourse.INFO && <Info idCourse={id as string} statusEnroll={detailCource.enroll} />}
                        {contentTab === ContentDetailCourse.CONTENT && (
                            <ContentInfoSource crrCourse={detailCource} statusEnroll={detailCource.enroll} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default DetailCourse;
