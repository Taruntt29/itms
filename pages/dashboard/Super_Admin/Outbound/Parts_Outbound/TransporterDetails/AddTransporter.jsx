import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { transporterSchema } from "../../../../../../utils/RegEx";
import { getAPI, postAPI } from "../../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../../components/Api/ApiEndpoint";
import { useOutletContext } from "react-router-dom";
import CustomModal from "../../../../../../components/modal/CustomModal";
import Autocomplete from "@mui/material/Autocomplete";
const AddTransporter = () => {
  const transporterData = [
    { value: "Blue_Dart", label: "Blue Dart" },
    { value: "SafeX", label: "SafeX" },
  ];
  const [outletContext] = useOutletContext();
  const [error, setError] = useState(null);
  const [userAdded, setUserAdded] = useState(false);
  const [transId, setModeValue] = useState();
  const [transporterIdExists, setTransporterExists] = useState(false);
  const initialValues = {
    transporterId: "",
    transporterName: "",
    transporterState: "",
    transporterPinCode: "",
    address: "",
    transporterGst: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: transporterSchema,
      onSubmit: async (values, action) => {
        const response = await postAPI(
          apiEndpoints.saveTransporterMasterdata,
          values
        );
        if (response.status === "Success") {
          setUserAdded(true);
        } else if (response.status === "Fail") {
          setTransporterExists(true);
        } else {
          setError(true);
        }
      },
    });
  /* * *********************************************************************
   * * Function name : afterSuccessRedirect
   * * Developed By : Ashish Umrao
   * * Purpose  : This function used for afterSuccessRedirect
   * * Date : 23 JUNE 2023
   * * **********************************************************************/
  const afterSuccessRedirect = () => {
    resetFlags;
    outletContext.setActiveTab(53);
  };
  // ------------
  const resetFlags = () => {
    setUserAdded(false);
    setError(false);
  };
  /* * *********************************************************************
   * * Function name : handle Select dropdown
   * * Developed By : Ashish Umrao
   * * Purpose  : This function used for selectFile
   * * Date : 01 MAY 2023
   * * **********************************************************************/
  const handleSelect = (e, selectValue) => {
    let { name, value } = e.target;
    if (selectValue !== undefined) {
      name = "transporterId";
      value = selectValue.value;
    }
    setModeValue((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  /************************************************************************
   **********************************************************************/
  return (
    <>
      <CustomModal
        show={userAdded}
        onHide={afterSuccessRedirect}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-success my-0">
          User Added Successfully.
        </p>
      </CustomModal>
      <CustomModal
        show={transporterIdExists}
        onHide={() => setTransporterExists(false)}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">User ID already exists.</p>
      </CustomModal>
      <h2>Add Transporter</h2>
      <br />
      <Row>
        <Col>Transpoter Id</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Transpoter ID-----"
            value={values.transporterId}
            name="transporterId"
            onChange={handleChange}
          />
          {/* <Autocomplete
            disablePortal
            sx={{ width: 300 }}
            name = "transporterId"
            options={transporterData}
            onChange={handleSelect}
            renderInput={(params) => (
              <TextField {...params} label="-----Select Mode-----" />
            )}
          /> */}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          Transpoter Name<span className="text-danger">*</span>
        </Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Transpoter Name-----"
            value={values.transporterName}
            name="transporterName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.transporterName && touched.transporterName ? (
            <ul className="parsley-errors-list filled" id="parsley-id-30">
              <li className="parsley-required">{errors.transporterName}</li>
            </ul>
          ) : null}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Transpoter State</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Transpoter State-----"
            value={values.transporterState}
            name="transporterState"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          Transpoter Pincode<span className="text-danger">*</span>
        </Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Transpoter Pincode-----"
            value={values.transporterPinCode}
            name="transporterPinCode"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.transporterPinCode && touched.transporterPinCode ? (
            <ul className="parsley-errors-list filled" id="parsley-id-30">
              <li className="parsley-required">{errors.transporterPinCode}</li>
            </ul>
          ) : null}
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Transpoter Address</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Transpoter Address-----"
            value={values.address}
            name="address"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Transpoter Gst Number</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----TTranspoter Gst Number-----"
            value={values.transporterGst}
            name="transporterGst"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-center gap-2">
        <Button variant="success" onClick={handleSubmit}>
          Save
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            outletContext.setActiveTab(53);
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};
export default AddTransporter;
