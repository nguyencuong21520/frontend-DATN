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
import { useSelector } from 'react-redux';
import { State } from '../../redux-saga/reducer/reducer';
import { getData, useGetUser } from '../../utils/Hook';
import { useDispatch } from 'react-redux';
import { CourcesAction } from '../../redux-saga/course/action';
import { COURCES_REQUEST_GET_DATA } from '../../redux-saga/course/reducer';
import { USER } from '../../global/enum';

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
        gridRef.current?.api.setRowData(dataCourses);
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

    const gridRef = useRef<AgGridReact>(null);
    const [rsSearch, setRsSearch] = useState<Obj[]>([]);
    const [valueSearch, setValueSearch] = useState<string>('');
    const allCourses = useSelector((state: State) => state.Cources);
    const dataCourses = getData(allCourses);
    const [courseSelf, setCourseSelf] = useState<Obj[]>([]);
    const currentUser = useGetUser();
    const dispatch = useDispatch();

    const handleSearch = () => {
        if ((dataCourses as Obj[]).length > 0) {
            if (valueSearch.trim() !== '') {
                const rs = (dataCourses as Obj[])?.filter((item: Obj) => {
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
    }
    const getDataCourseSelf = () => {
        if (currentUser) {
            if (currentUser.role === USER.TEACHER && dataCourses) {
                const data = dataCourses.filter((item: Obj) => {
                    return (item.author as Obj)._id === currentUser._id;
                });
                setCourseSelf(data);
            }
        }
    }
    useEffect(() => {
        if (!dataCourses) {
            dispatch(CourcesAction({
                type: COURCES_REQUEST_GET_DATA,
            }))
        } else {
            getDataCourseSelf();
        }

    }, [dataCourses, dispatch, currentUser]);
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
    }, [rsSearch]);
    useEffect(() => {
        if (dataCourses) {
            console.log(courseSelf);
            gridRef.current?.api.setRowData(courseSelf);
        }
    }, [courseSelf])
    const onGridReady = () => {
        const btnPagina = document.querySelectorAll('div.ag-paging-button');
        (btnPagina[0] as HTMLElement).innerHTML = '';
        (btnPagina[1] as HTMLElement).innerHTML = ' &#171; ';
        (btnPagina[2] as HTMLElement).innerHTML = ' &#187; ';
        (btnPagina[3] as HTMLElement).innerHTML = '';
        gridRef.current?.api.showLoadingOverlay()
        if (dataCourses) {
            gridRef.current?.api.hideOverlay()
            getDataCourseSelf();
        }
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
