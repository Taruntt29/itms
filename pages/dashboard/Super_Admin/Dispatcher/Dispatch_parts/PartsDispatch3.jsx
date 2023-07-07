import React, { useState, useRef, useEffect } from "react";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { useSelector } from "react-redux";
import { getAPI, putAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";
import { useOutletContext } from "react-router-dom";

import beepSound from "./beep.mp3";
import CustomModal from "../../../../modal/CustomModal";

function PartsDispatch3() {
  const [outletContext] = useOutletContext();
  const [userAdded, setUserAdded] = useState(false);
  const [allItemsMatchedModal, setAllItemsMatchedModal] = useState(false);
  const userData = useSelector((state) => state.user.userData);
  const lrData = outletContext.dispatcher;
  const [alreadyMatched, setAlreadyMatched] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showSubmitButton, setShowSubmitButton] = useState(true);
  const scanInvoiceInputRef = useRef(null);
  const [allItemsMatched, setAllItemsMatched] = useState(false);
  const invoiceValue = outletContext.qRValue;

  const [data, setData] = useState([]);

  useEffect(() => {
    const getDocNumber = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getReflexParcelDetailsByInvoicebyQrnCode}${invoiceValue}`
        );

        setData(response.data);
        const x = response.data.data.parcelDetails.map((itm) => ({
          alphabet: itm.parcelNo,
          match: "",
        }));

        setTableData(x);
      } catch (error) {
        console.error(error);
      }
    };

    getDocNumber();
  }, [invoiceValue]);

  useEffect(() => {
    const allMatched = tableData.every((item) => item.match === "Match");
    setAllItemsMatched(allMatched);
  }, [tableData]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue.length === 13) {
      const updatedTableData = [...tableData];
      const matchIndex = updatedTableData.findIndex(
        (item) => item.alphabet === inputValue
      );

      if (matchIndex !== -1) {
        const matchItem = updatedTableData[matchIndex];
        if (matchItem.match === "Match") {
          setAlreadyMatched(true);
          playBeepSound();
        } else {
          matchItem.match = "Match";
          setTableData((prevTableData) => {
            const updatedData = [...prevTableData];
            updatedData.splice(matchIndex, 1);
            updatedData.push(matchItem);
            return updatedData;
          });
          scanInvoiceInputRef.current.value = "";
          handleMatch(); // Call handleMatch when the match is found
        }
      } else {
        setTableData(updatedTableData);
        scanInvoiceInputRef.current.value = "";
        playBeepSound();
        setUserAdded(true); // Play the beep sound when the match is not found
      }
    }
  };

  const handleUpdate = async () => {
    const adminData = {
      id: lrData.id,
      status: "send to admin",
    };

    try {
      const response = await putAPI(
        `${apiEndpoints.updateInvPartOfStatus}${userData.userId}`,
        adminData
      );

      if (response.status === "Success") {
        outletContext.setActiveTab(19);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    const submitData = {
      id: lrData.id,
      status: "Submit",
    };

    try {
      const response = await putAPI(
        `${apiEndpoints.updateInvPartOfStatus}${userData.userId}`,
        submitData
      );

      if (response.status === "Success") {
        setAllItemsMatchedModal(true);
        // outletContext.setActiveTab(19);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const allMatched = tableData.every((item) => item.match === "Match");
    setAllItemsMatched(allMatched);
    if (allMatched) {
      handleSubmit(); // Perform handleSubmit automatically
      outletContext.setActiveTab(19); // Set the active tab
    }
  }, [tableData]);

  const handleMatch = async () => {
    const matchData = {
      id: lrData.id,
      parcelNoIsMatchedWithDevice: "matched",
    };

    try {
      const response = await putAPI(
        `${apiEndpoints.updateParcel}${userData.userId}`,
        matchData
      );
    } catch (error) {
      console.error(error);
    }
  };

  const playBeepSound = () => {
    const audio = new Audio(beepSound);
    audio.play();
  };

  return (
    <div className="mt-3 container">
      <CustomModal
        show={userAdded}
        onHide={() => {
          setUserAdded(false);
          scanInvoiceInputRef.current.value = ""; // Reset the input field
        }}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">Data is Not Matched</p>
      </CustomModal>
      <CustomModal
        show={alreadyMatched}
        onHide={() => {
          setAlreadyMatched(false);
          scanInvoiceInputRef.current.value = ""; // Reset the input field
        }}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">Data is Already Matched</p>
      </CustomModal>
      <CustomModal
        show={allItemsMatchedModal}
        onHide={() => setAllItemsMatchedModal(false)}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-success my-0">
          All items are matched successfully!
        </p>
      </CustomModal>
      <div className="row">
        <div className="col-md-6">
          <TextField
            label="Parcel Number"
            variant="outlined"
            className="w-100"
            sx={{ width: 200 }}
            inputRef={scanInvoiceInputRef}
            autoFocus
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6 d-flex justify-content-end align-items-center">
          {!showSubmitButton && ( // Conditionally render submit button
            <Button variant="success" className="me-2" onClick={handleSubmit}>
              Submit
            </Button>
          )}
          {allItemsMatched ? (
            <Button variant="success" className="me-2" onClick={handleSubmit}>
              Submit
            </Button>
          ) : (
            <Button onClick={handleUpdate}>Send to Admin</Button>
          )}
        </div>
      </div>
      <br />
      <div className="justify-content-center mt-1">
        <table className="table">
          <thead>
            <tr>
              <th>Parcel</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr
                key={index}
                style={{
                  fontWeight: item.match === "Match" ? "bold" : "normal",
                  color: item.match === "Match" ? "green" : "inherit",
                }}
              >
                <td>{item.alphabet}</td>
                <td>
                  {item.match === "Match" && (
                    <React.Fragment>
                      <span style={{ visibility: "hidden" }}>{item.match}</span>
                      <DoneOutlineIcon
                        style={{ color: "green" }}
                        onClick={handleMatch}
                      />
                    </React.Fragment>
                  )}
                  {item.match !== "Match" && item.match}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PartsDispatch3;
