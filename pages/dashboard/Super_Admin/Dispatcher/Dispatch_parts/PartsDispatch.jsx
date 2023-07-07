import React, { useEffect, useState, useRef } from "react";
import { TextField } from "@mui/material";
import { Button, Row } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { getAPI, putAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";
import { useSelector } from "react-redux";
import CustomModal from "../../../../modal/CustomModal";

function PartsDispatch() {
  const userData = useSelector((state) => state.user.userData);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const invoiceTextFieldRef = useRef(null);
  const name = [{ label: "BlueDart" }, { label: "SafeX" }];
  const mode = [
    { label: "By Air" },
    { label: "By Road" },
    { label: "By Ship" },
  ];
  const [showCurrentScreen, setShowCurrentScreen] = useState(true);
  const [invoiceValue, setInvoiceValue] = useState("");

  const [outletContext] = useOutletContext();

  const handleCancelLR = () => {
    setShowCurrentScreen(true);
  };
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleProceed = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getReflexParcelDetailsByInvoicebyQrnCode}${invoiceValue}`
        );
        setData(response.data);

        if (response.status === "Success") {
          setShowCurrentScreen(false);
        } else {
          setErrorModalVisible(true);
          setErrorMessage(response.errorMsg);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (invoiceValue.length > 3) {
      handleProceed();
    }
  }, [invoiceValue]);

  const closeModal = () => {
    setErrorModalVisible(false);
    setInvoiceValue(""); // Clear the invoice value
    invoiceTextFieldRef.current.focus(); // Set autofocus on the TextField
  };
  const [data1, setData1] = useState([]);
  const [lrNumberValue, setLRNumberValue] = useState("");
  const [transporterName, setTransporterName] = useState("");

  const handleUpdate = async () => {
    const lrData = {
      id: data?.data?.primeryInvoicePartsId,
      transporterMode: mode[1]?.label,
      lrNumber: lrNumberValue,
      transporterName: name[0]?.label,
    };

    try {
      const response = await putAPI(
        `${apiEndpoints.updateInvPartOfTranModeLrNumAndTranName}${userData.userId}`,
        lrData
      );

      setData1(response.data1);
      setShowCurrentScreen(false);
      if (response.status === "Success") {
        outletContext.setActiveTab(21);
        outletContext.setDispatcher(lrData);
        outletContext.setQRValue(invoiceValue);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!showCurrentScreen) {
    return (
      <div className="justify-content-center gap-3 mt-4">
        <h4>LR Number</h4>
        <Row>
          <TextField
            label="LR Number"
            variant="outlined"
            autoFocus
            className="justify-content-center"
            sx={{ width: 280 }}
            value={lrNumberValue}
            onChange={(e) => setLRNumberValue(e.target.value)}
          />
        </Row>
        <br />
        <Row>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={name}
            defaultValue={data?.data?.transporterName}
            freeSolo // Allow manual typing
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="-----Transporter Name-----" />
            )}
            onChange={(event, value) => {
              setTransporterName(value);
            }}
          />
        </Row>
        <br />
        <Row>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={mode}
            defaultValue={mode[1]} // Set default value to "By Road"
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="-----Transporter Mode-----" />
            )}
          />
        </Row>
        <span className="d-flex justify-content-center mt-2 p-3 gap-4">
          <Button
            variant="danger"
            // onClick={() => {
            //   outletContext.setActiveTab(21);
            // }}
            onClick={handleUpdate}
          >
            Update
          </Button>
          <Button variant="dark" onClick={handleCancelLR}>
            Cancel
          </Button>
        </span>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <CustomModal
        show={errorModalVisible}
        onHide={closeModal}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">{errorMessage}</p>
      </CustomModal>
      <h3>Parts Dispatch</h3>
      <div className="justify-content-center gap-3">
        <h4>Scan Invoice</h4>
        <TextField
          label="Scan Invoice"
          variant="outlined"
          autoFocus
          className="justify-content-center"
          value={invoiceValue}
          onChange={(e) => setInvoiceValue(e.target.value)}
          inputRef={invoiceTextFieldRef}
        />
        <br />
      </div>
      <br />
    </div>
  );
}

export default PartsDispatch;
