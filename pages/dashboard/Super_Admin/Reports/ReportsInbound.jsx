import { Switch, TextField } from "@mui/material";
import { Button } from "react-bootstrap";

import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { useOutletContext } from "react-router-dom";
import CustomTable from "../../../../components/table/CustomTable";
import CustomSelect from "../../../../components/input-select/CustomSelect";
import { getAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";

function ReportsInbound() {
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);

  const [status, setStatus] = useState("");
  const [billOptions, setBillOptions] = useState([]);
  const handleExportExcel = () => {
    const data = filterRows.map((row) => ({
      ID: row.id,
      "Supplier Name": row.SupplierN,
      "PO Number": row.PoName,
      "PO Date": row.PoDate,
      "GRN No.": row.GRN,
      "Supplier Invoice No.": row.Supplier,
      "GRN Date": row.GRNDate,
      "Transport Bill No.": row.Bill,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });

    const fileName = "table.xlsx";
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, fileName);
  };

  const columns = [
    {
      field: "SupplierN",
      headerName: "Supplier Name",
      minWidth: 115,
    },
    {
      field: "PoName",
      headerName: "PO Number",
      minWidth: 120,
    },
    {
      field: "PoDate",
      headerName: "PO Date",
      minWidth: 110,
    },
    {
      field: "GRN",
      headerName: "GRN No.",
      minWidth: 97,
    },
    {
      field: "Supplier",
      headerName: "Supplier Invoice No.",
      minWidth: 149,
    },
    {
      field: "GRNDate",
      headerName: "Invoice Date",
      minWidth: 125,
    },
    {
      field: "Bill",
      headerName: "Transport Bill No.",
      minWidth: 135,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 115,
    },
  ];
  const [outletContext] = useOutletContext();
  const [userId, setUserId] = useState("");
  const userIdChangeHandler = (e) => {
    setUserId(e.target.value);
  };
  // const [bill, setBill] = useState("");
  // const billChangeHandler = (e) => {
  //   setBill(e.target.value);
  // };
  const [username, setUsername] = useState("");
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const [department, setDepartment] = useState("");
  const departmentChangeHandler = (e) => {
    setDepartment(e.target.value);
  };
  const [poNumber, setPoNumber] = useState("");
  const poNumberChangeHandler = (e) => {
    setPoNumber(e.target.value);
  };
  const [startDate, setStartDate] = useState(null);
  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
  };

  const [endDate, setEndDate] = useState(null);
  const handleEndDateChange = (e) => {
    const date = e.target.value;
    setEndDate(date);
  };
  const resetClickHandler = () => {
    setUserId("");
    setUsername("");
    setDepartment("");
    // setBill("");
    setStatus("");
    setPoNumber("");
    setStartDate("");
    setEndDate("");
    setFilterRows(rows);
  };
  const searchClickHandler = () => {
    let filteredRows = rows;

    if (userId) {
      filteredRows = filteredRows.filter((row) =>
        row.SupplierN.toLowerCase().includes(userId.toLowerCase())
      );
    }

    if (username) {
      filteredRows = filteredRows.filter((row) =>
        row.GRN.toLowerCase().includes(username.toLowerCase())
      );
    }

    if (status) {
      filteredRows = filteredRows.filter((row) =>
        row.status.toLowerCase().includes(status.toLowerCase())
      );
    }

    if (department) {
      filteredRows = filteredRows.filter((row) =>
        row.Bill.toLowerCase().includes(department.toLowerCase())
      );
    }

    if (poNumber) {
      filteredRows = filteredRows.filter((row) =>
        row.PoName.toLowerCase().includes(poNumber.toLowerCase())
      );
    }

    if (startDate && endDate) {
      filteredRows = filteredRows.filter((row) => {
        const invoiceDate = new Date(row.GRNDate);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return invoiceDate >= start && invoiceDate <= end;
      });
    }

    setFilterRows(filteredRows);
  };

  useEffect(() => {
    const getInboundApprovalData = async () => {
      try {
        const response = await getAPI(apiEndpoints.getAllInbondDataReports);
        const billOptions = response?.data?.data
          ?.map((transporter) => ({
            value: transporter.status,
            label: transporter.status,
          }))
          .filter(
            (option, index, self) =>
              index ===
              self.findIndex(
                (o) => o.value === option.value && o.label === option.label
              )
          );

        setBillOptions(billOptions);

        const rowData =
          response?.data?.data?.map((itm) => ({
            id: itm?.id,
            SupplierN: itm?.supplierName,
            PoName: itm?.poNumber,
            PoDate: itm?.poDate,
            GRN: itm?.grnNumber,
            Supplier: itm?.supplierInvoiceNumber,
            GRNDate: itm?.grnDate,
            Bill: itm?.transportBillNumber,
            status: itm?.status,
          })) ?? [];

        setRows(rowData);
        setFilterRows(rowData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getInboundApprovalData();
  }, []);
  return (
    <div className="mt-2">
      <h3>Inbound Approved</h3>

      <div className="d-flex justify-content-center gap-2">
        <TextField
          label="Supplier Name"
          variant="outlined"
          value={userId}
          onChange={userIdChangeHandler}
        />

        <TextField
          label="GRN No. Search"
          variant="outlined"
          value={username}
          onChange={usernameChangeHandler}
        />

        <TextField
          label="Bill Number"
          variant="outlined"
          value={department}
          onChange={departmentChangeHandler}
        />

        {/* <TextField
          label="PO Number"
          variant="outlined"
          value={poNumber}
          onChange={poNumberChangeHandler}
        /> */}
        <Button variant="success" onClick={handleExportExcel}>
          Export to Excel
        </Button>
      </div>
      <br />
      <div className="d-flex justify-content-center gap-2">
        {" "}
        <CustomSelect
          options={billOptions}
          select={{
            value: status,
            onChange: (e) => setStatus(e.target.value),
          }}
          input={{ label: "Status" }}
        />
        <TextField
          fullWidth
          sx={{ width: 200 }}
          type="date"
          id="start-date"
          name="start-date"
          value={startDate || ""}
          onChange={handleStartDateChange}
        />
        <TextField
          fullWidth
          sx={{ width: 200 }}
          type="date"
          id="end-date"
          name="end-date"
          value={endDate || ""}
          onChange={handleEndDateChange}
        />
        <Button variant="dark" onClick={searchClickHandler}>
          Search
        </Button>
        <Button variant="danger" onClick={resetClickHandler}>
          Reset
        </Button>
      </div>
      <CustomTable
        divClass="h-470px mt-4"
        checkbox={false}
        rows={filterRows}
        columns={columns}
        pageSizeOptions={[10, 25, 100]}
        pageSize={10}
        columnWidth={138}
      />
    </div>
  );
}

export default ReportsInbound;
