import React, { Component, RefObject } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Radio, Select } from 'antd';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Action, Obj } from '../../../global/interface';
import { State } from '../../../redux-saga/reducer/reducer';
import { NoDataGrid } from '../../NoDataGrid';
import { getData } from '../../../utils/Hook';
import { UserAction } from '../../../redux-saga/user/action';
import { GET_ALL_USER_REQUEST } from '../../../redux-saga/user/reducer';
import './style.scss';

interface CollectionUserProps {
    allUser: null | Obj | Record<string, unknown>;
    UserAction(payload: Action): void;
}
enum FilterUser {
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
    ADMIN = "ADMIN",
    ALL = "ALL",
}
enum FieldSearch {
    ID = '_id',
    USERNAME = 'username',
    EMAIL = 'email',
    PHONE = 'phone',
}
interface CollectionUserStates {
    option: FilterUser;
    fieldSearch: FieldSearch;
    valueSearch: string;
}
export class CollectionUser extends Component<CollectionUserProps, CollectionUserStates> {
    private gridRef: RefObject<AgGridReact>;
    private columnDefs: ColDef[] | ColGroupDef[];
    private rowData: Obj[] | Record<string, unknown>[];
    private filterData: Obj[] | Record<string, unknown>[] = [{}];
    constructor(props: CollectionUserProps) {
        super(props);
        this.gridRef = React.createRef();
        this.state = {
            option: FilterUser.ALL,
            fieldSearch: FieldSearch.ID,
            valueSearch: ''
        }
        this.rowData = getData(this.props.allUser)?.map((item: Obj, idx: number) => {
            return {
                ...item,
                no: idx + 1
            }
        }) || [{}];
        this.columnDefs = [
            {
                field: 'no',
                headerName: 'STT',
                cellClass: 'cell',
                resizable: false,
                maxWidth: 50
            },
            {
                field: '_id',
                headerName: 'Id',
                cellClass: 'cell',
                resizable: false,
            },
            {
                field: 'username',
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
                headerName: 'SĐT',
                cellClass: 'cell',
                resizable: false,
            },
            {
                field: 'role',
                headerName: 'Quyền',
                cellClass: 'cell',
                resizable: false,
                width: 130
            },
        ]
        if (!this.props.allUser) {
            this.queryDataAllUser();
        }
    }
    shouldComponentUpdate(nextProps: CollectionUserProps, nextState: CollectionUserStates): boolean {
        if (this.state.valueSearch !== nextState.valueSearch || this.state.fieldSearch !== nextState.fieldSearch) {
            return true;
        }
        if (this.props.allUser !== getData(nextProps.allUser) && (nextProps.allUser?.response as Obj)?.success) {
            this.rowData = getData(nextProps.allUser)?.map((item: Obj, idx: number) => {
                return {
                    ...item,
                    no: idx + 1
                }
            }) || [];
            this.gridRef.current?.api.setRowData(this.rowData);
        }
        if (this.state.option !== nextState.option) {
            if (nextState.option === FilterUser.ALL) {
                this.rowData = getData(this.props.allUser)?.map((item: Obj, idx: number) => {
                    return {
                        ...item,
                        no: idx + 1
                    }
                }) || [];
                this.gridRef.current?.api.setRowData(this.rowData);
            } else {
                this.filterData = this.rowData?.filter((item: Obj) => {
                    return item.role === nextState.option;
                })
                if (this.filterData.length === 0) {
                    this.gridRef.current?.api.setRowData(this.filterData);
                    return true;
                } else
                    this.gridRef.current?.api.setRowData(this.filterData);
            }
            return true;
        }

        return false;
    }
    queryDataAllUser = () => {
        this.props.UserAction({
            type: GET_ALL_USER_REQUEST
        });
        if (this.gridRef.current) {
            this.gridRef.current.api.showLoadingOverlay();
        }
    }
    handleChangeField = (value: FieldSearch) => {

        this.setState({
            ...this.state,
            fieldSearch: value
        })
    }
    handleReset = () => {
        this.setState({
            ...this.state,
            option: FilterUser.ALL
        })
    }
    handleSearch = () => {
        let tempFilter = this.filterData;
        switch (this.state.fieldSearch) {
            case FieldSearch.EMAIL:
                tempFilter = this.filterData.filter((item: Obj) => {
                    return item?.email.toLowerCase().includes(this.state.valueSearch.toLowerCase())
                })
                break;
            case FieldSearch.ID:
                tempFilter = this.filterData.filter((item: Obj) => {
                    return item?._id.toString().toLowerCase().includes(this.state.valueSearch.toLowerCase())
                })
                break;
            case FieldSearch.USERNAME:
                tempFilter = this.filterData.filter((item: Obj) => {
                    return item?.username.toLowerCase().includes(this.state.valueSearch.toLowerCase())
                })
                break;
            case FieldSearch.PHONE:
                tempFilter = this.filterData.filter((item: Obj) => {
                    return item?.phone.toLowerCase().includes(this.state.valueSearch.toLowerCase())
                })
                break;
            default:
                tempFilter = this.filterData.filter((item: Obj) => {
                    return item?._id.toString().toLowerCase().includes(this.state.valueSearch.toLowerCase())
                })
                break;
        }
        this.gridRef.current?.api.setRowData(tempFilter);
    }

