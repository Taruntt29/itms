import { Button, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { postAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";
import CustomModal from "../../..//../components/modal/CustomModal";
const blueDartFrom = () => {
  const role = [
    { value: "By Road", label: "By Road" },
    { value: "By Air", label: "By Air" },
  ];
  const [outletContext] = useOutletContext();
  const allSelectData = useSelector((state) => state.selectData);
  const [userAdded, setUserAdded] = useState(false);
  const [error, setError] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [formData, setFormData] = useState({
    transporterName: "BlueDart",
    transporterMode: "",
    transportChargeNorth: "",
    transportChargeEast: "",
    transportChargeWest: "",
    transportChargeSouth: "",
    transportChargeNorthEast: "",
    eccChargesTill50: "",
    eccCharges50To100: "",
    eccCharges100Plus: "",
    nRiskChargePercentage: "",
    nRiskChargeMinValue: "",
    rasCharge: "",
    fsChargeInPercntg: "",
    cafChargeInPercntg: "",
  });
  const onFormDataChange = (e, selectValue) => {
    let { name, value } = e.target;
    if (selectValue !== undefined) {
      value = selectValue.value;
      name = "transporterMode";
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const onSubmitHandler = async () => {
    const response = await postAPI(
      apiEndpoints.saveDeliveryPartnerData,
      formData
    );
    if (response.status === "Success") {
      setUserAdded(true);
    } else if (response.status === "Fail") {
      setUserExists(true);
    } else {
      setError(true);
    }
  };
  const afterSuccessRedirect = () => {
    resetFlags;
    outletContext.setActiveTab(39);
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
          Data Added Successfully.
        </p>
      </CustomModal>
      <h2>BlueDart From</h2>
      <br />
      <br />
      <Row>
        <Col xs={12} sm={6} md={3}>
          Mode
        </Col>
        <Col xs={12} sm={6} md={3}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={role}
            sx={{ width: "100%" }}
            onChange={onFormDataChange}
            renderInput={(params) => (
              <TextField {...params} label="-----Select Mode-----" />
            )}
          />
        </Col>
        <Col xs={12} sm={6} md={3}></Col>
        <Col xs={12} sm={6} md={3}></Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} sm={6} md={3}>
          Transport Charge
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----North-----"
            value={formData.transportChargeNorth}
            name="transportChargeNorth"
            onChange={onFormDataChange}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----South-----"
            value={formData.transportChargeSouth}
            name="transportChargeSouth"
            onChange={onFormDataChange}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----East-----"
            value={formData.transportChargeEast}
            name="transportChargeEast"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} sm={6} md={3}>
          ECC CHARGES
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----TILL 50-----"
            value={formData.eccChargesTill50}
            name="eccChargesTill50"
            onChange={onFormDataChange}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----50 TO 100-----"
            value={formData.eccCharges50To100}
            name="eccCharges50To100"
            onChange={onFormDataChange}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----100+-----"
            value={formData.eccCharges100Plus}
            name="eccCharges100Plus"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} sm={6} md={3}>
          NRISK CHARGE
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----PERCENTAGE-----"
            value={formData.nRiskChargePercentage}
            name="nRiskChargePercentage"
            onChange={onFormDataChange}
          />
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----MINIMUM VALUE-----"
            value={formData.nRiskChargeMinValue}
            name="nRiskChargeMinValue"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} sm={6} md={3}>
          RAS CHARGE
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----RAS CHARGE-----"
            value={formData.rasCharge}
            name="rasCharge"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} sm={6} md={3}>
          FS CHARGES IN %
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----FS CHARGES IN %-----"
            value={formData.fsChargeInPercntg}
            name="fsChargeInPercntg"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} sm={6} md={3}>
          CAF CHARGES IN %
        </Col>
        <Col xs={12} sm={6} md={3}>
          <TextField
            fullWidth
            label="-----CAF CHARGES IN %-----"
            value={formData.cafChargeInPercntg}
            name="cafChargeInPercntg"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-center gap-2">
        <Button variant="danger" onClick={onSubmitHandler}>
          Save
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            outletContext.setActiveTab(39);
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};
export default blueDartFrom;
