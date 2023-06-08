import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import styled from 'styled-components'
import { useState, useEffect, useRef,Fragment } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useAuth } from "../../../context/AuthContext";
import { collection,onSnapshot,doc, query, orderBy } from "firebase/firestore";
import { auth, db }  from '../../../firebase/firebase'
import RoutineChartList from "./RoutineCharts/RoutineChartList";
 
const RoutineTable = ({selectedRecordId}) => {
    const {addRoutineResult,updateRoutineResult,deleteRoutineResult} = useAuth()
    let emptyResult = {
        id: null,
        testDate:'',
        Bfast:'',
        Bpp:'',
        Lfast:'',
        Lpp:'',
        Dfast:'',
        Dpp:'',
        description:''
    };

    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState(JSON.parse(localStorage.getItem(`routinefile-${selectedRecordId}`)) || []);
    const [resultDialog, setResultDialog] = useState(false);
    const [deleteResultDialog, setDeleteResultDialog] = useState(false);
    const [deleteResultsDialog, setDeleteResultsDialog] = useState(false);
    const [result, setResult] = useState(emptyResult);
    const [selectedResults, setSelectedResults] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    // useEffect(() => {
    //     fetch('data/RoutineData.json').then(res => res.json()).then(d => setProducts(d.data));

    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        const unsub = onSnapshot(query(collection(doc(db, "allRoutineResult",auth.currentUser.uid),selectedRecordId),orderBy('testDate')), (docs) => {
            const rec = [];let l=1
            docs.forEach((doc) => {
                rec.push({...doc.data(),docId:doc.id,k:l++});
            });
            setResults(rec)
            selectedRecordId!==''?localStorage.setItem(`routinefile-${selectedRecordId}`, JSON.stringify(rec)):console.log();
        });
        return unsub;
      }, [selectedRecordId]);
   
    //   useEffect(() => {
    //     localStorage.setItem(`routinefile-${selectedRecordId}`, JSON.stringify(results));
    //   }, [`routinefile-${selectedRecordId}`]);
     

    const openNew = () => {
        setResult(emptyResult);
        setSubmitted(false);
        setResultDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setResultDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteResultDialog(false);
    }

    const hideDeleteProductsDialog = () => {
        setDeleteResultsDialog(false);
    }

    const saveResult = async () => {
        setSubmitted(true);
        if (result.testDate.trim()) {
            let _results = [...results];
            let _result = {...result};
            if (result.id) {
                const index = findIndexById(result.id);
                _results[index] = _result;
                try {
                    setLoading(true);
                    await updateRoutineResult(_result,selectedRecordId);
                    setLoading(false);
                } catch (error) {
                    console.log(error.message)
                }
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Entry Updated', life: 3000 });
            }
            else {
                _result.id = createId();
                _results.push(_result);
                try {
                    setLoading(true);
                    await addRoutineResult(_result,selectedRecordId);
                    setLoading(false);

                } catch (error) {
                    console.log(error.message)
                }
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Entry Created', life: 3000 });
            }

            setResults(_results);
            setResultDialog(false);
            setResult(emptyResult);
        }
    }

    const editResult = (product) => {
        setResult({...product});
        setResultDialog(true);
    }

    const confirmDeleteResult = (product) => {
        setResult(product);
        setDeleteResultDialog(true);
    }

    const deleteResult = async() => {
        try {
            await deleteRoutineResult(result.docId,selectedRecordId)
            console.log("Entire Document has been deleted successfully.")
        }
        catch(error) {
            console.log(error);
        }
        setDeleteResultDialog(false);
        setResult(emptyResult);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Entry Deleted', life: 3000 });
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < results.length; i++) {
            if (results[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const confirmDeleteSelected = () => {
        setDeleteResultsDialog(true);
    }

    const deleteSelectedResults = () => {
        let _multiRecords = results.filter(val => selectedResults.includes(val));
        try {
            console.log("Entire Document has been deleted successfully.")
            _multiRecords.forEach(i => {
                deleteRoutineResult(i.docId,selectedRecordId)
              });
        }
        catch(error) {
            console.log(error);
        }
        setDeleteResultsDialog(false);
        setSelectedResults(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Entries Deleted', life: 3000 });
    }

    

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...result};
        _product[`${name}`] = val;

        setResult(_product);
    }

    const leftToolbarTemplate = () => {
        return (
            <Fragment>
                <Button label="New" style={{height:'2em',marginRight: '1em'}} icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
                <Button label="Delete" style={{height:'2em'}} icon="pi pi-trash" className="p-button-danger" onClick={confirmDeleteSelected} disabled={!selectedResults || !selectedResults.length} />
                <Button label="Print" type="button" style={{height:'2em',marginRight: '1em',marginLeft: '1em'}} icon="pi pi-file-pdf" onClick={exportPdf} className="p-button-warning mr-2" data-pr-tooltip="PDF" />
            </Fragment>
        )
    }

    const cols = [
        // { field: 'id', header: 'ID' },
        { field: 'k', header: 'No.' },
        { field: 'testDate', header: 'Date' },
        { field: 'Bfast', header: 'Bfast' },
        { field: 'Bpp', header: 'Bpp' },
        { field: 'Lfast', header: 'Lfast' },
        { field: 'Lpp', header: 'Lpp' },
        { field: 'Dfast', header: 'Dfast' },
        { field: 'Dpp', header: 'Dpp' }
    ];
    const exportColumns = cols.map(col => ({ title: col.header, dataKey: col.field }));
    const exportPdf = () => {
        import('jspdf').then(jsPDF => {
            import('jspdf-autotable').then(() => {
                const doc = new jsPDF.default(0, 0);
                doc.autoTable(exportColumns, results);
                doc.save('Routine.pdf');
            })
        })
    }
    

    const actionBodyTemplate = (rowData) => {
        return (
            <Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2 p-0" style={{height:'2rem',width:'2rem',marginRight:'5px'}} onClick={() => editResult(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" style={{height:'2rem',width:'2rem'}} onClick={() => confirmDeleteResult(rowData)} />
            </Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Routine Record</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const recordDialogFooter = (
        <Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button disabled={loading} label="Save" icon="pi pi-check" className="p-button-text" onClick={saveResult} />
        </Fragment>
    );
    const deleteRecordDialogFooter = (
        <Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteResult} />
        </Fragment>
    );
    const deleteRecordsDialogFooter = (
        <Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteSelectedResults} />
        </Fragment>
    );
    
    return (
        <ListComp>
        <div className="datatable-crud-demo">
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-3" left={leftToolbarTemplate} 
                ></Toolbar>
                <DataTable size="small" showGridlines responsiveLayout="scroll" scrollHeight='500px' stripedRows
                    ref={dt} value={results} selection={selectedResults} onSelectionChange={(e) => setSelectedResults(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[10, 20,30, 50]}
                    paginatorTemplate="PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} results"
                    filterDisplay="menu" emptyMessage="No record found."
                    globalFilter={globalFilter} header={header} >
                    <Column  selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="k" header="No." sortable style={{ minWidth: '2rem',textAlign:'center' }}></Column>
                    <Column field="id" className="d-none" header="ID" sortable style={{ minWidth: '3rem' }}></Column>
                    <Column field="testDate" header="Date" sortable filter filterPlaceholder="Search by Date" style={{ minWidth: '9rem' }}></Column>
                    <Column field="Bfast" header="Bfast"  sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="Bpp" header="Bpp"  sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="Lfast" header="Lfast"  sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="Lpp" header="Lpp"  sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="Dfast" header="Dfast"  sortable style={{ minWidth: '5rem' }}></Column>
                    <Column field="Dpp" header="Dpp"  sortable style={{ minWidth: '5rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={resultDialog} style={{ width: '450px' }} header="Record Details" modal className="p-fluid" footer={recordDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="date">Date</label>
                    <InputText id="date" type='date' value={result.testDate} onChange={(e) => onInputChange(e, 'testDate')} required autoFocus className={classNames({ 'p-invalid': submitted && !result.Date })} />
                    {submitted && !result.testDate && <small className="p-error">Date is required.</small>}
                </div>
                

                <div className="formgrid grid">
                    <div className="row">
                        <div className="field col">
                            <label htmlFor="Bfast">Before BreakFast</label>
                            <InputText id="Bfast"  value={result.Bfast} onChange={(e) => onInputChange(e, 'Bfast')} required rows={3} cols={20} />
                        </div>
                        <div className="field col">
                            <label htmlFor="Bpp">After BreakFast</label>
                            <InputText id="Bpp"  value={result.Bpp} onChange={(e) => onInputChange(e, 'Bpp')} required rows={3} cols={20} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="field col">
                            <label htmlFor="Lfast">Before Lunch</label>
                            <InputText id="Lfast"  value={result.Lfast} onChange={(e) => onInputChange(e, 'Lfast')} required rows={3} cols={20} />
                        </div>
                        <div className="field col">
                            <label htmlFor="Lpp">Before Lunch</label>
                            <InputText id="Lpp"  value={result.Lpp} onChange={(e) => onInputChange(e, 'Lpp')} required rows={3} cols={20} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="field col">
                            <label htmlFor="Dfast">Before Dinner</label>
                            <InputText id="Dfast"  value={result.Dfast} onChange={(e) => onInputChange(e, 'Dfast')} required rows={3} cols={20} />
                        </div>
                        <div className="field col">
                            <label htmlFor="Dpp">Before Dinner</label>
                            <InputText id="Dpp"  value={result.Dpp} onChange={(e) => onInputChange(e, 'Dpp')} required rows={3} cols={20} />
                        </div>
                    </div>
                    <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={result.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
                </div>
                
            </Dialog>

            <Dialog visible={deleteResultDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRecordDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {result && <span>Are you sure you want to delete <b>{result.recordName}</b>?</span>}
                </div>
            </Dialog>

            <Dialog visible={deleteResultsDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteRecordsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {result && <span>Are you sure you want to delete the selected test results?</span>}
                </div>
            </Dialog>
            <RoutineChartList products={results}/>
        </div>
        </ListComp>
    );
}
                
export default RoutineTable;

const ListComp = styled.div`
width: 80%;
@media (max-width: 450px)  {
    width: 93%;
}
    h1, h2, h3, h4, h5, h6 {
    margin: 1.5rem 0 1rem 0;
    font-family: inherit;
    font-weight: 600;
    line-height: 1.2;
    color: inherit;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }
p {
    line-height: 1.5;
    margin: 0 0 1rem 0;
}

.card {
    margin-bottom: 2rem;
}

input[type="number"] {
    -moz-appearance: textfield;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}


/* .p-column-filter {
    width: 100%;
} */


.datatable-crud-demo .table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
@media screen and (max-width: 960px) {
    .datatable-crud-demo .table-header {
        align-items: flex-start;
    }
}
.datatable-crud-demo .product-image {
    width: 100px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
.datatable-crud-demo .p-dialog .product-image {
    width: 150px;
    margin: 0 auto 2rem auto;
    display: block;
}
.datatable-crud-demo .confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
    .datatable-crud-demo .p-toolbar {
        flex-wrap: wrap;
        overflow-x: scroll;
    }
    .datatable-crud-demo .p-toolbar::-webkit-scrollbar {
  width: 8px;     
  scroll-behavior: smooth;          /* width of the entire scrollbar */
}
    .datatable-crud-demo .p-toolbar .p-button {
        margin-bottom: 0.25rem;
    }
    .datatable-crud-demo .table-header {
        flex-direction: column;
    }
    .datatable-crud-demo .table-header .p-input-icon-left, .datatable-crud-demo .table-header input {
        width: 100%;
    }
}
                                

`