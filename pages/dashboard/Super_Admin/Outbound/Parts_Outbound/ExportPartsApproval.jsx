import { Switch, TextField } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";

import { useState } from "react";

import { useOutletContext } from "react-router-dom";
import CustomSelect from "../../../../../components/input-select/CustomSelect";
import SearchDateFilter from "../../SearchDateFilter";
import CustomTable from "../../../../../components/table/CustomTable";

const options = [
  { value: "Tarun", label: "Tarun" },
  { value: "Shalini", label: "Shalini" },
  { value: "Ritesh", label: "Ritesh" },
  { value: "Vivek", label: "Vivek" },
];
const rowsData = [
  {
    id: 1,
    Invoice: "123434531789",
    transporter: "Tarun",
    Machine: 35,
    date: "12/05/2023",
    LR: "001",
  },
  {
    id: 2,
    Invoice: "12341234389",
    transporter: "Vivek",
    Machine: 42,
    date: "13/05/2023",
    LR: "002",
  },
  {
    id: 3,
    Invoice: "123223456789",
    transporter: "Ritesh",
    Machine: 45,
    date: "15/05/2023",
    LR: "004",
  },
  {
    id: 4,
    Invoice: "1239987789",
    transporter: "Shalini",
    Machine: 16,
    date: "15/05/2023",
    LR: "002",
  },
  {
    id: 5,
    Invoice: "12329996789",
    transporter: "Tarun",
    Machine: null,
    date: "16/05/2023",
    LR: "011",
  },
];

const ExportPartsApproval = () => {
  const [showTable, setShowTable] = useState(false);

  const [rows, setRows] = useState(rowsData);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "transporter", headerName: "Transporter name", width: 150 },
    { field: "Invoice", headerName: "Invoice No.", width: 150 },
    {
      field: "Machine",
      headerName: "Machine No.",
      type: "number",
      width: 140,
    },
    {
      field: "date",
      headerName: "Invoice Date",
      type: "number",
      width: 140,
    },
    {
      field: "LR",
      headerName: "LR No.",
      type: "number",
      width: 140,
    },
  ];
  const [outletContext] = useOutletContext();
  const [userId, setUserId] = useState("");
  const userIdChangeHandler = (e) => {
    setUserId(e.target.value);
  };

  const [department, setDepartment] = useState("");
  const departmentChangeHandler = (e) => {
    setDepartment(e.target.value);
  };

  const searchClickHandler = () => {
    let filteredRows = rowsData;
    if (userId) {
      filteredRows = filteredRows.filter((row) =>
        row.transporter.toString().toLowerCase().includes(userId.toLowerCase())
      );
    }

    if (department) {
      filteredRows = filteredRows.filter((row) => {
        return (
          row.transporter.replace(REGEX.whitespace, "").toLowerCase() ===
          department.replace(REGEX.whitespace, "").toLowerCase()
        );
      });
    }
    setRows(filteredRows);
    setShowTable(true);
  };

  return (
    <div className="mt-3">
      <h3>Parts Outbound Export</h3>

      <div className="d-flex justify-content-evenly gap-1">
        <CustomSelect
          options={options}
          select={{
            value: userId,
            onChange: userIdChangeHandler,
          }}
          input={{ label: "Select Transporter" }}
        />
        {/* <h5>Invoice From:</h5> */}
        <SearchDateFilter
          select={{
            value: department,
            onChange: departmentChangeHandler,
          }}
        />
        {/* <h5>Invoice To:</h5>
        <SearchDateFilter
          select={{
            value: department,
            onChange: departmentChangeHandler,
          }}
        /> */}

        <Button variant="dark" onClick={searchClickHandler}>
          Search
        </Button>
      </div>
      {showTable && (
        <CustomTable
          divClass={"h-470px mt-4"}
          checkbox={false}
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          pageSize={5}
          columnWidth={161}
        />
      )}
    </div>
  );
};

export default ExportPartsApproval;
