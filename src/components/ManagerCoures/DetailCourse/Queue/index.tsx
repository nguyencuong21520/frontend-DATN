import React, { Component, RefObject } from 'react';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColGroupDef, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { connect } from 'react-redux';
import { FORMAT_DATE } from '../../../../global/enum';
import { formatDate } from '../../../../utils/date';
import { State } from '../../../../redux-saga/reducer/reducer';
import { NoDataGrid } from '../../../NoDataGrid';
import './style.scss';
import { Popconfirm } from 'antd';
import { Action, Obj } from '../../../../global/interface';
import { getData } from '../../../../utils/Hook';
import { UserAction } from '../../../Login/action';
import { ADD_STUDENT_ENROLL_CLEAR, ADD_STUDENT_ENROLL_REQUEST } from '../../../../redux-saga/user/reducer';
import { Toaster } from '../../../../utils/ToastMess';
import { REMOVE_STUDENT_ENROLL_CLEAR, REMOVE_STUDENT_ENROLL_REQUEST } from '../../../../redux-saga/course/reducer';

enum HandleRequest {
    ACCEPT = 'ACCEPT',
    DECLINE = 'DECLINE'
}
interface QueueClassCourseProps {
    detailCourse: Obj | null;
    addStudentEnroll: Obj | null;
    removeStudentEnroll: Obj | null;
    idCourse: string;
    UserAction(payload: Action): void;
}
class QueueClassCourse extends Component<QueueClassCourseProps> {
    private gridRef: RefObject<AgGridReact>;
    private columnDefs: ColDef[] | ColGroupDef[];
    private rowData: Record<string, unknown>[];
    private studentWating: Record<string, unknown>[];
    private query: boolean = false;
    constructor(props: QueueClassCourseProps) {
        super(props);
        this.gridRef = React.createRef();
        this.columnDefs = [
            {
                field: 'no',
                headerName: 'STT',
                cellClass: 'cell',
                resizable: false,
                maxWidth: 40
            },
            {
                field: 'name',
                headerName: 'Họ tên',
                cellClass: 'cell text-left',
                resizable: false,
            },
            {
                field: 'email',
                headerName: 'Email',
                cellClass: 'cell text-left',
                resizable: false,
            },
            {
                field: 'phone',
                headerName: 'SĐT',
                cellClass: 'cell text-right',
                resizable: false,
            },
            {
                field: 'dateRequire',
                headerName: 'Ngày yêu cầu',
                cellClass: 'cell text-right',
                resizable: false,
                valueFormatter: (params: ValueFormatterParams) => {
                    return formatDate(params.value, FORMAT_DATE.YMD)
                },
                maxWidth: 150
            },
            {
                resizable: false,
                cellRenderer: (params: ValueGetterParams) => {
                    return <Popconfirm title={`Từ chối ${params.data.name}?`} okText="Đồng ý" cancelText="Hủy" onConfirm={() => {
                        // todo: id
                        this.onHandleRequest(params.data._id, HandleRequest.DECLINE);
                    }}>
                        <MinusCircleOutlined className="red" />
                    </Popconfirm>
                },
                cellClass: 'text-middle',

            },
            {
                resizable: false,
                cellClass: 'text-middle',
                cellRenderer: (params: ValueGetterParams) => {
                    return <Popconfirm title={`Chấp nhận ${params.data.name} vào lớp?`} okText="Đồng ý" cancelText="Hủy" onConfirm={() => {
                        // todo: id
                        this.onHandleRequest(params.data._id, HandleRequest.ACCEPT);
                    }}>
                        <PlusCircleOutlined className="blue" />
                    </Popconfirm>
                },
            },
        ];
        this.studentWating = ((getData(this.props.detailCourse)[0] as Obj)?.student?.listStudent as Record<string, unknown>[])?.filter((item: Obj) => {
            return !item.access;
        }) || [];
        this.rowData = this.studentWating.map((item: Obj, idx: number) => {
            return {
                no: idx + 1,
                _id: item.user._id,
                name: item.user.username,
                email: item.user.email,
                phone: item.user.phone,
                dateRequire: new Date(item.time)
            }
        })
    }
    shouldComponentUpdate(nextProps: Readonly<QueueClassCourseProps>): boolean {
        if (nextProps.addStudentEnroll !== this.props.addStudentEnroll && nextProps.addStudentEnroll) {
            if (!nextProps.addStudentEnroll.pending) {
                if ((nextProps.addStudentEnroll.response as Obj)?.success) {
                    if (nextProps.addStudentEnroll.type === ADD_STUDENT_ENROLL_REQUEST) {
                        if (this.query) {
                            Toaster.Success(`Chấp thuận thành công`);
                            this.query = false;
                        }
                    }
                    this.props.UserAction({
                        type: ADD_STUDENT_ENROLL_CLEAR
                    })
                } else {
                    Toaster.Error(`Yêu cầu thất bại!`);
                }
            }
        } else if ((nextProps.removeStudentEnroll !== this.props.removeStudentEnroll && nextProps.removeStudentEnroll)) {
            if (!nextProps.removeStudentEnroll.pending) {
                if ((nextProps.removeStudentEnroll.response as Obj)?.success) {
                    if (nextProps.removeStudentEnroll.type === REMOVE_STUDENT_ENROLL_REQUEST) {
                        if (this.query) {
                            Toaster.Success(`Từ chối thành công`);
                            this.query = false;
                        }
                    }
                    this.props.UserAction({
                        type: REMOVE_STUDENT_ENROLL_CLEAR
                    })
                } else {
                    Toaster.Error(`Yêu cầu thất bại!`);
                }
            }
        }
        return false;
    }
    onHandleRequest = (id: string, type: HandleRequest) => {
        this.query = true;
        switch (type) {
            case HandleRequest.ACCEPT:
                this.props.UserAction({
                    type: ADD_STUDENT_ENROLL_REQUEST,
                    payload: {
                        params: {
                            _idCourse: this.props.idCourse
                        },
                        body: {
                            studentId: id
                        }
                    }
                })
                break;
            case HandleRequest.DECLINE:
                this.props.UserAction({
                    type: REMOVE_STUDENT_ENROLL_REQUEST,
                    payload: {
                        params: {
                            _idCourse: this.props.idCourse
                        },
                        body: {
                            studentId: id
                        }
                    }
                })
                break;
        }
    }
    onGridReady = () => {
        const btnPagina = document.querySelectorAll('.container-queue-class div.ag-paging-button');
        (btnPagina[0] as HTMLElement).innerHTML = '';
        (btnPagina[1] as HTMLElement).innerHTML = ' &#171; ';
        (btnPagina[2] as HTMLElement).innerHTML = ' &#187; ';
        (btnPagina[3] as HTMLElement).innerHTML = '';
        this.gridRef.current?.api.sizeColumnsToFit();
    }
    render() {
        return (
            <div className="container-queue-class">
                <AgGridReact
                    ref={this.gridRef}
                    headerHeight={32}
                    columnDefs={this.columnDefs}
                    rowData={this.rowData}
                    defaultColDef={{ resizable: true }}
                    suppressDragLeaveHidesColumns={true}
                    onViewportChanged={() => {
                        this.gridRef.current?.api.sizeColumnsToFit();
                    }}
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={10}
                    noRowsOverlayComponent={() => {
                        return <NoDataGrid />
                    }}
                    onGridReady={this.onGridReady}
                ></AgGridReact>
            </div>
        )
    }
}

const mapStateToProps = (state: State) => ({
    detailCourse: state.OneCourceDetailReducer,
    addStudentEnroll: state.AddStudentEnrollReducer,
    removeStudentEnroll: state.RemoveStudentEnrollReducer,
})

const mapDispatchToProps = {
    UserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(QueueClassCourse)