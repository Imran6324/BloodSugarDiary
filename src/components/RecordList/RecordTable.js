import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { Dropdown } from "primereact/dropdown";
import styled from "styled-components";
import { useState, useEffect, useRef, Fragment } from "react";
import { classNames } from "primereact/utils";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  collection,
  onSnapshot,
  doc,
  query,
  orderBy,
  getDocs,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { Form } from "react-bootstrap";

const RecordTable = () => {
  const history = useNavigate();
  const { addRecord, updateRecord, deleteRecord, updateCurrentRecord } =
    useAuth();
  let emptyFile = {
    id: null,
    description: "",
    recordName: "",
    recordType: "",
    creationDate: "",
    lastUpdated: "",
  };
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState(
    JSON.parse(localStorage.getItem("record-list")) || null
  );
  const [recordDialog, setRecordDialog] = useState(false);
  const [deleteRecordDialog, setDeleteRecordDialog] = useState(false);
  const [deleteRecordsDialog, setDeleteRecordsDialog] = useState(false);
  const [record, setRecord] = useState(emptyFile);
  const [selectedRecords, setSelectedRecords] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(doc(db, "allRecord", auth.currentUser.uid), "records"),
        orderBy("creationDate", "desc")
      ),
      (docs) => {
        const rec = [];
        let l = 1;
        docs.forEach((doc) => {
          rec.push({ ...doc.data(), docId: doc.id, k: l++ });
        });
        if (rec) {
          setRecords(rec);
          localStorage.setItem("record-list", JSON.stringify(rec));
        } else setRecords(JSON.parse(localStorage.getItem("record-list")));
      }
    );
    return unsub;
  }, []);
  const [securedata, setSecuredata] = useState({});
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    getDocs(
      query(collection(db, "user"), where("uId", "==", auth.currentUser.uid))
    )
      .then((docs) =>
        docs.forEach((doc) => {
          // console.log(doc.data())
          setSecuredata({
            ques: doc.data().securityQ,
            ans: doc.data().securityA,
          });
        })
      )
      .catch((err) => console.log(err.message));
  }, [deleteRecordDialog]);
  const openNew = () => {
    setRecord(emptyFile);
    setSubmitted(false);
    setRecordDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setRecordDialog(false);
  };

  const hideDeleteRecordDialog = () => {
    setDeleteRecordDialog(false);
  };

  const hideDeleteRecordsDialog = () => {
    setDeleteRecordsDialog(false);
  };

  const saveRecord = async () => {
    setSubmitted(true);
    if (record.recordName.trim()) {
      let _records = [...records];
      let _record = { ...record };
      if (record.id) {
        const index = findIndexById(record.id);
        _records[index] = _record;
        try {
          setLoading(true);
          await updateRecord(_record);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Record Updated",
          life: 3000,
        });
      } else {
        _record.id = createId();
        _records.push(_record);
        try {
          setLoading(true);
          await addRecord(_record);
          setLoading(false);
        } catch (error) {
          console.log(error.message);
        }
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Record Created",
          life: 3000,
        });
      }

      setRecordDialog(false);
      setRecord(emptyFile);
    }
  };

  const editRecord = (result) => {
    setRecord({ ...result });
    setRecordDialog(true);
  };

  const confirmDeleteResult = (result) => {
    setRecord(result);
    setDeleteRecordDialog(true);
  };

  const deleteRecordFile = async () => {
    if (answer === securedata.ans && answer !== "") {
      try {
        console.log(record.docId);
        console.log("Entire Document has been deleted successfully.");
        await deleteRecord(record.docId);
        setAnswer("");
      } catch (error) {
        console.log(error.message);
      }
      setDeleteRecordDialog(false);
      setRecord(emptyFile);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Record Deleted",
        life: 3000,
      });
    } else if (answer === "")
      toast.current.show({
        severity: "error",
        summary: "Warning",
        detail: "Security answer cannot be empty",
        life: 3000,
      });
    else
      toast.current.show({
        severity: "error",
        summary: "Warning",
        detail: "Security answer not matched",
        life: 3000,
      });
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < records.length; i++) {
      if (records[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const confirmDeleteSelected = () => {
    setDeleteRecordsDialog(true);
  };

  const deleteSelectedRecords = () => {
    let _multiRecords = records.filter((val) => selectedRecords.includes(val));
    if (answer === securedata.ans && answer !== "") {
      try {
        console.log("Entire Document has been deleted successfully.");
        _multiRecords.forEach((i) => {
          deleteRecord(i.docId);
        });
      } catch (error) {
        console.log(error);
      }
      setDeleteRecordsDialog(false);
      setSelectedRecords(null);
      toast.current.show({
        severity: "success",
        summary: "Successful",
        detail: "Records Deleted",
        life: 3000,
      });
    } else if (answer === "")
      toast.current.show({
        severity: "error",
        summary: "Warning",
        detail: "Security answer cannot be empty",
        life: 3000,
      });
    else
      toast.current.show({
        severity: "error",
        summary: "Warning",
        detail: "Security answer not matched",
        life: 3000,
      });
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _record = { ...record };
    _record[`${name}`] = val;

    setRecord(_record);
  };

  const leftToolbarTemplate = () => {
    return (
      <Fragment>
        <Button
          label="New"
          style={{ height: "2em", marginRight: "1em" }}
          icon="pi pi-plus"
          className="p-button-success mr-2"
          onClick={openNew}
        />
        <Button
          label="Delete"
          style={{ height: "2em" }}
          icon="pi pi-trash"
          className="p-button-danger"
          onClick={confirmDeleteSelected}
          disabled={!selectedRecords || !selectedRecords.length}
        />
      </Fragment>
    );
  };

  const fileRoute = async (record, filename, id) => {
    try {
      await updateCurrentRecord(record, filename);
      history(
        `/${record === "Random" ? "random_record" : "routine_record"}/${id}`
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <Fragment>
        <Button
          icon="pi pi-folder"
          className="p-button-rounded p-button-success mr-2"
          style={{ height: "2rem", width: "2rem", marginRight: "5px" }}
          onClick={() =>
            fileRoute(
              rowData.recordType.name,
              rowData.recordName,
              rowData.docId
            )
          }
        />
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success mr-2"
          style={{ height: "2rem", width: "2rem", marginRight: "5px" }}
          onClick={() => editRecord(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          style={{ height: "2rem", width: "2rem" }}
          onClick={() => confirmDeleteResult(rowData)}
        />
      </Fragment>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">All Records</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value.toLower())}
          placeholder="Search..."
        />
      </span>
    </div>
  );
  const recordDialogFooter = (
    <Fragment>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        disabled={loading}
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveRecord}
      />
    </Fragment>
  );
  const deleteRecordDialogFooter = (
    <Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteRecordDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteRecordFile}
      />
    </Fragment>
  );
  const deleteRecordsDialogFooter = (
    <Fragment>
      <Button
        label="No"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDeleteRecordsDialog}
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        className="p-button-text"
        onClick={deleteSelectedRecords}
      />
    </Fragment>
  );

  return (
    <ListComp>
      <div className="datatable-crud-demo">
        <Toast ref={toast} />
        <div className="card">
          <Toolbar className="mb-3" left={leftToolbarTemplate}></Toolbar>
          <DataTable
            size="small"
            responsiveLayout="scroll"
            scrollHeight="500px"
            stripedRows
            ref={dt}
            value={records}
            selection={selectedRecords}
            onSelectionChange={(e) => setSelectedRecords(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[10, 20, 30, 50]}
            paginatorTemplate=" PrevPageLink PageLinks NextPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
            filterDisplay="menu"
            emptyMessage="No record found."
            globalFilter={globalFilter}
            header={header}
          >
            <Column
              selectionMode="multiple"
              headerStyle={{ width: "3rem" }}
              exportable={false}
            ></Column>
            <Column
              field="id"
              header="ID"
              className="d-none"
              sortable
              style={{ minWidth: "5rem" }}
            ></Column>
            <Column
              field="k"
              header="No."
              sortable
              style={{ minWidth: "5rem", textAlign: "center" }}
            ></Column>
            <Column
              field="recordName"
              header="Record Name"
              sortable
              filter
              filterPlaceholder="Search by name"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="recordType.name"
              header="Record Type"
              sortable
              filter
              filterPlaceholder="Search by type"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="creationDate"
              header="Creation Date"
              type="date"
              sortable
              filter
              filterPlaceholder="Search by creation date"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              field="lastUpdated"
              header="Last Accessed"
              type="date"
              sortable
              filter
              filterPlaceholder="Search by Last Accessed"
              style={{ minWidth: "12rem" }}
            ></Column>
            <Column
              body={actionBodyTemplate}
              exportable={false}
              style={{ minWidth: "8rem" }}
            ></Column>
          </DataTable>
        </div>

        <Dialog
          visible={recordDialog}
          style={{ width: "450px" }}
          header="Record Details"
          modal
          className="p-fluid"
          footer={recordDialogFooter}
          onHide={hideDialog}
        >
          <div className="field">
            <label htmlFor="name">Name</label>
            <InputText
              id="name"
              value={record.recordName}
              onChange={(e) => onInputChange(e, "recordName")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !record.recordName,
              })}
            />
            {submitted && !record.recordName && (
              <small className="p-error">Name is required.</small>
            )}
          </div>
          <div className="formgrid grid">
            <div className="field col">
              <label htmlFor="type">Record type</label>
              <Dropdown
                optionLabel="name"
                id="type"
                value={record.recordType}
                disabled={record.recordType ? true : false}
                options={[
                  { name: "Random", code: "ran" },
                  { name: "Routine", code: "rou" },
                ]}
                required
                // onChange={(e) => setrecordType(e.target.value)}
                onChange={(e) => onInputChange(e, "recordType")}
                placeholder={record.recordType}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="description">Description</label>
            <InputTextarea
              id="description"
              value={record.description}
              onChange={(e) => onInputChange(e, "description")}
              required
              rows={3}
              cols={20}
            />
          </div>
        </Dialog>

        <Dialog
          visible={deleteRecordDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteRecordDialogFooter}
          onHide={hideDeleteRecordDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {record && (
              <span>
                Are you sure you want to delete <b>{record.recordName}</b>?
              </span>
            )}
            <Form.Group className="mt-2">
              <Form.Label className="mt-2 text-center">
                Please verfiy the security question before delete record.
              </Form.Label>
              <Form.Label className="d-block mt-2">
                <b>{securedata.ques}</b>
              </Form.Label>
              <Form.Control
                type="Text"
                data-testid="answer"
                className="d-block mt-2"
                placeholder="answer"
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </Form.Group>
          </div>
        </Dialog>

        <Dialog
          visible={deleteRecordsDialog}
          style={{ width: "450px" }}
          header="Confirm"
          modal
          footer={deleteRecordsDialogFooter}
          onHide={hideDeleteRecordsDialog}
        >
          <div className="confirmation-content">
            <i
              className="pi pi-exclamation-triangle mr-3"
              style={{ fontSize: "2rem" }}
            />
            {record && (
              <span>Are you sure you want to delete the selected records?</span>
            )}
            <Form.Group className="mt-2">
              <Form.Label className="mt-2 text-center">
                Please verfiy the security question before delete record.
              </Form.Label>
              <Form.Label className="d-block mt-2">
                <b>{securedata.ques}</b>
              </Form.Label>
              <Form.Control
                type="Text"
                data-testid="answer"
                className="d-block mt-2"
                placeholder="answer"
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </Form.Group>
          </div>
        </Dialog>
      </div>
    </ListComp>
  );
};

export default RecordTable;

const ListComp = styled.div`
  width: 90%;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 1.5rem 0 1rem 0;
    font-family: inherit;
    font-weight: 600;
    line-height: 1.2;
    color: inherit;
  }

  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  h5 {
    font-size: 1.25rem;
  }
  h6 {
    font-size: 1rem;
  }
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
    width: 95%;
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
    }
    .datatable-crud-demo .p-toolbar .p-button {
      margin-bottom: 0.25rem;
    }
    .datatable-crud-demo .table-header {
      flex-direction: column;
    }
    .datatable-crud-demo .table-header .p-input-icon-left,
    .datatable-crud-demo .table-header input {
      width: 100%;
    }
  }
`;
