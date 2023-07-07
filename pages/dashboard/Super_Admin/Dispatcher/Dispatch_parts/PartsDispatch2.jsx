import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";

function PartsDispatch2() {
  const [showCurrentScreen, setShowCurrentScreen] = useState(true);
  const [showNewScreen, setShowNewScreen] = useState(false);
  const [lrNumber, setLRNumber] = useState("");

  useEffect(() => {
    if (lrNumber === "1234") {
      setShowCurrentScreen(false);
      setShowNewScreen(false);
    } else {
      setShowCurrentScreen(true);
      setShowNewScreen(false);
    }
  }, [lrNumber]);

  const handleCancel = () => {
    setLRNumber("");
  };

  const handleScanInvoiceChange = (event) => {
    setLRNumber(event.target.value);
  };

  if (!showCurrentScreen) {
    return (
      <div className="justify-content-center gap-3 mt-4">
        <h4>Invoice Number</h4>
        <TextField
          label="Scan Invoice"
          variant="outlined"
          className="justify-content-center"
          value={lrNumber}
          onChange={handleScanInvoiceChange}
        />
        <span className="d-flex justify-content-center mt-2 p-3 gap-4">
          <Button variant="dark" onClick={handleCancel}>
            Cancel
          </Button>
        </span>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h3>Parts Dispatch</h3>

      <div className="justify-content-center gap-3">
        <h4>Scan Invoice</h4>
        <TextField
          label="Scan Invoice"
          variant="outlined"
          className="justify-content-center"
          value={lrNumber}
          onChange={handleScanInvoiceChange}
        />
      </div>
      <br />
    </div>
  );
}

export default PartsDispatch2;
