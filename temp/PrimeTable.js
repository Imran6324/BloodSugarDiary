import styled from 'styled-components'
import {useEffect,useState,React,useRef} from 'react'
import { DataTable } from 'primereact/datatable';//import data table component
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { records } from '../components/RecordList/data';
import { Button } from 'primereact/button';
import { Ripple } from 'primereact/ripple';
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Toast } from 'primereact/toast';

const TableR = () => {
    const [products, setProducts] = useState([])
    const [selectedProduct1, setSelectedProduct1] = useState(null);
    const filters = {
        'name': { value: null
            // ,matchMode: FilterMatchMode.STARTS_WITH 
        }
    }
    useEffect(() => {
        setProducts(records)
    }, [])
    const onEditorValueChange = (props, value) => {
        let updatedProducts = [...props.value];
        updatedProducts[props.rowIndex][props.field] = value;
        setProducts(updatedProducts);
    }
    const toast = useRef(null);
    
    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    }
    
    const onRowSelect = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Selected', detail: `Name: ${'hello'}`, life: 3000 });
    }

    const onRowUnselect = (event) => {
        toast.current.show({ severity: 'warn', summary: 'Product Unselected', detail: `Name: ${'hello'}`, life: 3000 });
    }
    
    const [first1, setFirst1] = useState(0);
    const [rows1, setRows1] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageInputTooltip, setPageInputTooltip] = useState('Press \'Enter\' key to go to this page.');
    const onCustomPage1 = (event) => {
        setFirst1(event.first);
        setRows1(event.rows);
        setCurrentPage(event.page + 1);
    }
    const onPageInputKeyDown = (event, options) => {
        if (event.key === 'Enter') {
            const page = parseInt(currentPage);
            if (page < 1 || page > options.totalPages) {
                setPageInputTooltip(`Value must be between 1 and ${options.totalPages}.`);
            }
            else {
                const first = currentPage ? options.rows * (page - 1) : 0;

                setFirst1(first);
                setPageInputTooltip('Press \'Enter\' key to go to this page.');
            }
        }
    }

    const onPageInputChange = (event) => {
        setCurrentPage(event.target.value);
    }
    const template1 = {
        layout: 'PrevPageLink PageLinks NextPageLink RowsPerPageDropdown CurrentPageReport',
        'PrevPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Previous</span>
                    <Ripple />
                </button>
            )
        },
        'NextPageLink': (options) => {
            return (
                <button type="button" className={options.className} onClick={options.onClick} disabled={options.disabled}>
                    <span className="p-3">Next</span>
                    <Ripple />
                </button>
            )
        },
        'PageLinks': (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });

                return <span className={className} style={{ userSelect: 'none' }}>...</span>;
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick}>
                    {options.page + 1}
                    <Ripple />
                </button>
            )
        },
        'RowsPerPageDropdown': (options) => {
            const dropdownOptions = [
                { label: 10, value: 10 },
                { label: 20, value: 20 },
                { label: 50, value: 50 },
                { label: 'All', value: options.totalRecords }
            ];

            return <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />;
        },
        'CurrentPageReport': (options) => {
            return (
                <span className="mx-3" style={{ color: 'var(--text-color)', userSelect: 'none' }}>
                    Go to <InputText size="2" className="ml-1" value={currentPage} tooltip={pageInputTooltip}
                        onKeyDown={(e) => onPageInputKeyDown(e, options)} onChange={onPageInputChange}/>
                </span>
            )
        }
    };
    
    const onRowEditComplete1 = (e) => {
        let _products2 = [...products];
        let { newData, index } = e;

        _products2[index] = newData;

        setProducts(_products2);
    }


    
    return (
        <ReadComp>
            <div className="card">
                <h5>Filter Menu</h5>
                <p>Filters are displayed in an overlay.</p>
            <DataTable  responsiveLayout="scroll" scrollHeight='400px' stripedRows value={products}  header="All records" size="small"
            selection={selectedProduct1} selectionMode="checkbox"  onSelectionChange={e => setSelectedProduct1(e.value)} dataKey="id" 
            //   paginator rows={10} first={first} onPage={(e) => setFirst(e.first)}
            paginator paginatorTemplate={template1} first={first1} rows={rows1} onPage={onCustomPage1}
            editMode="row" onRowEditComplete={onRowEditComplete1}
            filters={filters} filterDisplay="menu"
            globalFilterFields={['id', 'recordName', 'creationDate', 'lastUpadted']}  emptyMessage="No record found."
            >
                <Column selectionMode="multiple" />
                <Column filter   key={"id"} filterPlaceholder="Search by id" sortable dataType={"numeric"} field={"id"} header={"ID"} />
                <Column editor={(options) => textEditor(options)} filter key={"recordName"} filterPlaceholder="Search by name" sortable dataType={"string"} field={"recordName"} header={"Record Name"} />
                <Column  filter   key={"recordName"} filterPlaceholder="Search by name" sortable dataType={"date"} field={"creationDate"} header={"Creation Date"} />
                <Column  filter   key={"creationDate"} filterPlaceholder="Search by created date" sortable dataType={"date"} field={"lastUpadted"} header={"Last Updated"} />
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '4rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
            </DataTable>
            </div>
        </ReadComp>
    );
}

export default TableR


const ReadComp = styled.div`
.datatable-filter-demo .p-paginator .p-paginator-current {
    margin-left: auto;
}
.datatable-filter-demo .p-progressbar {
    height: 0.5rem;
    background-color: #d8dadc;
}
.datatable-filter-demo .p-progressbar .p-progressbar-value {
    background-color: #607d8b;
}
.datatable-filter-demo .p-datepicker {
    min-width: 25rem;
}
.datatable-filter-demo .p-datepicker td {
    font-weight: 400;
}
.datatable-filter-demo .p-datatable.p-datatable-customers .p-datatable-header {
    padding: 1rem;
    text-align: left;
    font-size: 1.5rem;
}
.datatable-filter-demo .p-datatable.p-datatable-customers .p-paginator {
    padding: 1rem;
}
.datatable-filter-demo .p-datatable.p-datatable-customers .p-datatable-thead > tr > th {
    text-align: left;
}
.datatable-filter-demo .p-datatable.p-datatable-customers .p-datatable-tbody > tr > td {
    cursor: auto;
}
.datatable-filter-demo .p-datatable.p-datatable-customers .p-dropdown-label:not(.p-placeholder) {
    text-transform: uppercase;

}
.datatable-editing-demo .editable-cells-table td.p-cell-editing {
    padding-top: 0;
    padding-bottom: 0;
}
     
`