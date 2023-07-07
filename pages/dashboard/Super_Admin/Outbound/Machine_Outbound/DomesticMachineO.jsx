import { Button } from "react-bootstrap";

import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import CustomSelect from "../../../../../components/input-select/CustomSelect";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import CustomTable from "../../../../../components/table/CustomTable";
import { getAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";

const DomesticMachineO = () => {
  const [showTable, setShowTable] = useState(false);
  const [transporterOptions, setTransporterOptions] = useState([]);

  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
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
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "transporter",
      headerName: "Transporter name",
      width: 190,
      renderCell: (param) => (
        <span
          className="pointer text-primary"
          onClick={() => {
            const user = filterRows.filter(
              (data) =>
                data.transporter === param.row.transporter ||
                data.date === param.row.date
            );

            outletContext.setActiveTab(22);
            outletContext.setOutbound(user);
          }}
        >
          {param.row.transporter}
        </span>
      ),
    },
    { field: "Invoice", headerName: "Invoice No.", width: 190 },
    {
      field: "Machine",
      headerName: "Machine No.",
      type: "number",

      width: 180,
    },
    {
      field: "date",
      headerName: "Invoice Date",
      type: "number",

      width: 180,
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
    let filteredRows = rows;
    if (userId) {
      filteredRows = filteredRows.filter((row) =>
        row.transporter.toString().toLowerCase().includes(userId.toLowerCase())
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
  const findUserData = (id) => {
    return allUsers.filter((user) => user.id === id)[0];
  };

  useEffect(() => {
    const getDomestic = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getInvoicesByStatusDomestic}fresh`
        );

        const transporters = response?.data?.data || [];

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

        setTransporterOptions(options);

        setAllUsers(response?.data?.data);

        const rowData =
          response?.data?.data?.map((itm) => ({
            id: itm?.id,
            Invoice: itm?.invoiceNum,
            transporter: itm?.transporterName,
            Machine: itm.items !== null ? itm?.items[0]?.machineNo : "N/A",
            date: itm?.invoiceDate,
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
      <h3>Machine Outbound Domestic</h3>

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

        {/* <SearchDateFilter
          select={{
            value: department,
            onChange: departmentChangeHandler,
          }}
        /> */}
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
        <Button variant="success" onClick={handleExportExcel}>
          Export to Excel
        </Button>
      </div>
      {showTable && (
        <CustomTable
          divClass={"h-470px mt-4"}
          checkbox={false}
          // rows={rows}
          rows={filterRows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          pageSize={5}
          columnWidth={190}
        />
      )}
      <br />
    </div>
  );
};

export default DomesticMachineO;
