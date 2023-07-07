import React, { useState, useRef } from "react";
import { TextField } from "@mui/material";
import { Button, Row, Col } from "react-bootstrap";
import * as XLSX from "xlsx";
import CustomModal from "../../../../../components/modal/CustomModal";
import CustomSelect from "../../../../../components/input-select/CustomSelect";
import { postAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";
const fileTypeData = [
  { value: "price", label: "Price" },
  { value: "stocks", label: "Stocks" },
];
function PartsUpload() {
  const fileInputRef = useRef(null);
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileuploadsuccess, setFileUploaded] = useState("");
  const [modeType, setModeValue] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileExtension = file.name.split(".").pop();
    // Check if the selected file is in Excel format
    if (fileExtension === "xlsx" || fileExtension === "xls") {
      setFilePath(URL.createObjectURL(file));
    } else {
      // Notify the user that only Excel files are allowed
      alert("Please select an Excel file.");
    }
  };
  const handleChooseFile = () => {
    fileInputRef.current.click();
  };
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
    setFileUploaded(false);
  };
  const sampleData = [{
    "TransporterName": "",
    "LrNo": "",
    "LRDate": "",
    "Destination": "",
    "TransportInvNo": "",
    "TransporterInvdate": "",
    "TotalFreightAmount": "",
  }];
  const downloadSampleFile = () => {
    const data = sampleData.map((row) => ({
      "Transporter name": row.TransporterName,
      "LR No.": row.LrNo,
      "LR Date.": row.LRDate,
      "Destination": row.Destination,
      "Transport Inv no.": row.TransportInvNo,
      "Transporter Inv date": row.TransporterInvdate,
      "Total Freight Amount (without tax)": row.TotalFreightAmount,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
      backgroundColor: "lightblue",
    });
    const fileName = "SampleFileUpload.xlsx";
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, fileName);
  }
   /* * *********************************************************************
   * * Function name : handle Select dropdown
   * * Developed By : Ashish Umrao
   * * Purpose  : This function used for selectFile
   * * Date : 04 MAY 2023
   * * **********************************************************************/
   const handleSelect = (e) => {
    setModeValue(e.target.value);
  };
  return (
    <div className="mt-4 container">
    <CustomModal
      show={fileuploadsuccess}
      onHide={afterSuccessRedirect}
      header={false}
      closeButton={false}
      footer={false}
    >
      <p className="text-center text-success my-0">
        User Added Successfully.
      </p>
    </CustomModal>
    <div className="row">
      <div className="col-md-6">
        <h3>Excel File Uploads</h3>
      </div>
      <div className="col-md-6" style={{ paddingLeft: '385px' }}>
        <Button variant="info" onClick={downloadSampleFile}>
          Download Sample File
        </Button>
      </div>
    </div>
    <br />
    <div className="form-row">
      <Row>
        <Col xs={12} md={2}>
          <label htmlFor="">Select Mode</label>
        </Col>
        <Col xs={12} md={3}>
        </Col>
        <Col xs={12} md={2}>
          <CustomSelect
            options={fileTypeData}
            select={{
              value: modeType,
              onChange: handleSelect,
            }}
            input={{ label: "Select Mode" }}
          />
        </Col>
        <Col xs={12} md={2}>
        </Col>
      </Row>
      <br />
      <Row>
          <Col xs={12} md={2}>
          <label htmlFor="">Choose File</label>
          </Col>
          <Col xs={12} md={3}>
          </Col>
          <Col xs={12} md={3}>
          <label htmlFor="upload-file">
            <Button variant="primary" onClick={handleChooseFile}>
              Choose File
            </Button>
          </label>
          <input
            ref={fileInputRef}
            id="upload-file"
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleFileChange}
            sx={{ width: 400 }}
          />
        </Col>
        <Col xs={12} md={4}>
        </Col>
          <Col xs={12} md={2}>
          </Col>
        </Row>
      <br />
      <Row>
        <Col xs={12} md={2}>
        <label htmlFor="">File Path</label>
        </Col>
        <Col xs={12} md={3}>
        </Col>
        <Col xs={12} md={4}>
          <TextField
            fullWidth
            label="File Path"
            value={filePath}
            disabled
            sx={{ width: 300 }}
          />
        </Col>
        <Col xs={12} md={2}>
          <Button variant="success"  sx={{ width: 300 }}>
            Upload File
          </Button>
        </Col>
      </Row>
      <br />
      <br />
    </div>
  </div>
  );
}
export default PartsUpload;
