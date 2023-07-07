import { TextField } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomTable from "../../../../../components/table/CustomTable";
import CustomModal from "../../../../../components/modal/CustomModal";
import { getAPI, postAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";

const DApprovedTable = () => {
  const [outletContext] = useOutletContext();
  const shyam2 = outletContext.outbound;

  const customRow = [
    {
      id: shyam2.id,
      Invoice: shyam2.invoiceNum,
      Machine: shyam2?.items[0]?.machineNo ?? "",
      date: shyam2.invoiceDate ?? "",
      M3Freight: shyam2?.lrNumber,
      challan: shyam2?.m3TransportCharge,
    },
  ];
  const [rows, setRows] = useState(customRow);
  const columns = [
    { field: "id", headerName: "SR No.", width: 70 },
    { field: "Invoice", headerName: "Invoice Number", width: 150 },
    { field: "Machine", headerName: "Parts Description", width: 170 },
    {
      field: "date",
      headerName: "Invoice Date",
      type: "number",
      width: 140,
    },
    {
      field: "M3Freight",
      headerName: "LR Number",
      type: "number",
      width: 150,
    },

    {
      field: "challan",
      headerName: "M3 Transport Charge",
      type: "number",
      width: 180,
    },
  ];
  const userData = useSelector((state) => state.user.userData);
  const [success, setSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const resetFlags = () => {
    setSuccess(false);
    setSaveError(false);
    setUpdateError(false);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const docNumber = shyam2.transporterDocNo;
    const getDocNumber = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getTrnsPartsByTransDocNum}${docNumber}`
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
      <CustomModal
        show={success}
        onHide={resetFlags}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-success my-0">Saved Successfully.</p>
      </CustomModal>
      <CustomModal
        show={saveError}
        onHide={resetFlags}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">
          Details not saved, please try again.
        </p>
      </CustomModal>
      <CustomModal
        show={updateError}
        onHide={resetFlags}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">
          All rows not updated successfully, please try again.
        </p>
      </CustomModal>
      <div className="mt-3">
        <h3>Invoice Details--</h3>

        <div className="d-flex justify-content-end gap-1">
          <Button
            variant="dark"
            onClick={() => {
              outletContext.setActiveTab(47);
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
                <h3 style={{ fontSize: "110%" }}>Transporter Name</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={shyam2.transporterName}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Bill Number</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  disabled
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.transporterBillNumber}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Bill Date</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  type="date"
                  id="start-date"
                  value={data?.data?.billDate}
                />
              </Row>
            </Col>
          </Row>
          <br />

          <Row>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Transporter Amount</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.transporterAmount}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>M3 Transport Charge</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  disabled
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.m3TransportCharge}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Cleared Bill Amount</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={data?.data?.clearBillAmount}
                />
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
          columnWidth={157}
        />

        <br />
      </div>
    </>
  );
};

export default DApprovedTable;
