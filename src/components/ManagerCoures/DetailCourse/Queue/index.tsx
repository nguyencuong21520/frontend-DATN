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

enum HandleRequest {
    ACCEPT = 'ACCEPT',
    DECLINE = 'DECLINE'
}
interface QueueClassCourseProps {

}
class QueueClassCourse extends Component<QueueClassCourseProps> {
    private gridRef: RefObject<AgGridReact>;
    private columnDefs: ColDef[] | ColGroupDef[];
    private rowData: Record<string, unknown>[];
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
                        this.onHandleRequest(params.data.name, HandleRequest.DECLINE);
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
                        this.onHandleRequest(params.data.name, HandleRequest.ACCEPT);
                    }}>
                        <PlusCircleOutlined className="blue" />
                    </Popconfirm>
                },
            },
        ];
        this.rowData = [
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
            {
                no: 1,
                name: 'Trịnh Thành Long',
                email: 'long@gmail.yahoo.com',
                phone: '0771223',
                dateRequire: new Date()
            },
        ]
    }
    onHandleRequest = (id: string, type: HandleRequest) => {

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

const mapStateToProps = (state: State) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(QueueClassCourse)