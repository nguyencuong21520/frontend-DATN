import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import { CellClickedEvent, ColDef } from 'ag-grid-community';
import { EyeOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { Obj } from '../../global/interface';
import { NoDataGrid } from '../NoDataGrid';
import { ReactComponent as Search } from '../../assets/svg/search.svg';
import './style.scss';

const SelectOption = ({ onChange, options }: { onChange(field: string): void, options: Array<Obj> }) => {
    return (
        <Select
            placeholder="Chọn thông tin"
            onChange={onChange}
            style={{ width: 120 }}
            options={options}
        />)
}
export const MangerCourses = () => {
    const navigate = useNavigate();
    const [fields, setFields] = useState<Obj>({
        _id: '',
        major: '',
        nameCourse: ''
    });
    const [options, setOptions] = useState(
        [
            {
                value: 'nameCourse',
                label: 'Tên khóa học',
                disabled: false,
            },
            {
                value: '_id',
                label: 'ID khóa học',
                disabled: false,
            },
            {
                value: 'major',
                label: 'Chuyên môn',
                disabled: false,
            },
        ]
    )
    const [listFilter, setListFilter] = useState<Array<React.ReactElement>>([]);
    const handleChangeFields = (field: string) => {
        setFields((prev) => {
            const mapField = {
                [field]: field
            }
            return mapField;
        })
    }
    const resetOptions = () => {
        setFields({
            _id: '',
            major: '',
            nameCourse: ''
        })
        setOptions((prev) => {
            return prev.map((item) => {
                return {
                    ...item,
                    disabled: false
                }
            })
        })
        setListFilter([]);
        gridRef.current?.api.setRowData(rowData);
    }
    const handleListFilter = () => {
        setListFilter((prev) => {
            return [...prev, <SelectOption onChange={handleChangeFields} options={options} />]
        })
    }
    const [columnDefs,] = useState<ColDef[]>([
        {
            field: 'no',
            headerName: 'STT',
            cellClass: 'cell',
            resizable: false,
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
            headerName: 'Tác giả',
            cellClass: 'cell',
            resizable: false,
        },
        {
            field: 'studentenroll',
            headerName: 'Tổng học sinh',
            headerClass: 'text-middle',
            cellClass: 'cell text-middle',
            resizable: false,
        },
        {
            cellClass: 'forward-detail',
            cellRenderer: () => {
                return <EyeOutlined />
            },
            onCellClicked: (params: CellClickedEvent) => {
                navigate(`/manager/${params.data.id}`, { replace: true })
            },
            maxWidth: 50
        }
    ])
    const [rowData,] = useState<Obj[]>([
        {
            no: 1,
            id: 'EXCELBA20001111',
            nameCourse: 'Exel',
            author: 'Ths. Nguyễn Văn Cường',
            studentenroll: 20,
        },
        {
            no: 2,
            id: 'EXCELBA20001111',
            nameCourse: 'Exel Av',
            author: 'Ths. Nguyễn Văn Cường',
            studentenroll: 20
        },
        {
            no: 3,
            id: 'EXCELBA20001111',
            nameCourse: 'Exel cơ bản',
            author: 'Ths. Nguyễn Văn Cường',
            studentenroll: 20
        },
        {
            no: 4,
            id: 'EXCELBA20001111',
            nameCourse: 'Exel cơ bản',
            author: 'Ths. Nguyễn Văn Cường',
            studentenroll: 20
        },
        {
            no: 5,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 6,
            id: 'Word Pro',
            nameCourse: 'Word cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 7,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
        {
            no: 8,
            id: 'Powerpoint Hub',
            nameCourse: 'PP cơ bản',
            author: 'Ths. Trần Đăng Khoa',
            studentenroll: 16
        },
    ]);
    const gridRef = useRef<AgGridReact>(null);
    const [rsSearch, setRsSearch] = useState<Obj[]>([]);
    const [valueSearch, setValueSearch] = useState<string>('');

    const handleSearch = () => {
        if (valueSearch.trim() !== '') {
            const rs = rowData.filter((item) => {
                return item.nameCourse.toLowerCase().includes(valueSearch.toLowerCase());
            })
            if (rs.length !== 0) {
                setRsSearch(rs);
            } else {
                gridRef.current?.api.setRowData([]);
                gridRef.current?.api.showNoRowsOverlay();
            }
        }
    }
    useEffect(() => {
        if (rsSearch.length !== 0) {
            gridRef.current?.api.setRowData(rsSearch);
        }
        window.addEventListener('resize', () => {
            gridRef.current?.api.sizeColumnsToFit();
        })

        return () => {
            window.removeEventListener('resize', () => {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                gridRef.current?.api.sizeColumnsToFit();
            })
        }
    }, [rsSearch])
    const onGridReady = () => {
        const btnPagina = document.querySelectorAll('div.ag-paging-button');
        (btnPagina[0] as HTMLElement).innerHTML = '';
        (btnPagina[1] as HTMLElement).innerHTML = ' &#171; ';
        (btnPagina[2] as HTMLElement).innerHTML = ' &#187; ';
        (btnPagina[3] as HTMLElement).innerHTML = '';
    }
    return (
        <div className="container-manager-courses">
            <div className="search">
                <Search />
                <input type="search" placeholder="Type for search" value={valueSearch} onChange={(e) => {
                    setValueSearch(e.target.value)
                }} />
                {listFilter.map((item, idx) => {
                    return <div key={idx}>{item}</div>
                })}
                <Button type="primary" onClick={() => {
                    if (listFilter.length < Object.keys(fields).length) {
                        handleListFilter();
                    }
                }}>&#43;Lọc</Button>
                <Button type="primary" onClick={() => { resetOptions() }}>Reset</Button>
                <Button type="primary" className="search" onClick={() => { handleSearch() }}><Search /></Button>
            </div>
            <div className="data-grid">
                <AgGridReact
                    ref={gridRef}
                    onGridReady={onGridReady}
                    headerHeight={32}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={{ resizable: true }}
                    suppressDragLeaveHidesColumns={true}
                    onViewportChanged={() => {
                        gridRef.current?.api.sizeColumnsToFit();
                    }}
                    animateRows={true}
                    pagination
                    paginationPageSize={3}
                    noRowsOverlayComponent={() => {
                        return <NoDataGrid />
                    }}
                ></AgGridReact>
            </div>
        </div>
    )
}
