import { TextField } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomTable from "../../../../../components/table/CustomTable";
import CustomModal from "../../../../../components/modal/CustomModal";
import { postAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";

const DomesticPartsTable = () => {
  const [outletContext] = useOutletContext();
  const shyam = outletContext.outbound;
  const [rows, setRows] = useState(shyam);
  const [tableInputs, setTableInputs] = useState({
    freightCharge: {},
    totalBillAmount: {},
    deductionAmount: {},
    challanAmount: {},
    lrNumber: {},
  });
  const [formData, setFormData] = useState({
    transporterName: shyam[0]?.transporter ?? "",
    billDate: "",
    transporterAmount: "",
    transporterBillNumber: "",
    m3TransportCharge: "",
    clearBillAmount: "",
  });
  const [clearBillError, setClearBillError] = useState(false);
  const onFormDataChange = (e) => {
    const { name, value } = e.target;

    if (name === "clearBillAmount") {
      const clearBillAmount = parseFloat(value);
      const m3TransportCharge = parseFloat(formData.m3TransportCharge);

      if (clearBillAmount > m3TransportCharge) {
        setClearBillError(true);
      } else {
        setClearBillError(false);
      }
    }
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
            "m3TransportCharge",
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

  const resetFlags = () => {
    setSuccess(false);
    setSaveError(false);
    setUpdateError(false);
  };

  const onSubmitHandler = async () => {
    try {
      const userId = shyam[0].id;

      const saveResponse = await postAPI(
        `${apiEndpoints.saveTransParts}${userId}`,
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
          status: "forApproval",
          m3TransportCharge: tableInputs.challanAmount[rowId],
        };
        debugger;
        const updateResponse = await postAPI(
          `${apiEndpoints.updateDataPD}${userData.userName}`,
          updateData
        );
        console.log(updateResponse);

        if (saveResponse.status !== "Success") {
          setUpdateError(true);
          return;
        }
        const updatedRows = shyam.filter((data) => data.id !== rowId);
        setRows(updatedRows);
      }
      setSuccess(true);
      outletContext.setActiveTab(15);
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
              outletContext.setActiveTab(15);
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
                  value={formData.transporterName}
                  name="transporterName"
                  onChange={onFormDataChange}
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
                  // disabled
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={formData.transporterBillNumber}
                  name="transporterBillNumber"
                  onChange={onFormDataChange}
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
                  value={formData.billDate}
                  name="billDate"
                  onChange={onFormDataChange}
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
                  value={formData.transporterAmount}
                  name="transporterAmount"
                  onChange={onFormDataChange}
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
                  value={formData.m3TransportCharge}
                  // value={formData.clearBillAmount}
                  name="m3TransportCharge"
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
                <TextField
                  fullWidth
                  sx={{ width: 250 }}
                  sy={{ height: 80 }}
                  value={formData.clearBillAmount}
                  name="clearBillAmount"
                  onChange={onFormDataChange}
                  error={clearBillError}
                  helperText={
                    clearBillError
                      ? "Cleared Bill Amount cannot exceed M3 Transport Charge"
                      : ""
                  }
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
          columnWidth={157}
          onRowSelectionModelChange={handleSelectionModelChange}
        />

        <br />
      </div>
    </>
  );
};

export default DomesticPartsTable;
