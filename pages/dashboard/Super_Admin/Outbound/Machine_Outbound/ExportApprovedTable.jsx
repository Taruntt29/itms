import { TextField } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CustomTable from "../../../../../components/table/CustomTable";
import { getAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";

const ExportApprovedTable = () => {
  const [outletContext] = useOutletContext();
  const user12 = outletContext.outbound;

  const customRow = [
    {
      id: user12.id,
      Invoice: user12.invoiceNum,
      Machine: user12?.items[0]?.machineNo ?? "",
      date: user12.invoiceDate ?? "",
      M3Freight: user12?.m3FreightCharge,
      lr: user12.blnumber ?? "",
      freightChange: user12.oceanFreightCharges ?? "",
      amountBill: user12.totalBillAmount ?? "",
      deduction: user12.totalDeductionAmount ?? "",
      challan: user12.clearanceTransportCharge ?? "",
    },
  ];
  const [rows, setRows] = useState(customRow);

  const columns = [
    { field: "id", headerName: "SR No.", width: 70 },
    { field: "Invoice", headerName: "Invoice Number", width: 130 },
    { field: "Machine", headerName: "Machine Number.", width: 140 },
    {
      field: "date",
      headerName: "Invoice Date",
      type: "number",
      width: 100,
    },
    {
      field: "M3Freight",
      headerName: "M3 Freight Charges",
      type: "number",
      width: 150,
    },

    {
      field: "lr",
      headerName: "BL Number",
      width: 150,
    },
    {
      field: "freightChange",
      headerName: "Freight Charges",
      width: 140,
    },
    {
      field: "amountBill",
      headerName: "Total Bill Amount",
      width: 140,
    },
    {
      field: "deduction",
      headerName: "Deduction Amount",
      width: 140,
    },
    {
      field: "challan",
      headerName: "Transport Charge",
      type: "number",
      width: 140,
    },
  ];
  const [data, setData] = useState([]);
  useEffect(() => {
    const docNumber = user12.transporterDocNo;
    const getDocNumber = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.transportDocNumberE}${docNumber}`
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDocNumber();
  }, [getAPI]);
  return (
    <>
      <div className="mt-3">
        <h3>Invoice Details--</h3>

        <div className="d-flex justify-content-end gap-1">
          <Button
            variant="dark"
            onClick={() => {
              outletContext.setActiveTab(43);
            }}
          >
            Cancel
          </Button>
        </div>
        <br />
        <div className="mx-2 mb-4">
          <Row>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Invoice No.(Ocean Freight)</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.invoiceNumberOceanFreight}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Ocean Freight Charges</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  disabled
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.oceanFreightCharges}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Bill Date(Ocean Freight)</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  type="date"
                  id="start-date"
                  value={data?.data?.billDateOceanFreight}
                />
              </Row>
            </Col>
          </Row>
          <br />

          <Row>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>
                  Invoice No.(Clearance Transport)
                </h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.invoiceNumberClearnaceTransport}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Clearence Transport Charge</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  disabled
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.clearnaceTransportCharg}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>
                  Bill Date(Clearance Transport)
                </h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  type="date"
                  id="start-date"
                  value={data?.data?.billDateClearanceTransport}
                />
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>BL Number</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.blNumber}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Total Bill Amount</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  disabled
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.totalBillAmount}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Cleared Bill Amount</h3>
              </Row>
              <Row>
                {" "}
                <TextField fullWidth sx={{ width: 250 }} sy={{ height: 80 }} />
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Transporter Name</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={user12.transporterName}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Deduction Amount</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  disabled
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.totalDeductionAmount}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Remarks</h3>
              </Row>
              <Row>
                {" "}
                <TextField fullWidth sx={{ width: 250 }} sy={{ height: 80 }} />
              </Row>
            </Col>
          </Row>
          <br />
        </div>

        <CustomTable
          divClass={"h-470px mt-4"}
          checkbox={false}
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          pageSize={5}
          columnWidth={97}
          //   onRowSelectionModelChange={handleSelectionModelChange}
        />

        <br />
      </div>
    </>
  );
};

export default ExportApprovedTable;
