import React, { Component, RefObject } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { Input, Popconfirm } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { MessageOutlined, RollbackOutlined } from '@ant-design/icons';
import { Radio, DatePickerProps, DatePicker } from 'antd';
import { CellClickedEvent, ColDef, ColGroupDef, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { Action, Obj } from '../../../../../global/interface';
import { getDomain } from '../../../../../utils';
import { State } from '../../../../../redux-saga/reducer/reducer';
import { FORMAT_DATE } from '../../../../../global/enum';
import { formatDate } from '../../../../../utils/date';
import { NoDataGrid } from '../../../../NoDataGrid';
import { CourcesAction } from '../../../../../redux-saga/course/action';
import './style.scss';
import { REMOVE_STUDENT_ENROLL_CLEAR, REMOVE_STUDENT_ENROLL_REQUEST } from '../../../../../redux-saga/course/reducer';
import { Toaster } from '../../../../../utils/ToastMess';

enum SEARCH_FIELD {
    NAME = 'NAME',
    EMAIL = 'EMAIL',
    SDT = 'SDT',
    DATE = 'DATE',
}
interface TableStudentsProps {
    onDetail?: boolean;
    listStudent: Obj[];
    removeStudentEnroll: null | Obj;
    CourcesAction(payload: Action): void;
    idCourse?: string;
}
interface TableStudentsStates {
    field: SEARCH_FIELD;
    value: string | Date;
}
class TableStudents extends Component<TableStudentsProps, TableStudentsStates> {
    private gridRef: RefObject<AgGridReact>;
    private columnDefs: ColDef[] | ColGroupDef[];
    private rowData: Record<string, unknown>[];
    private query: boolean = false;

    constructor(props: TableStudentsProps) {
        super(props);
        this.gridRef = React.createRef();
        this.state = {
            field: SEARCH_FIELD.NAME,
            value: ''
        }
        this.columnDefs = [
            {
                field: 'no',
                headerName: 'STT',
                cellClass: 'cell',
                resizable: false,
                maxWidth: 50
            },
            {
                hide: !this.props.onDetail,
                cellClass: 'cell align-middle',
                resizable: false,
                cellRenderer: () => {
                    return <MessageOutlined className="mess-icon" />
                },
                maxWidth: 50,
                onCellClicked: (params: CellClickedEvent) => {
                    // todo: id
                    window.open(`${getDomain()}/messenger/${params.data.name}`)
                }
            },
            {
                field: 'name',
                headerName: 'Họ tên',
                cellClass: 'cell',
                resizable: false,
            },
            {
                field: 'email',
                headerName: 'Email',
                cellClass: 'cell',
                resizable: false,
            },
            {
                field: 'phone',
                headerName: 'Số điện thoại',
                cellClass: 'cell',
                resizable: false,
            },
            {
                field: 'dateEnRoll',
                headerName: 'Ngày tham gia',
                headerClass: 'text-middle',
                cellClass: 'cell text-middle',
                resizable: false,
                valueFormatter: (params: ValueFormatterParams) => {
                    return formatDate(params.value, FORMAT_DATE.YMD)
                }
            },
            {
                headerName: '',
                hide: !this.props.onDetail,
                headerClass: 'text-middle',
                cellClass: 'cell align-middle',
                resizable: false,
                cellRenderer: (params: ValueGetterParams) => {
                    return (
                        <Popconfirm title={`Xóa ${params.data.name} khỏi lớp?`} okText="Đồng ý" cancelText="Hủy" onConfirm={() => {
                            // todo: id
                            this.onConfirmRemoveStudent(params.data.id);
                        }}>
                            <RollbackOutlined className="roll-back" />
                        </Popconfirm>
                    )
                },
                maxWidth: 50
            }
        ]
        this.rowData = [];
        this.handleData(this.props.listStudent);
    }
    onChange = (e: RadioChangeEvent) => {
        this.setState({
            ...this.state,
            field: e.target.value
        })
        this.searchField(e.target.value, this.state.value);
    };
    handleData = (data: Obj[]) => {
        const hi = data?.map((item: Obj, idx: number) => {
            return {
                no: idx + 1,
                id: (item?.user as Obj)?._id,
                name: (item?.user as Obj)?.username,
                email: (item?.user as Obj)?.email,
                phone: (item?.user as Obj)?.phone,
                dateEnRoll: new Date((item as Obj)?.time),
                access: (item as Obj)?.access
            }
        })
        this.rowData = hi.filter((item: Obj) => item?.access === true) || [];
    }
    onConfirmRemoveStudent = (idStudent: string) => {
        this.props.CourcesAction({
            type: REMOVE_STUDENT_ENROLL_REQUEST,
            payload: {
                params: {
                    _idCourse: this.props.idCourse as string
                },
                body: {
                    studentId: idStudent
                }
            }
        })
        this.query = true;
    }
    onGridReady = () => {
        const btnPagina = document.querySelectorAll('.detail-students-table-teacher div.ag-paging-button');
        if (this.props.onDetail) {
            (btnPagina[0] as HTMLElement).innerHTML = '';
            (btnPagina[1] as HTMLElement).innerHTML = ' &#171; ';
            (btnPagina[2] as HTMLElement).innerHTML = ' &#187; ';
            (btnPagina[3] as HTMLElement).innerHTML = '';
        }
        this.gridRef.current?.api.sizeColumnsToFit();
    }
    shouldComponentUpdate(nextProps: Readonly<TableStudentsProps>, nextState: TableStudentsStates): boolean {
        if (this.gridRef.current) {
            this.gridRef.current.api.sizeColumnsToFit();
        }
        if (this.state.field !== nextState.field) {
            return true;
        }
        if ((nextProps.removeStudentEnroll !== this.props.removeStudentEnroll && nextProps.removeStudentEnroll)) {
            if (!nextProps.removeStudentEnroll.pending) {
                if ((nextProps.removeStudentEnroll.response as Obj)?.success) {
                    console.log('del')
                    if (this.query) {
                        Toaster.Success(`Xoá học sinh thành công`);
                        this.query = false;
                    }
                    this.props.CourcesAction({
                        type: REMOVE_STUDENT_ENROLL_CLEAR
                    })
                } else {
                    Toaster.Error(`Yêu cầu thất bại!`);
                }
            }
        }
        return false;
    }
    searchField = (field: SEARCH_FIELD, value: string | Date) => {
        let data;
        this.handleData(this.props.listStudent);
        switch (field) {
            case SEARCH_FIELD.NAME:
                data = this.rowData.filter((item) => {
                    return (item.name as string).toLowerCase().includes(value.toString().toLowerCase());
                });
                break;
            case SEARCH_FIELD.EMAIL:
                data = this.rowData.filter((item) => {
                    return (item.email as string).toLowerCase().includes(value.toString().toLowerCase());
                });
                break;
            case SEARCH_FIELD.SDT:
                data = this.rowData.filter((item) => {
                    return (item.phone as string).toLowerCase().includes(value.toString().toLowerCase());
                });
                break;
            case SEARCH_FIELD.DATE:
                data = this.rowData.filter((item) => {
                    return item.dateEnRoll === value;
                });
                break;
            default:
                data = this.rowData.filter((item) => {
                    return (item.name as string).toLowerCase().includes((value.toString()).toLowerCase());
                });
                break;
        }
        if (data.length === 0) {
            this.gridRef.current?.api.setRowData([]);
        } else {
            this.rowData = data;
            this.gridRef.current?.api.setRowData(this.rowData);
        }
        if (value.toString().trim() === '') {
            this.handleData(this.props.listStudent);
            this.gridRef.current?.api.setRowData(this.rowData);
        }
    }
    onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
        if (dateString.trim() === '') {
            this.handleData(this.props.listStudent);
            this.gridRef.current?.api.setRowData(this.rowData);
        } else {
            this.handleData(this.props.listStudent);
            this.rowData = this.rowData.filter((item: Obj) => {
                return formatDate(item.dateEnRoll, FORMAT_DATE.YMD) === dateString;
            })
            this.gridRef.current?.api.setRowData(this.rowData);
        }
    };
    render() {
        return (
            <div className="table">
                {this.props.onDetail && (<div className="search">
                    {this.state.field !== SEARCH_FIELD.DATE ? <Input placeholder="Nhập để tìm kiếm" className="input-search" size='small' onChange={(e) => {
                        this.setState({
                            ...this.state,
                            value: e.target.value
                        })
                        this.searchField(this.state.field, e.target.value);
                    }} /> : (<DatePicker onChange={this.onChangeDate} />)}
                    <div className="options">
                        <Radio.Group onChange={this.onChange} value={this.state.field}>
                            <Radio value={SEARCH_FIELD.NAME} >Họ tên</Radio>
                            <Radio value={SEARCH_FIELD.EMAIL} >Email</Radio>
                            <Radio value={SEARCH_FIELD.SDT} >SĐT</Radio>
                            <Radio value={SEARCH_FIELD.DATE} >Ngày tham gia</Radio>
                        </Radio.Group>
                    </div>
                </div>)}
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
                    pagination={this.props.onDetail}
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
    removeStudentEnroll: state.RemoveStudentEnrollReducer
})

const mapDispatchToProps = {
    CourcesAction
}

export default connect(mapStateToProps, mapDispatchToProps)(TableStudents)