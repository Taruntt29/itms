import { Switch, TextField } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CustomSelect from "../../../../../components/input-select/CustomSelect";
import SearchDateFilter from "../../SearchDateFilter";
import CustomTable from "../../../../../components/table/CustomTable";
import { getAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";

const ExportMachineApproved = () => {
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
    { field: "ER", headerName: "ER Doc. No.", width: 120 },

    {
      field: "transporter",
      headerName: "Transporter name",
      width: 150,
      renderCell: (param) => (
        <span
          className="pointer text-primary"
          onClick={() => {
            const user12 = allUsers.find((itm) => itm.id === param.row.id);
            outletContext.setActiveTab(44);
            outletContext.setOutbound(user12);
          }}
        >
          {param.row.transporter}
        </span>
      ),
    },

    { field: "Invoice", headerName: "Invoice No.", width: 110 },
    {
      field: "Machine",
      headerName: "Machine No.",
      type: "number",
      width: 120,
    },
    {
      field: "date",
      headerName: "Invoice Date",
      type: "number",
      width: 120,
    },
    {
      field: "LR",
      headerName: "BL No.",
      type: "number",
      width: 90,
    },
  ];
  const [outletContext] = useOutletContext();

  useEffect(() => {
    const getExport = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getInvoicesByStatusExports}approved`
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
            ER: "35",
            Invoice: itm?.invoiceNum,
            transporter: itm?.transporterName,
            Machine: itm.items !== null ? itm?.items[0]?.machineNo : "N/A",
            date: itm?.invoiceDate,
            LR: itm?.blnumber,
          })) ?? [];

        setRows(rowData);
        setFilterRows(rowData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getExport();
  }, [getAPI]);
  return (
    <div className="mt-3">
      <h3>Machine Outbound Export Approval</h3>

      <CustomTable
        divClass={"h-420px mt-4"}
        checkbox={false}
        rows={filterRows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        pageSize={5}
        columnWidth={137}
      />
      <br />
    </div>
  );
};

export default ExportMachineApproved;
