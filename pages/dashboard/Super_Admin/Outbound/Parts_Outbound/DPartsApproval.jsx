import { Switch, TextField } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";

import { useEffect, useState } from "react";

import { useOutletContext } from "react-router-dom";
import CustomSelect from "../../../../../components/input-select/CustomSelect";
import CustomTable from "../../../../../components/table/CustomTable";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";
import { getAPI } from "../../../../../components/Api/ApiRequest";

const DPartsApproval = () => {
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
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "transporter",
      headerName: "Transporter name",
      width: 150,
      renderCell: (param) => (
        <span
          className="pointer text-primary"
          onClick={() => {
            const shyam1 = allUsers.find((itm) => itm.id === param.row.id);

            outletContext.setActiveTab(46);
            outletContext.setOutbound(shyam1);
          }}
        >
          {param.row.transporter}
        </span>
      ),
    },
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

  useEffect(() => {
    const getParts = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getInvoicesByStatusParts}forApproval`
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
            ER: itm?.transporterDocNo,
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
    getParts();
  }, [getAPI]);
  return (
    <div className="mt-3">
      <h3>Parts Outbound Domestic For Approval</h3>

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
      </div>
      {showTable && (
        <CustomTable
          divClass={"h-470px mt-4"}
          checkbox={true}
          // rows={rows}
          rows={filterRows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          pageSize={5}
          columnWidth={161}
        />
      )}
      <br />
    </div>
  );
};

export default DPartsApproval;
