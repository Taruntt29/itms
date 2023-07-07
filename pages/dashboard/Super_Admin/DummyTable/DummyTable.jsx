import { TextField } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CustomTable from "../../../../components/table/CustomTable";
import { postAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";
import { useSelector } from "react-redux";
import CustomModal from "../../../../components/modal/CustomModal";

const DummyTable = () => {
  const [outletContext] = useOutletContext();
  const user = outletContext.outbound;
  const [rows, setRows] = useState(user);
  const [tableInputs, setTableInputs] = useState({
    freightCharge: {},
    totalBillAmount: {},
    deductionAmount: {},
    challanAmount: {},
    lrNumber: {},
  });

  const [formData, setFormData] = useState({
    transporterName: user[0]?.transporter ?? "",
    transporterBillNumber: "",
    totalfreightCharges: 0,
    totalChallanAmount: 0,
    totalBillAmount: 0,
    totalClearBillAmount: 0,
    totalDeductionAmount: 0,
    remarks: "",
    invoiceDate: "",
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
            "totalChallanAmount",
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
            "totalfreightCharges",
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
      headerName: "LR Number",
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
      headerName: "Challan Amount",
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
    //validatoin
    if (selectedRowsId.length === 0) {
      console.log("Select data");
      return;
    }
    if (formData.transporterBillNumber.trim().length === 0) {
      console.log("Error");
      setSaveError(true);
      return;
    }

    try {
      const userId = user[0].id;

      const saveResponse = await postAPI(
        `${apiEndpoints.savedata}${userId}`,
        formData
      );
      if (saveResponse.status !== "Success") {
        setSaveError(true);
        return;
      }

      let updatedRows = [];
      for (const rowId of selectedRowsId) {
        const row = rows.find((itm) => itm.id === rowId);
        const updateData = {
          id: rowId,
          lrNumber: tableInputs.lrNumber[rowId] || 0,
          totalBillAmount: tableInputs.totalBillAmount[rowId],
          DeductionAmount: tableInputs.deductionAmount[rowId],
          ChallanAmount: tableInputs.challanAmount[rowId],
          freightCharge: tableInputs.freightCharge[rowId],
          status: "forApproval",
          items: [
            {
              machineNo: row.Machine,
            },
          ],
        };

        const updateResponse = await postAPI(
          `${apiEndpoints.updateData}${userData.userName}`,
          updateData
        );

        if (saveResponse.status !== "Success") {
          setUpdateError(true);
          setSuccess(true);
          outletContext.setActiveTab(13);
          return;
        }
        const filterArray = rows.filter((itm) => itm.id !== rowId);
        updatedRows = [...filterArray];
      }

      setRows(updatedRows);
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
                  value={formData.transporterName}
                  name="transporterName"
                  onChange={onFormDataChange}
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
                <TextField
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  type="date"
                  id="start-date"
                  // name="start-date"
                  value={formData.invoiceDate}
                  name="invoiceDate"
                  onChange={onFormDataChange}
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
                  value={formData.totalfreightCharges}
                  name="totalfreightCharges"
                  onChange={onFormDataChange}
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
                  value={formData.totalChallanAmount}
                  name="totalChallanAmount"
                  onChange={onFormDataChange}
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
                  value={formData.totalDeductionAmount}
                  name="totalDeductionAmount"
                  onChange={onFormDataChange}
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
                <TextField
                  fullWidth
                  sx={{ width: 200 }}
                  sy={{ height: 80 }}
                  value={formData.totalClearBillAmount}
                  name="totalClearBillAmount"
                  onChange={onFormDataChange}
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
                  value={formData.remarks}
                  name="remarks"
                  onChange={onFormDataChange}
                />
              </Row>
            </Col>
          </Row>
        </div>

        <br />

        <CustomTable
          divClass={"h-470px mt-4"}
          checkbox={true}
          rows={rows}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          pageSize={5}
          columnWidth={96}
          onRowSelectionModelChange={handleSelectionModelChange}
        />

        <br />
      </div>
    </>
  );
};

export default DummyTable;
