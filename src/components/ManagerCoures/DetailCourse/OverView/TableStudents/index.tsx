import React, { Component, RefObject } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { connect } from 'react-redux';
import { Input, Popconfirm } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Radio, DatePickerProps, DatePicker } from 'antd';
import { CellClickedEvent, ColDef, ColGroupDef, ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { State } from '../../../../../redux-saga/reducer/reducer';
import { FORMAT_DATE } from '../../../../../global/enum';
import { formatDate } from '../../../../../utils/date';
import { NoDataGrid } from '../../../../NoDataGrid';
import './style.scss';
import { MessageOutlined, RollbackOutlined } from '@ant-design/icons';

enum SEARCH_FIELD {
    NAME = 'NAME',
    EMAIL = 'EMAIL',
    SDT = 'SDT',
    DATE = 'DATE',
}
interface TableStudentsProps {
    onDetail?: boolean
}
interface TableStudentsStates {
    field: SEARCH_FIELD;
    value: string | Date;
}
const initData = [
    {
        no: 1,
        name: 'Trần Đăng Khoa',
        email: 'k@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 2,
        name: 'Nguyễn Văn Cường',
        email: 'kcuon@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 3,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 4,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 4,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 4,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 4,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 4,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 4,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 4,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 4,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 4,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
    {
        no: 4,
        name: 'Nguyễn Văn Cường',
        email: 'cường@gmail.com',
        phone: '035882112',
        dateEnRoll: new Date()
    },
]
class TableStudents extends Component<TableStudentsProps, TableStudentsStates> {
    private gridRef: RefObject<AgGridReact>;
    private columnDefs: ColDef[] | ColGroupDef[];
    private rowData: Record<string, unknown>[];

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
                    window.open(`${process.env.REACT_APP_HOST}:3000/messenger/${params.data.name}`)
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
                            this.onConfirmRemoveStudent(params.data.name);
                        }}>
                            <RollbackOutlined className="roll-back" />
                        </Popconfirm>
                    )
                },
                maxWidth: 50
            }
        ]
        this.rowData = initData
    }
    onChange = (e: RadioChangeEvent) => {
        this.setState({
            ...this.state,
            field: e.target.value
        })
        this.searchField(e.target.value, this.state.value);
    };
    onConfirmRemoveStudent = (idStudent: string) => {
        console.log('id student:', idStudent);
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
        return false;
    }
    searchField = (field: SEARCH_FIELD, value: string | Date) => {
        let data;
        switch (field) {
            case SEARCH_FIELD.NAME:
                data = initData.filter((item) => {
                    return (item.name as string).toLowerCase().includes(value.toString().toLowerCase());
                });
                break;
            case SEARCH_FIELD.EMAIL:
                data = initData.filter((item) => {
                    return (item.email as string).toLowerCase().includes(value.toString().toLowerCase());
                });
                break;
            case SEARCH_FIELD.SDT:
                data = initData.filter((item) => {
                    return (item.phone as string).toLowerCase().includes(value.toString().toLowerCase());
                });
                break;
            case SEARCH_FIELD.DATE:
                data = initData.filter((item) => {
                    return item.dateEnRoll === value;
                });
                break;
            default:
                data = initData.filter((item) => {
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
            this.rowData = initData;
            this.gridRef.current?.api.setRowData(this.rowData);
        }
    }
    onChangeDate: DatePickerProps['onChange'] = (_, dateString) => {
        if (dateString.trim() === '') {
            this.rowData = initData;
            this.gridRef.current?.api.setRowData(this.rowData);
        } else {
            this.rowData = initData.filter((item) => {
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

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(TableStudents)