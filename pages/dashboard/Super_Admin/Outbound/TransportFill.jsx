import { Button, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useOutletContext } from "react-router-dom";
import React, { useState } from "react";
import CustomModal from "../../../../components/modal/CustomModal";
import { postAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";
import { useFormik } from "formik";
import { transporterSchema } from "../../../../utils/RegEx";
const TransporterFill = () => {
  const [outletContext] = useOutletContext();
  const [currntDate, setStartDate] = useState(null);
  const [transportMachineData, settransportMachineData] = useState(false);
  const [error, setError] = useState(false);
  const [initialValues, setFormData] = useState({
    invoiceNum: "",
    numberOnly: "",
    shippingtoPlace: "",
    shippingtoName: "",
    shippingtoState: "",
    lrNumber: "",
    machineNo: "",
    chasisNo: "",
    engineNo: "",
    transporterBillNumber: "",
    billDate: "",
    totalfreightCharges: "",
    totalChallanAmount: "",
    totalBillAmount: "",
    totalClearBillAmount: "",
    totalDeductionAmount: "",
    remarks: "",
  });
  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    //filterResults(date, endDate);
  };
  // const handleChange = (e) => {
  //   let { name, value } = e.target;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [name]: value,
  //   }));
  // };
  /* * *********************************************************************
   * * Function name : afterSuccessRedirect
   * * Developed By : Ashish Umrao
   * * Purpose  : This function used for afterSuccessRedirect
   * * Date : 23 JUNE 2023
   * * **********************************************************************/
  const { values, errors, touched, handleBlur, handleChange,handleSubmit } =
    useFormik({
      initialValues,
      //validationSchema: transporterSchema,
      onSubmit: async (values, action) => {
        // console.log("🚀 ~ file: TransportFill.jsx:59 ~ onSubmit: ~ ̥:",values)
        // return false;
        const response = await postAPI(apiEndpoints.saveOutBoundManualMachineData, values);
        if (response.status === "Success") {
          settransportMachineData(true);
        } else {
          setError(true);
        }
      },
    });
  /* * *********************************************************************
  * * Function name : afterSuccessRedirect
  * * Developed By : Ashish Umrao
  * * Purpose  : This function used for afterSuccessRedirect
  * * Date : 203 JULY 2023
  * * **********************************************************************/
  const afterSuccessRedirect = () => {
    resetFlags;
    outletContext.setActiveTab(0);
  };
  const resetFlags = () => {
    settransportMachineData(false);
    setError(false);
  };
  /************************************************************************
  **********************************************************************/
  return (
    <>
      <CustomModal
        show={transportMachineData}
        onHide={afterSuccessRedirect}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-success my-0">
          Data Added Successfully.
        </p>
      </CustomModal>
      <div className="mt-2">
        <h2>Manual Machine Bill</h2>
      </div>
      <br />
      <Row>
        <Col>Invoice Number<span className="text-danger">*</span></Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.invoiceNum}
            name="invoiceNum"
            onChange={handleChange}
            onBlur={handleBlur}
            label="-----Invoice Number-----"
          />
          {errors.numberOnly && touched.numberOnly ? (
            <ul className="parsley-errors-list filled" id="parsley-id-30">
              <li className="parsley-required">{errors.numberOnly}</li>
            </ul>
          ) : null}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Transporter Name</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.numberOnly}
            name="numberOnly"
            onChange={handleChange}
            label="-----Transporter Name-----"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Supplier Name</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.shippingtoName}
            name="shippingtoName"
            onChange={handleChange}
            label="-----Supplier Name-----"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Supplier Address</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.shippingtoPlace}
            name="shippingtoPlace"
            onChange={handleChange}
            label="-----Supplier Address-----"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>LR Number</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.lrNumber}
            name="lrNumber"
            onChange={handleChange}
            label="-----LR Number-----"
          />
        </Col>
      </Row>
      <br />
      <br />
      <Row>
        <Col>Machine Number</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.machineNo}
            name="machineNo"
            onChange={handleChange}
            label="-----Machine Number-----"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Chassis Number</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.chasisNo}
            name="chasisNo"
            onChange={handleChange}
            label="-----Chassis Number-----"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Engine Number</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.engineNo}
            name="engineNo"
            onChange={handleChange}
            label="-----Engine Number-----"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Transport Bill Number<span className="text-danger">*</span></Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.transporterBillNumber}
            name="transporterBillNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            label="-----Transport Bill Number-----"
          />
          {errors.numberOnly && touched.numberOnly ? (
            <ul className="parsley-errors-list filled" id="parsley-id-30">
              <li className="parsley-required">{errors.numberOnly}</li>
            </ul>
          ) : null}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Bill Date</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            type="date"
            id="start-date"
            name="billDate"
            value={values.currntDate}
            onChange={handleStartDateChange}
          />{" "}
        </Col>
      </Row>
      <br />
      {/* <Row>
        <Col>LR Number</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.invoiceNum}
            name="invoiceNum"
            onChange={handleChange}
            label="-----LR Number-----"
          />
        </Col>
      </Row> */}
      <br />
      <Row>
        <Col>Freight Charges</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.totalfreightCharges}
            name="totalfreightCharges"
            onChange={handleChange}
            label="-----Freight Charges-----"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Challan Amount<span className="text-danger">*</span></Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.totalChallanAmount}
            name="totalChallanAmount"
            onChange={handleChange}
            onBlur={handleBlur}
            label="-----Challan Amount-----"
          />
          {errors.numberOnly && touched.numberOnly ? (
            <ul className="parsley-errors-list filled" id="parsley-id-30">
              <li className="parsley-required">{errors.numberOnly}</li>
            </ul>
          ) : null}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Total Bill Amount<span className="text-danger">*</span></Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.totalBillAmount}
            name="totalBillAmount"
            onChange={handleChange}
            onBlur={handleBlur}
            label="-----Total Bill Amount-----"
          />
          {errors.numberOnly && touched.numberOnly ? (
            <ul className="parsley-errors-list filled" id="parsley-id-30">
              <li className="parsley-required">{errors.numberOnly}</li>
            </ul>
          ) : null}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Deduction Amount<span className="text-danger">*</span></Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.totalDeductionAmount}
            name="totalDeductionAmount"
            onChange={handleChange}
            onBlur={handleBlur}
            label="-----Deduction Amount-----"
          />
          {errors.numberOnly && touched.numberOnly ? (
            <ul className="parsley-errors-list filled" id="parsley-id-30">
              <li className="parsley-required">{errors.numberOnly}</li>
            </ul>
          ) : null}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Cleared Bill Amount<span className="text-danger">*</span></Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            value={values.totalClearBillAmount}
            name="totalClearBillAmount"
            onChange={handleChange}
            onBlur={handleBlur}
            label="-----Cleared Bill Amount-----"
          />
          {errors.numberOnly && touched.numberOnly ? (
            <ul className="parsley-errors-list filled" id="parsley-id-30">
              <li className="parsley-required">{errors.numberOnly}</li>
            </ul>
          ) : null}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Remarks</Col>
        <Col>
          <TextField fullWidth
            sx={{ width: 300 }}
            value={values.remarks}
            name="remarks"
            onChange={handleChange}
            label="-----Remarks-----"
          />
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-center gap-2">
        <Button variant="dark" onClick={handleSubmit}>
          Save
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            outletContext.setActiveTab(0);
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};
export default TransporterFill;
