import { Button } from "react-bootstrap";

import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useOutletContext } from "react-router-dom";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import CustomTable from "../../../../components/table/CustomTable";
import CustomSelect from "../../../../components/input-select/CustomSelect";
import { getAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";

const ReportsExportMachine = () => {
  const [showTable, setShowTable] = useState(false);
  const [transporterOptions, setTransporterOptions] = useState([]);
  const [status, setStatus] = useState("");
  const [statusOptions, setStatusOptions] = useState([]);

  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);

  const handleExportExcel = () => {
    const data = filterRows.map((row) => ({
      ID: row.id,

      "Transporter name": row.transporter,
      "Invoice No.": row.Invoice,
      "Machine No.": row.Machine,
      "Invoice Date": row.date,
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
  const columns = [
    { field: "id", headerName: "SNo.", width: 50 },
    {
      field: "transporter",
      headerName: "Transporter name",
      width: 134,
    },
    { field: "Invoice", headerName: "Invoice No.", width: 95 },
    {
      field: "Machine",
      headerName: "Machine No.",
      type: "number",

      width: 105,
    },
    {
      field: "charge",
      headerName: "M3Freight charge",
      type: "number",

      width: 145,
    },
    {
      field: "lr",
      headerName: "LR Number",
      type: "number",

      width: 90,
    },
    {
      field: "bill",
      headerName: "Total Bill Amount",
      type: "number",

      width: 130,
    },
    {
      field: "date",
      headerName: "Invoice Date",
      type: "number",

      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",

      width: 120,
    },
  ];
  const [outletContext] = useOutletContext();
  const [userId, setUserId] = useState("");
  const userIdChangeHandler = (e) => {
    setUserId(e.target.value);
  };

  const resetClickHandler = () => {
    setUserId("");
    setStatus("");
    setDepartment("");
    setCharge("");
    setNumber("");
    setAmount("");
    setStartDate("");
    setEndDate("");
    setFilterRows(rows);
  };

  const [department, setDepartment] = useState("");
  const departmentChangeHandler = (e) => {
    setDepartment(e.target.value);
  };
  const [charge, setCharge] = useState("");
  const chargeChangeHandler = (e) => {
    setCharge(e.target.value);
  };
  // const [bill, setBill] = useState("");
  // const billChangeHandler = (e) => {
  //   setBill(e.target.value);
  // };
  const [number, setNumber] = useState("");
  const numberChangeHandler = (e) => {
    setNumber(e.target.value);
  };
  const [amount, setAmount] = useState("");
  const amountChangeHandler = (e) => {
    setAmount(e.target.value);
  };

  const searchClickHandler = () => {
    let filteredRows = rows;

    if (userId) {
      filteredRows = filteredRows.filter((row) =>
        row.transporter.toString().toLowerCase().includes(userId.toLowerCase())
      );
    }
    if (charge) {
      filteredRows = filteredRows.filter((row) =>
        row.charge.toString().includes(charge)
      );
    }
    if (number) {
      filteredRows = filteredRows.filter((row) =>
        row.lr.toString().includes(number)
      );
    }
    if (amount) {
      filteredRows = filteredRows.filter((row) =>
        row.bill.toString().includes(amount)
      );
    }

    if (status) {
      filteredRows = filteredRows.filter((row) =>
        row.status.toString().toLowerCase().includes(status.toLowerCase())
      );
    }
    if (startDate && endDate) {
      filteredRows = filteredRows.filter((row) => {
        const invoiceDate = new Date(row.date);
        const start = new Date(startDate);
        const end = new Date(endDate);
        return invoiceDate >= start && invoiceDate <= end;
      });
    }
    setFilterRows(filteredRows);
    setShowTable(true);
  };

  useEffect(() => {
    const getDomestic = async () => {
      try {
        const response = await getAPI(apiEndpoints.getAlInvoiceDataEM);

        const transporters = response?.data?.data || [];
        const status = response?.data?.data || [];
        const options = transporters

          .map((transporter) => {
            return {
              value: transporter.transporterName,
              label: transporter.transporterName,
            };
          })
          .filter(
            (option, index, self) =>
              index ===
              self.findIndex(
                (o) => o.value === option.value && o.label === option.label
              )
          );

        const statusOptions = status
          .map((transporter) => {
            return {
              value: transporter.status,
              label: transporter.status,
            };
          })
          .filter(
            (option, index, self) =>
              index ===
              self.findIndex(
                (o) => o.value === option.value && o.label === option.label
              )
          );

        setTransporterOptions(options);
        setStatusOptions(statusOptions);

        const rowData =
          response?.data?.data?.map((itm) => ({
            id: itm?.id,
            Invoice: itm?.invoiceNum,
            transporter: itm?.transporterName,
            Machine: itm.items !== null ? itm?.items[0]?.machineNo : "N/A",
            date: itm?.invoiceDate,
            status: itm?.status,
            charge: itm?.m3FreightCharge,
            lr: itm?.blnumber,
            bill: itm?.totalBillAmount,
          })) ?? [];

        setRows(rowData);
        setFilterRows(rowData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getDomestic();
  }, [getAPI]);

  return (
    <div className="mt-3">
      <h3>Machine Outbound Export</h3>

      <div className="d-flex justify-content-evenly gap-1">
        <CustomSelect
          // options={options}
          options={transporterOptions}
          select={{
            value: userId,
            onChange: userIdChangeHandler,
          }}
          input={{ label: "Select Transporter" }}
        />
        <CustomSelect
          options={statusOptions}
          select={{
            value: status,
            onChange: (e) => setStatus(e.target.value),
          }}
          input={{ label: "Select Status" }}
        />
        <TextField
          label="M3Freight Charge"
          variant="outlined"
          value={charge}
          onChange={chargeChangeHandler}
        />

        <TextField
          label="LR Number"
          variant="outlined"
          value={number}
          onChange={numberChangeHandler}
        />

        <TextField
          label="Total Bill Amount"
          variant="outlined"
          value={amount}
          onChange={amountChangeHandler}
        />
      </div>
      <br />
      <div className="d-flex justify-content-evenly gap-1">
        {" "}
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
        />{" "}
        <Button variant="dark" onClick={searchClickHandler}>
          Search
        </Button>
        <Button variant="danger" onClick={resetClickHandler}>
          Reset
        </Button>
        <Button variant="success" onClick={handleExportExcel}>
          Export to Excel
        </Button>
      </div>

      <CustomTable
        divClass={"h-470px mt-4"}
        checkbox={false}
        // rows={rows}
        rows={filterRows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        pageSize={10}
        columnWidth={105}
      />

      <br />
    </div>
  );
};

export default ReportsExportMachine;