    onGridReady = () => {
        const btnPagina = document.querySelectorAll('div.container-collection-user-admin div.table div.ag-paging-button');
        (btnPagina[0] as HTMLElement).innerHTML = '';
        (btnPagina[1] as HTMLElement).innerHTML = ' &#171; ';
        (btnPagina[2] as HTMLElement).innerHTML = ' &#187; ';
        (btnPagina[3] as HTMLElement).innerHTML = '';
        this.gridRef.current?.api.sizeColumnsToFit();
        this.gridRef.current?.api.showLoadingOverlay();
        if (this.props.allUser) {
            this.gridRef.current?.api.hideOverlay();
            this.rowData = getData(this.props.allUser).map((item: Obj, idx: number) => {
                return {
                    ...item,
                    no: idx + 1
                }
            }) || [];
            this.gridRef.current?.api.setRowData(this.rowData);
        }
    }
    render() {
        return (
            <div className='container-collection-user-admin'>
                <div className="header-fnc">
                    <div className="filter-option">
                        <strong>Lọc:</strong>
                        <br />
                        <Radio.Group value={this.state.option} className="option-radio" onChange={(e) => {
                            this.setState({
                                ...this.state,
                                option: e.target.value
                            })
                        }}>
                            <Radio value={FilterUser.ALL}>Tất cả</Radio>
                            <Radio value={FilterUser.STUDENT}>Học sinh</Radio>
                            <Radio value={FilterUser.TEACHER}>Giáo viên</Radio>
                            <Radio value={FilterUser.ADMIN}>Quản trị</Radio>
                        </Radio.Group>
                    </div>
                    <div className="search">
                        <Input onChange={(e) => {
                            this.setState({
                                ...this.state,
                                valueSearch: e.target.value
                            })
                        }} value={this.state.valueSearch} />
                        <Select
                            placeholder="Thông tin tìm kiếm"
                            defaultValue={this.state.fieldSearch}
                            style={{ width: 100 }}
                            onChange={this.handleChangeField}
                            options={[
                                {
                                    value: '_id',
                                    label: 'Id',
                                },
                                {
                                    value: 'username',
                                    label: 'Họ tên',
                                },
                                {
                                    value: 'email',
                                    label: 'Email',
                                },
                                {
                                    value: 'phone',
                                    label: 'SĐT',
                                },
                            ]} />
                        <Button onClick={() => {
                            this.handleSearch();
                        }}>Tìm kiếm</Button>
                        <Button onClick={() => { this.handleReset() }}>Mặc định</Button>
                    </div>
                </div>
                <div className="table">
                    {this.filterData.length === 0 && <NoDataGrid />}
                    <AgGridReact
                        ref={this.gridRef}
                        onGridReady={this.onGridReady}
                        headerHeight={32}
                        columnDefs={this.columnDefs}
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

const mapStateToProps = (state: State) => ({
    allUser: state.GetAllUserReducer
})

const mapDispatchToProps = {
    UserAction
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionUser)