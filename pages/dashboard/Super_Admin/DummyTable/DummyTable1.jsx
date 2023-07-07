import { TextField } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import CustomTable from "../../../../components/table/CustomTable";
import { postAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";

const rowsData = [
  {
    id: 1,
    invoice: "123434531789",
    Msachine: "35",
    InvoiceDate: "13 - 05 - 23",
    M3Freight: "12234",
    freightChange: "",
    amountBill: "",
    deduction: "",
    challan: "",
    cleared: "",
    lr: "",
  },
];

const DummyTable = () => {
  const [outletContext] = useOutletContext();
  const user = outletContext.outbound;

  const [name, setName] = useState([]);
  const [rows, setRows] = useState(user);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedFreightCharges, setSelectedFreightCharges] = useState("");
  const [selectedTotalBillAmount, setSelectedTotalBillAmount] = useState("");
  const [selectedDeductionAmount, setSelectedDeductionAmount] = useState("");
  const [selectedChallanAmount, setSelectedChallanAmount] = useState("");

  const [myVal, setMyVal] = useState({});
  const [bill, setBill] = useState({});
  const [deduc, setDeduc] = useState({});
  const [challn, setChalln] = useState({});

  const [startDate, setStartDate] = useState(null);
  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    filterResults(date, endDate);
  };

  useEffect(() => {
    setSelectedFreightCharges(calculateFreightCharges(myVal));
  }, [myVal]);
  useEffect(() => {
    setSelectedTotalBillAmount(calculateTotalBillAmount(bill));
  }, [bill]);
  useEffect(() => {
    setSelectedDeductionAmount(calculateDeductionAmount(deduc));
  }, [deduc]);
  useEffect(() => {
    setSelectedChallanAmount(calculateChallanAmount(challn));
  }, [challn]);

  const calculateFreightCharges = (updatedMyVal) => {
    return Object.values(updatedMyVal).reduce((total, value) => {
      const freightChange = parseInt(value);
      return isNaN(freightChange) ? total : total + freightChange;
    }, 0);
  };
  const calculateTotalBillAmount = (updatedMyVal) => {
    return Object.values(updatedMyVal).reduce((total, value) => {
      const amountBill = parseInt(value);
      return isNaN(amountBill) ? total : total + amountBill;
    }, 0);
  };
  const calculateDeductionAmount = (updatedMyVal) => {
    return Object.values(updatedMyVal).reduce((total, value) => {
      const deduction = parseInt(value);
      return isNaN(deduction) ? total : total + deduction;
    }, 0);
  };
  const calculateChallanAmount = (updatedMyVal) => {
    return Object.values(updatedMyVal).reduce((total, value) => {
      const challan = parseInt(value);
      return isNaN(challan) ? total : total + challan;
    }, 0);
  };

  const handleInputChange = (event, rowIndex, field) => {
    const value = event.target.value;
    const newRows = [...rows];
    newRows[rowIndex][field] = value;
    setRows(newRows);
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
          value={params.row.cleared}
          onChange={(event) =>
            handleInputChange(event, params.rowIndex, "cleared")
          }
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
            value={myVal[params.id] || ""}
            onChange={(event) => {
              const newValue = event.target.value;

              setMyVal((prevVal) => {
                const updatedVal = { ...prevVal, [params.id]: newValue };

                setSelectedFreightCharges(calculateFreightCharges(updatedVal));
                return updatedVal;
              });
            }}
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
          value={bill[params.id] || ""}
          onChange={(event) => {
            const newValue = event.target.value;
            setBill((prevVal) => {
              const updatedVal = { ...prevVal, [params.id]: newValue };
              setSelectedTotalBillAmount(calculateTotalBillAmount(updatedVal));
              return updatedVal;
            });
          }}
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
          value={deduc[params.id] || ""}
          onChange={(event) => {
            const newValue = event.target.value;
            setDeduc((prevVal) => {
              const updatedVal = { ...prevVal, [params.id]: newValue };
              setSelectedDeductionAmount(calculateDeductionAmount(updatedVal));
              return updatedVal;
            });
          }}
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
          value={challn[params.id] || ""}
          onChange={(event) => {
            const newValue = event.target.value;
            setChalln((prevVal) => {
              const updatedVal = { ...prevVal, [params.id]: newValue };
              setSelectedChallanAmount(calculateChallanAmount(updatedVal));
              return updatedVal;
            });
          }}
          fullWidth
          variant="standard"
          size="small"
          inputProps={{ style: { padding: "8px" } }}
        />
      ),
    },
  ];
  const [saveFormData, setSaveFormData] = useState({
    transporterName: user[0]?.transporter ?? "",
    transporterBillNumber: "",
    totalfreightCharges: selectedFreightCharges || "",
    totalChallanAmount: "",
    totalBillAmount: "",
    totalClearBillAmount: "",
    totalDeductionAmount: "",
    remarks: "",
    billDate: "",
  });
  const onSaveFormDataChange = (e) => {
    const { name, value } = e.target;

    setSaveFormData((prevSaveFormData) => ({
      ...prevSaveFormData,
      [name]: value,
    }));
  };
  const [updateFormData, setUpdateFormData] = useState({
    id: 77,
    lrNumber: "123",
    totalBillAmount: "56788",
    DeductionAmount: "100",
    ChallanAmount: "57667",
  });
  const onUpdateFormDataChange = (e) => {
    setUpdateFormData((prevUpdateFormData) => ({
      ...prevUpdateFormData,
      [name]: value,
    }));
  };
  const onSubmitHandler = async () => {
    console.log(saveFormData);
  };

  return (
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
                value={saveFormData.transporterName}
                onChange={onSaveFormDataChange}
                // value={formData.transporterName}
                name="transporterName"
                // onChange={onSaveFormDataChange}
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
                value={saveFormData.transporterBillNumber}
                name="transporterBillNumber"
                onChange={onSaveFormDataChange}
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
                name="start-date"
                value={startDate}
                onChange={handleStartDateChange}
                // value={saveFormData.billDate}
                // name="billDate"
                // onChange={onSaveFormDataChange}
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
                value={selectedFreightCharges}
                sx={{ width: 200 }}
                sy={{ height: 80 }}
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
                value={selectedChallanAmount}
                sx={{ width: 200 }}
                sy={{ height: 80 }}
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
                value={selectedDeductionAmount}
                sx={{ width: 200 }}
                sy={{ height: 80 }}
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
                value={selectedTotalBillAmount}
                sx={{ width: 200 }}
                sy={{ height: 80 }}
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
                // value={selectedClearedAmount}
                sx={{ width: 200 }}
                sy={{ height: 80 }}
                value={saveFormData.totalClearBillAmount}
                name="totalClearBillAmount"
                onChange={onSaveFormDataChange}
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
                value={saveFormData.remarks}
                name="remarks"
                onChange={onSaveFormDataChange}
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
      />

      <br />
    </div>
  );
};

export default DummyTable;
