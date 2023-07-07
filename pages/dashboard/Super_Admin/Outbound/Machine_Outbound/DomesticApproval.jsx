import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

import CustomTable from "../../../../../components/table/CustomTable";
import { getAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
const DomesticApproval = () => {
  const [showTable, setShowTable] = useState(false);
  const [transporterOptions, setTransporterOptions] = useState([]);

  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  const handleExportExcel = () => {
    const data = filterRows.map((row) => ({
      ID: row.id,
      "ER Doc. No.": row.ER,
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
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "ER",
      headerName: "ER Doc. No.",
      type: "number",

      width: 150,
    },
    {
      field: "transporter",
      headerName: "Transporter name",
      width: 190,
      renderCell: (param) => (
        <span
          className="pointer text-primary"
          onClick={() => {
            const approval = allUsers.find((itm) => itm.id === param.row.id);

            outletContext.setActiveTab(27);
            outletContext.setOutbound(approval);
          }}
        >
          {param.row.transporter}
        </span>
      ),
    },
    { field: "Invoice", headerName: "Invoice No.", width: 130 },
    {
      field: "Machine",
      headerName: "Machine No.",
      type: "number",

      width: 150,
    },
    {
      field: "date",
      headerName: "Invoice Date",
      type: "number",

      width: 190,
    },
  ];
  const [outletContext] = useOutletContext();

  useEffect(() => {
    const getDomestic = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getInvoicesByStatusDomestic}forApproval`
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
    getDomestic();
  }, [getAPI]);

  return (
    <div className="mt-3 ">
      <div className="d-flex justify-content-between">
        <h3>Machine Outbound Domestic Approval</h3>
        <Button variant="success" onClick={handleExportExcel}>
          Export to Excel
        </Button>
      </div>
      <br />

      <CustomTable
        divClass={"h-470px mt-4"}
        checkbox={false}
        rows={filterRows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        pageSize={5}
        columnWidth={160}
      />
      <br />
    </div>
  );
};

export default DomesticApproval;
