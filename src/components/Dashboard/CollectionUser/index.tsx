import React, { Component, RefObject } from 'react';
import { connect } from 'react-redux';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Obj } from '../../../global/interface';
import { State } from '../../../redux-saga/reducer/reducer';
import { NoDataGrid } from '../../NoDataGrid';
import { getData } from '../../../utils/Hook';
import './style.scss';

interface CollectionUserProps {
    allUser: null | Obj | Record<string, unknown>;
}
interface CollectionUserStates { }
export class CollectionUser extends Component<CollectionUserProps, CollectionUserStates> {
    private gridRef: RefObject<AgGridReact>;
    private columnDefs: ColDef[] | ColGroupDef[];
    private rowData: Obj[] | Record<string, unknown>[];
    private filterData: Obj[] | Record<string, unknown>[];
    constructor(props: CollectionUserProps) {
        super(props);
        this.gridRef = React.createRef();
        this.rowData = [];
        this.columnDefs = [
            {
                field: 'no',
                headerName: 'STT',
                cellClass: 'cell',
                resizable: false,
                maxWidth: 50
            },
            {
                field: 'id',
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
                maxWidth: 70
            },
        ]
        this.filterData = [];
        console.log(getData(this.props.allUser));
    }
    shouldComponentUpdate(nextProps: CollectionUserProps, nextState: CollectionUserStates): boolean {

        return false;
    }

    onGridReady = () => {
        const btnPagina = document.querySelectorAll('div.container-collection-user-admin div.table div.ag-paging-button');
        (btnPagina[0] as HTMLElement).innerHTML = '';
        (btnPagina[1] as HTMLElement).innerHTML = ' &#171; ';
        (btnPagina[2] as HTMLElement).innerHTML = ' &#187; ';
        (btnPagina[3] as HTMLElement).innerHTML = '';
        this.gridRef.current?.api.sizeColumnsToFit();
    }
    render() {
        return (
            <div className='container-collection-user-admin'>
                <div className="header-fnc">


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

const mapStateToProps = (state: State) => ({
    allUser: state.GetAllUserReducer
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CollectionUser)