import React, { Component, RefObject } from 'react';
import { CellClickedEvent, ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { EyeOutlined } from '@ant-design/icons';
import { Button, Input, Select, RadioChangeEvent, Radio } from 'antd';
import { connect } from 'react-redux';
import { Obj } from '../../../global/interface';
import { State } from '../../../redux-saga/reducer/reducer';
import { NoDataGrid } from '../../NoDataGrid';
import { ReactComponent as Filters } from "../../../assets/svg/Filters.svg";
import './style.scss';

enum SORT_BY {
    LATEST = 'LASTEST',
    OLD = 'OLD',
    EXCEL = 'EXCEL',
    WORD = 'WORD',
    POWERPOINT = 'POWERPOINT',
}
interface CollectionCourseProps {
    navigate(path: string, options?: {
        replace?: boolean;
    }): void;
}
interface CollectionCourseStates {
    fieldSearch?: string;
    sortBy?: SORT_BY;
}

const optionsLevel = [
    {
        label: 'Cơ bản',
        value: 'BASIC'
    },
    {
        label: 'Nâng cao',
        value: 'ADVANCED'
    },
    {
        label: 'Chuyên sâu',
        value: 'INTENSIVE'
    },
]
const optionsTeacher = [
    {
        label: 'Trần Đăng Khoa',
        value: 'id0012321'
    },
    {
        label: 'Cường Nguyễn Văn',
        value: 'id0123213139934'
    },
]
class CollectionCourse extends Component<CollectionCourseProps, CollectionCourseStates> {
    private gridRef: RefObject<AgGridReact>;
    private columnDefs: ColDef[] | ColGroupDef[];
    private rowData: Obj[] | Record<string, unknown>[];
    private filterData: Obj[] | Record<string, unknown>[];
    constructor(props: CollectionCourseProps) {
        super(props);
        this.gridRef = React.createRef();
        this.rowData = [
            {
                no: 1,
                id: 'EXCELBA20001111',
                nameCourse: 'Exel',
                major: 'EXCEL',
                author: 'Ths. Nguyễn Văn Cường',
                studentenroll: 20,
                studentPending: 5
            },
            {
                no: 2,
                id: 'EXCELBA20001111',
                nameCourse: 'Exel Av',
                major: 'EXCEL',
                author: 'Ths. Nguyễn Văn Cường',
                studentenroll: 20,
                studentPending: 5
            },
            {
                no: 3,
                id: 'EXCELBA20001111',
                nameCourse: 'Exel cơ bản',
                major: 'EXCEL',
                author: 'Ths. Nguyễn Văn Cường',
                studentenroll: 20,
                studentPending: 5
            },
            {
                no: 4,
                id: 'EXCELBA20001111',
                nameCourse: 'Exel cơ bản',
                major: 'EXCEL',
                author: 'Ths. Nguyễn Văn Cường',
                studentenroll: 20,
                studentPending: 5
            },
            {
                no: 5,
                id: 'Powerpoint Hub',
                nameCourse: 'PP cơ bản',
                major: 'POWERPOINT',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 6,
                id: 'Word Pro',
                major: 'WORD',
                nameCourse: 'Word cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 7,
                id: 'Powerpoint Hub',
                nameCourse: 'PP cơ bản',
                major: 'POWERPOINT',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                major: 'POWERPOINT',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                major: 'POWERPOINT',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                major: 'POWERPOINT',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                major: 'POWERPOINT',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                nameCourse: 'PP cơ bản',
                major: 'POWERPOINT',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                major: 'POWERPOINT',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                major: 'POWERPOINT',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                major: 'POWERPOINT',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                major: 'POWERPOINT',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                major: 'POWERPOINT',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                nameCourse: 'PP cơ bản',
                major: 'POWERPOINT',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                nameCourse: 'PP cơ bản',
                major: 'POWERPOINT',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                major: 'POWERPOINT',
                id: 'Powerpoint Hub',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
            {
                no: 8,
                id: 'Powerpoint Hub',
                major: 'POWERPOINT',
                nameCourse: 'PP cơ bản',
                author: 'Ths. Trần Đăng Khoa',
                studentenroll: 16,
                studentPending: 1
            },
        ];
        this.columnDefs = [
            {
                field: 'no',
                headerName: 'STT',
                cellClass: 'cell',
                resizable: false,
                width: 20
            },
            {
                field: 'id',
                headerName: 'Id',
                cellClass: 'cell',
                resizable: false,
            },
            {
                field: 'nameCourse',
                headerName: 'Tên khóa',
                cellClass: 'cell',
                resizable: false,
            },
            {
                field: 'author',
                headerName: 'Giáo viên',
                cellClass: 'cell',
                resizable: false,
            },
            {
                field: 'studentenroll',
                headerName: 'Tổng học sinh',
                headerClass: 'text-middle',
                cellClass: 'cell text-middle',
                resizable: false,
                width: 100
            },
            {
                field: 'studentPending',
                headerName: 'Đợi duyệt vào lớp',
                headerClass: 'text-middle',
                cellClass: 'cell text-middle pending',
                resizable: false,
                width: 150
            },
            {
                cellClass: 'forward-detail',
                cellRenderer: () => {
                    return <EyeOutlined />
                },
                onCellClicked: (params: CellClickedEvent) => {
                    this.props.navigate(`/admin/collection/course/${params.data.id}`, { replace: true })
                },
                maxWidth: 50
            }
        ]
        this.filterData = [];
        this.state = {
            sortBy: SORT_BY.LATEST
        }
    }
    shouldComponentUpdate(nextProps: CollectionCourseProps, nextState: CollectionCourseStates): boolean {
        if (this.state.sortBy !== nextState.sortBy) {
            return true;
        }
        return false;
    }
    onChangeSortBy = (e: RadioChangeEvent) => {
        this.setState({
            ...this.state,
            sortBy: e.target.value
        });
        switch (e.target.value) {
            case SORT_BY.EXCEL:
            case SORT_BY.WORD:
            case SORT_BY.POWERPOINT:
                this.filterData = this.rowData.filter((item) => {
                    return item['major'] === e.target.value
                })
                break;
            default:
                this.filterData = [];
                break;
        }
        if (this.filterData.length !== 0) {
            this.gridRef.current?.api.setRowData(this.filterData);
        } else {
            this.gridRef.current?.api.setRowData(this.rowData);
        }
        console.log(this.filterData)
    };
    onGridReady = () => {
        const btnPagina = document.querySelectorAll('div.container-collection-course-admin div.table div.ag-paging-button');
        (btnPagina[0] as HTMLElement).innerHTML = '';
        (btnPagina[1] as HTMLElement).innerHTML = ' &#171; ';
        (btnPagina[2] as HTMLElement).innerHTML = ' &#187; ';
        (btnPagina[3] as HTMLElement).innerHTML = '';
    }
    render() {
        return (
            <div className='container-collection-course-admin'>
                <div className="header-fnc">
                    <div className="sort-handle">
                        <Filters /> Sắp xếp
                        <br />
                        <Radio.Group value={this.state.sortBy} className="option-radio" onChange={this.onChangeSortBy}>
                            <Radio value={SORT_BY.LATEST}>Mới nhất</Radio>
                            <Radio value={SORT_BY.OLD}>Cũ nhất</Radio>
                            <Radio value={SORT_BY.EXCEL}>Excel</Radio>
                            <Radio value={SORT_BY.WORD}>Word</Radio>
                            <Radio value={SORT_BY.POWERPOINT}>Powerpoint</Radio>
                        </Radio.Group>
                    </div>
                    <div style={{ display: 'flex', gap: '5px' }}>
                        <div className="field-filter">
                            <Input placeholder='Id khoá học' type='text' style={{ width: 200 }} />

                            <Select
                                id='select-level'
                                placeholder='Cấp độ'
                                style={{ width: 120 }}
                                options={optionsLevel}
                            />
                            <Select
                                id='select-teacher'
                                placeholder='Giáo viên'
                                style={{ minWidth: 150 }}
                                options={optionsTeacher}
                            />
                        </div>
                        <div className="btn-handle">
                            <Button>Tìm kiếm</Button>
                            <Button>Đặt lại</Button>
                        </div>
                    </div>
                </div>
                <div className="table">
                    <AgGridReact
                        ref={this.gridRef}
                        onGridReady={this.onGridReady}
                        headerHeight={32}
                        columnDefs={this.columnDefs}
                        rowData={this.rowData}
                        defaultColDef={{ resizable: true }}
                        suppressDragLeaveHidesColumns={true}
                        onViewportChanged={() => {
                            this.gridRef.current?.api.sizeColumnsToFit();
                        }}
                        animateRows={true}
                        pagination
                        paginationPageSize={10}
                        noRowsOverlayComponent={() => {
                            return <NoDataGrid />
                        }}
                    ></AgGridReact>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionCourse)