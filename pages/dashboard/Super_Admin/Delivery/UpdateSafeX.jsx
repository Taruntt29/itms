import { Button, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState } from "react";
import { putAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";
import CustomModal from "../../..//../components/modal/CustomModal";
const UpdateSafeX = () => {
  const role = [
    { value: "By Road", label: "By Road" },
    { value: "By Air", label: "By Air" },
  ];
  const [outletContext] = useOutletContext();
  const getDataById = outletContext.merge;
  const allSelectData = useSelector((state) => state.selectData);
  const [userAdded, setUserAdded] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    id: getDataById.id,
    transporterName: getDataById?.transporterName
      ? getDataById?.transporterName
      : "",
    transporterMode: getDataById?.transporterMode
      ? getDataById?.transporterMode
      : "",
    transportChargeNorth: getDataById?.transportChargeNorth
      ? getDataById?.transportChargeNorth
      : "",
    transportChargeEast: getDataById?.transportChargeEast
      ? getDataById?.transportChargeEast
      : "",
    transportChargeWest: getDataById?.transportChargeWest
      ? getDataById?.transportChargeWest
      : "",
    transportChargeSouth: getDataById?.transportChargeSouth
      ? getDataById?.transportChargeSouth
      : "",
    transportChargeNorthEast: getDataById?.transportChargeNorthEast
      ? getDataById?.transportChargeNorthEast
      : "",
    valueSurcharges: getDataById?.valueSurCharges,
    eccCharges50To100: getDataById?.eccCharges50to100
      ? getDataById?.eccCharges50to100
      : "",
    waybillCharge: getDataById?.waybillCharge,
    nriskChargeMinimumValue: getDataById?.nriskChargeMinimumValue
      ? getDataById?.nriskChargeMinimumValue
      : "",
    safeExtensionCharge: getDataById?.safeExtensionCharge,
    fsChargesInPercentage: getDataById?.fsChargesInPercentage
      ? getDataById?.fsChargesInPercentage
      : "",
    stateSurCharges: getDataById?.stateSurCharges,
  });
  const onFormDataChange = (e, selectValue) => {
    let { name, value } = e.target;
    if (selectValue !== undefined) {
      name = "transporterMode";
      value = selectValue.label;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const onSubmitHandler = async () => {
    const response = await putAPI(
      apiEndpoints.UpdateDeliveryPartnerData + getDataById.createdBy,
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
          Data Updated Successfully.
        </p>
      </CustomModal>
      <h2>SafeX From</h2>
      <br />
      <br />
      <Row>
        <Col xs={12} md={2}>
          Mode
        </Col>
        <Col xs={12} md={4}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={role}
            sx={{ width: "100%" }}
            value={getDataById.transporterMode}
            name="travelMode"
            onChange={onFormDataChange}
            renderInput={(params) => (
              <TextField {...params} label="-----Select Mode-----" />
            )}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} md={2}>
          Transport Charge
        </Col>
        <Col xs={12} md={2}>
          <TextField
            fullWidth
            sx={{ width: "100%" }}
            label="-----North-----"
            value={formData.transportChargeNorth}
            name="transportChargeNorth"
            onChange={onFormDataChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <TextField
            fullWidth
            sx={{ width: "100%" }}
            label="-----South-----"
            value={formData.transportChargeSouth}
            name="transportChargeSouth"
            onChange={onFormDataChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <TextField
            fullWidth
            sx={{ width: "100%" }}
            label="-----East-----"
            value={formData.transportChargeEast}
            name="transportChargeEast"
            onChange={onFormDataChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <TextField
            fullWidth
            sx={{ width: "100%" }}
            label="-----West-----"
            value={formData.transportChargeWest}
            name="transportChargeWest"
            onChange={onFormDataChange}
          />
        </Col>
        <Col xs={12} md={2}>
          <TextField
            fullWidth
            sx={{ width: "100%" }}
            label="-----North East-----"
            value={formData.transportChargeNorthEast}
            name="transportChargeNorthEast"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} md={2}>
          VALUE SURCHARGES
        </Col>
        <Col xs={12} md={4}>
          <TextField
            fullWidth
            sx={{ width: "100%" }}
            label="-----VALUE SURCHARGES-----"
            value={formData.valueSurcharges}
            name="valueSurcharges"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} md={2}>
          WAYBILL CHARGE
        </Col>
        <Col xs={12} md={4}>
          <TextField
            fullWidth
            sx={{ width: "100%" }}
            label="-----WAYBILL CHARGE-----"
            value={formData.waybillCharge}
            name="waybillCharge"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} md={2}>
          SAFE EXTENSION CHARGE
        </Col>
        <Col xs={12} md={4}>
          <TextField
            fullWidth
            sx={{ width: "100%" }}
            label="-----SAFE EXTENSION CHARGE-----"
            value={formData.safeExtensionCharge}
            name="safeExtensionCharge"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} md={2}>
          FS CHARGES IN %
        </Col>
        <Col xs={12} md={4}>
          <TextField
            fullWidth
            sx={{ width: "100%" }}
            label="-----FS CHARGES IN %-----"
            value={formData.fsChargesInPercentage}
            name="fsChargesInPercentage"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12} md={2}>
          STATE SUR CHARGES
        </Col>
        <Col xs={12} md={4}>
          <TextField
            fullWidth
            sx={{ width: "100%" }}
            label="-----STATE SUR CHARGES-----"
            value={formData.stateSurCharges}
            name="stateSurCharges"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <div className="d-flex justify-content-center gap-2">
        <Button variant="dark" onClick={onSubmitHandler}>
          Save
        </Button>
        <Button
          variant="danger"
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
export default UpdateSafeX;
