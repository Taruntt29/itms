import { TextField } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomTable from "../../../../../components/table/CustomTable";
import CustomModal from "../../../../../components/modal/CustomModal";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";
import { postAPI } from "../../../../../components/Api/ApiRequest";

const ExportMachineTable = () => {
  const [outletContext] = useOutletContext();
  const exort = outletContext.outbound;
  const [rows, setRows] = useState(exort);
  const [tableInputs, setTableInputs] = useState({
    freightCharge: {},
    totalBillAmount: {},
    deductionAmount: {},
    challanAmount: {},
    lrNumber: {},
  });
  const [formData, setFormData] = useState({
    transporterName: exort[0]?.transporter ?? "",
    oceanFreightCharges: 0,
    totalfreightCharges: 0,
    totalChallanAmount: 0,
    clearnaceTransportCharg: 0,
    invoiceNumberOceanFreight: "",
    invoiceNumberClearnaceTransport: "",
    totalBillAmount: 0,
    blNumber: "",
    billDateOceanFreight: "",
    billDateClearanceTransport: "",
    remarks: "",
    totalDeductionAmount: 0,
  });
  const onFormDataChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevSaveFormData) => ({
      ...prevSaveFormData,
      [name]: value,
    }));
  };
  const [selectedRowsId, setselectedRowsId] = useState([]);
  const handleSelectionModelChange = (e) => {
    setselectedRowsId(e);
    //Add data after selection login below (Write before check)
  };
  const isAdded = (id) => {
    return selectedRowsId.some((row) => row === id);
  };
  const onInputChangeAddValueHandler = (name, allInput) => {
    const sum = Object.values(allInput).reduce((total, value) => {
      return +value + total;
    }, 0);
    setFormData((prevState) => ({ ...prevState, [name]: sum }));
  };
  const tableInputChangeHandler = (params, e) => {
    const { name, value } = e.target;
    setTableInputs((prevState) => {
      let newState = { ...prevState };
      if (name === "challanAmount") {
        newState.challanAmount = {
          ...newState.challanAmount,
          [params.id]: value,
        };
        if (isAdded(params.id)) {
          onInputChangeAddValueHandler(
            "clearnaceTransportCharg",
            newState.challanAmount
          );
        }
      } else if (name === "deductionAmount") {
        newState.deductionAmount = {
          ...newState.deductionAmount,
          [params.id]: value,
        };
        if (isAdded(params.id)) {
          onInputChangeAddValueHandler(
            "totalDeductionAmount",
            newState.deductionAmount
          );
        }
      } else if (name === "freightCharge") {
        newState.freightCharge = {
          ...newState.freightCharge,
          [params.id]: value,
        };
        if (isAdded(params.id)) {
          onInputChangeAddValueHandler(
            "oceanFreightCharges",
            newState.freightCharge
          );
        }
      } else if (name === "totalBillAmount") {
        newState.totalBillAmount = {
          ...newState.totalBillAmount,
          [params.id]: value,
        };
        if (isAdded(params.id)) {
          onInputChangeAddValueHandler(
            "totalBillAmount",
            newState.totalBillAmount
          );
        }
      } else if (name === "lrNumber") {
        newState.lrNumber = {
          ...newState.lrNumber,
          [params.id]: value,
        };
      }

      return newState;
    });
  };
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
      renderCell: (params) => (
        <TextField
          value={tableInputs?.lrNumber[params.id] || ""}
          onChange={tableInputChangeHandler.bind(null, params)}
          name="lrNumber"
          fullWidth
          variant="standard"
          size="small"
          inputProps={{ style: { padding: "8px" } }}
        />
      ),
    },
    {
      field: "freightChange",
      headerName: "Freight Charges",
      width: 140,
      renderCell: (params) => {
        return (
          <TextField
            value={tableInputs?.freightCharge[params.id] || ""}
            onChange={tableInputChangeHandler.bind(null, params)}
            name="freightCharge"
            fullWidth
            variant="standard"
            size="small"
            inputProps={{ style: { padding: "8px" } }}
          />
        );
      },
    },
    {
      field: "amountBill",
      headerName: "Total Bill Amount",
      width: 140,
      renderCell: (params) => (
        <TextField
          value={tableInputs?.totalBillAmount[params.id] || ""}
          onChange={tableInputChangeHandler.bind(null, params)}
          name="totalBillAmount"
          fullWidth
          variant="standard"
          size="small"
          inputProps={{ style: { padding: "8px" } }}
        />
      ),
    },
    {
      field: "deduction",
      headerName: "Deduction Amount",
      width: 140,
      renderCell: (params) => (
        <TextField
          value={tableInputs?.deductionAmount[params.id] || ""}
          onChange={tableInputChangeHandler.bind(null, params)}
          name="deductionAmount"
          fullWidth
          variant="standard"
          size="small"
          inputProps={{ style: { padding: "8px" } }}
        />
      ),
    },
    {
      field: "challan",
      headerName: "Transport Charge",
      type: "number",
      width: 140,
      renderCell: (params) => (
        <TextField
          value={tableInputs?.challanAmount[params.id] || ""}
          onChange={tableInputChangeHandler.bind(null, params)}
          name="challanAmount"
          fullWidth
          variant="standard"
          size="small"
          inputProps={{ style: { padding: "8px" } }}
        />
      ),
    },
  ];

  const userData = useSelector((state) => state.user.userData);
  const [success, setSuccess] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  // const [error]
  const resetFlags = () => {
    setSuccess(false);
    setSaveError(false);
    setUpdateError(false);
  };

  const onSubmitHandler = async () => {
    if (selectedRowsId.length === 0) {
      console.log("Select data");
      return;
    }

    try {
      const userId = exort[0].id;

      const saveResponse = await postAPI(
        `${apiEndpoints.savedata1}${userId}`,
        formData
      );
      if (saveResponse.status !== "Success") {
        setSaveError(true);
        return;
      }

      for (const rowId of selectedRowsId) {
        const row = rows.find((itm) => itm.id === rowId);
        const updateData = {
          id: rowId,
          blnumber: tableInputs.lrNumber[rowId] || 0,
          totalBillAmount: tableInputs.totalBillAmount[rowId],
          totalDeductionAmount: tableInputs.deductionAmount[rowId],
          clearanceTransportCharge: tableInputs.challanAmount[rowId],
          oceanFreightCharges: tableInputs.freightCharge[rowId],
          status: "forApproval",
          items: [
            {
              machineNo: row.Machine,
            },
          ],
        };

        const updateResponse = await postAPI(
          `${apiEndpoints.updateDataE}${userData.userName}`,
          updateData
        );

        if (saveResponse.status !== "Success") {
          setUpdateError(true);
          return;
        }
        const updatedRows = exort.filter((data) => data.id !== rowId);
        setRows(updatedRows);
      }
      setSuccess(true);
      outletContext.setActiveTab(13);
    } catch (error) {
      console.log(error);
    }
  };

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
          <Button variant="danger" onClick={onSubmitHandler}>
            Submit
          </Button>

          <Button
            variant="dark"
            onClick={() => {
              outletContext.setActiveTab(13);
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
                  value={formData.invoiceNumberOceanFreight}
                  name="invoiceNumberOceanFreight"
                  onChange={onFormDataChange}
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
                  value={formData.oceanFreightCharges}
                  name="oceanFreightCharges"
                  onChange={onFormDataChange}
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
                  // name="start-date"
                  value={formData.billDateOceanFreight}
                  name="billDateOceanFreight"
                  onChange={onFormDataChange}
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
                  value={formData.invoiceNumberClearnaceTransport}
                  name="invoiceNumberClearnaceTransport"
                  onChange={onFormDataChange}
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
                  value={formData.clearnaceTransportCharg}
                  name="clearnaceTransportCharg"
                  onChange={onFormDataChange}
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
                  // name="start-date"
                  value={formData.billDateClearanceTransport}
                  name="billDateClearanceTransport"
                  onChange={onFormDataChange}
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
                  value={formData.blNumber}
                  name="blNumber"
                  onChange={onFormDataChange}
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
                  value={formData.totalBillAmount}
                  name="totalBillAmount"
                  onChange={onFormDataChange}
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
                  value={formData.transporterName}
                  name="transporterName"
                  onChange={onFormDataChange}
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
                  value={formData.totalDeductionAmount}
                  name="totalDeductionAmount"
                  onChange={onFormDataChange}
                />
              </Row>
            </Col>
            <Col>
              <Row>
                <h3 style={{ fontSize: "110%" }}>Remarks</h3>
              </Row>
              <Row>
                {" "}
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={formData.remarks}
                  name="remarks"
                  onChange={onFormDataChange}
                />
              </Row>
            </Col>
          </Row>
          <br />
        </div>

        <CustomTable
          divClass={"h-470px mt-4"}
          checkbox={true}
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          pageSize={5}
          columnWidth={97}
          onRowSelectionModelChange={handleSelectionModelChange}
        />

        <br />
      </div>
    </>
  );
};

export default ExportMachineTable;
