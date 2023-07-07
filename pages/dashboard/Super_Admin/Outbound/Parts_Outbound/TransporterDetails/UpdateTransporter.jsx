import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { transporterSchema } from "../../../../../../utils/RegEx";
import CustomModal from "../../../../../../components/modal/CustomModal";
import { useOutletContext } from "react-router-dom";
import { getAPI, putAPI } from "../../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../../components/Api/ApiEndpoint";
const UpdateTransporter = () => {
  const [userAdded, setUserAdded] = useState(false);
  const [outletContext] = useOutletContext();
  const getDataById = outletContext.merge;
  const initialValues = {
    id: getDataById.id,
    transporterId: getDataById.transporterId,
    transporterName: getDataById.transporterName
      ? getDataById.transporterName
      : "",
    transporterState: getDataById.transporterState
      ? getDataById.transporterState
      : "",
    transporterPinCode: getDataById.transporterPinCode
      ? getDataById.transporterPinCode
      : "",
    address: getDataById.address ? getDataById.address : "",
    transporterGst: getDataById.transporterGst
      ? getDataById.transporterGst
      : "",
  };
  const [error, setError] = useState(null);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: transporterSchema,
      onSubmit: async (values, action) => {
        console.log("Updatedvalues::::::::::::::", values);
        const response = await putAPI(
          apiEndpoints.updateTransporterMasterdata + getDataById.createdBy,
          values
        );
        if (response.status === "Success") {
          setUserAdded(true);
        } else if (response.status === "Fail") {
          setUserExists(true);
        } else {
          setError(true);
        }
      },
    });
  const afterSuccessRedirect = () => {
    resetFlags;
    outletContext.setActiveTab(53);
  };
  const resetFlags = () => {
    setUserAdded(false);
    setError(false);
  };
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
          User Updated Successfully.
        </p>
      </CustomModal>
      <h2>Update Transporter</h2>
      <br />
      <Row>
        <Col>Transpoter Id</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Transpoter Id-----"
            name="transporterId"
            value={values.transporterId}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          Transpoter Name<span className="text-danger">*</span>
        </Col>
        <Col>
          {" "}
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Transpoter Name-----"
            value={values.transporterName}
            name="transporterName"
            onChange={handleChange}
            // onBlur={handleBlur}
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
          {" "}
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
          {" "}
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
          {" "}
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
          {" "}
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
          Update
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
export default UpdateTransporter;
