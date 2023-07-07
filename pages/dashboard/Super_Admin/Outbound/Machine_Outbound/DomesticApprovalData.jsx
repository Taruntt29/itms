import { TextField } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomTable from "../../../../../components/table/CustomTable";
import { getAPI, postAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";
import CustomModal from "../../../../../components/modal/CustomModal";

const DomesticApprovalData = () => {
  const [outletContext] = useOutletContext();
  const approval = outletContext.outbound;
  const userData = useSelector((state) => state.user.userData);

  const customRow = [
    {
      id: approval.id,
      Invoice: "",
      Machine: approval?.items[0]?.machineNo ?? "",
      date: approval.invoiceDate ?? "",
      M3Freight: "",
      lr: approval.lrNumber ?? "",
      freightChange: approval.freightCharge ?? "",
      amountBill: approval.totalBillAmount ?? "",
      deduction: approval.deductionAmount ?? "",
      challan: approval.challanAmount ?? "",
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
      headerName: "LR Number",
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
      headerName: "Challan Amount",
      type: "number",
      width: 140,
    },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    const docNumber = approval.transporterDocNo;
    const getDocNumber = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getByTransportDocNumber}${docNumber}`
        );

        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDocNumber();
  }, [getAPI]);

  const [success, setSuccess] = useState(false);

  const resetFlags = () => {
    setSuccess(false);
    outletContext.setActiveTab(26);
  };
  const onSubmitHandler = async () => {
    try {
      const updateData = {
        id: approval.id,

        status: "approved",
        lrNumber: approval.lrNumber,
        totalBillAmount: approval.totalBillAmount,
        DeductionAmount: approval.deductionAmount,
        ChallanAmount: approval.challanAmount,
        freightCharge: approval.freightCharge,
      };

      const updateResponse = await postAPI(
        `${apiEndpoints.updateData}${userData.userId}`,
        updateData
      );

      if (updateResponse.status !== "Success") {
        setUpdateError(true);
        outletContext.setActiveTab(26);
        return;
      }

      setSuccess(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mt-3">
        <CustomModal
          show={success}
          onHide={resetFlags}
          header={false}
          closeButton={false}
          footer={false}
        >
          <p className="text-center text-success my-0">
            Approved Successfully.
          </p>
        </CustomModal>

        <h3>Invoice Details</h3>

        <div className="d-flex justify-content-end gap-1">
          <Button variant="danger" onClick={onSubmitHandler}>
            Approved
          </Button>

          <Button
            variant="dark"
            onClick={() => {
              outletContext.setActiveTab(26);
            }}
          >
            Cancel
          </Button>
        </div>
        <br />

        <div>
          <Row>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Transporter Name.</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  id="transporterName"
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  // value={approval.transporterName ?? ""}
                  value={data?.data?.transporterName}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Transporter Bill Number</h3>
              </Row>
              <Row>
                <TextField
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  // value={approval.totalBillAmount ?? ""}
                  value={data?.data?.transporterBillNumber}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Bill Date</h3>
              </Row>
              <Row>
                <TextField
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  type="date"
                  id="start-date"
                  value={data?.data?.invoiceDate}
                />
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Freight Charges</h3>
              </Row>
              <Row>
                <TextField
                  disabled
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  value={data?.data?.totalfreightCharges}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Challan Amount</h3>
              </Row>
              <Row>
                <TextField
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  disabled
                  value={data?.data?.totalChallanAmount}
                />
              </Row>
            </Col>

            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Deduction Amount</h3>
              </Row>
              <Row>
                <TextField
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  disabled
                  value={data?.data?.totalDeductionAmount}
                />
              </Row>
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Total Bill Amount</h3>
              </Row>
              <Row>
                <TextField
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  disabled
                  value={data?.data?.totalBillAmount}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Cleared Bill Amount</h3>
              </Row>
              <Row>
                <TextField
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  value={data?.data?.totalClearBillAmount}
                />
              </Row>
            </Col>

            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Remarks</h3>
              </Row>
              <Row>
                <TextField
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  value={data?.data?.remarks}
                />
              </Row>
            </Col>
          </Row>
        </div>

        <br />

        <CustomTable
          divClass={"h-470px mt-4"}
          checkbox={false}
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          pageSize={5}
          columnWidth={96}
        />

        <br />
      </div>
    </>
  );
};

export default DomesticApprovalData;
