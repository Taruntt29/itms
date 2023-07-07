import { Button, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useOutletContext } from "react-router-dom";

import React, { useState } from "react";

const TransporterCharges = () => {
  const entity = [
    { label: "North" },
    { label: "East" },
    { label: "West" },
    { label: "Central" },
    { label: "South" },
    { label: "North East" },
  ];
  const role = [{ label: "By Road" }, { label: "BY Air" }];
  const [outletContext] = useOutletContext();
  const [startDate, setStartDate] = useState(null);
  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    filterResults(date, endDate);
  };
  const onSubmitHandler = () => {};
  return (
    <>
      <h2>Transporter Charges</h2>
      <br />
      <Row>
        <Col>Region</Col>
        <Col>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={entity}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="-----Select Region-----" />
            )}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Transport By</Col>
        <Col>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={role}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="-----Select Transport-----" />
            )}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Transporter Name</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Transporter Name-----"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Charges</Col>
        <Col>
          <TextField fullWidth sx={{ width: 300 }} label="-----Charges-----" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Fuel Surcharges</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Fuel Surcharges-----"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>DOC Charges</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----DOC Charges-----"
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Currency ADJ</Col>
        <Col>
          <TextField fullWidth sx={{ width: 300 }} label="-----Currency-----" />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>Applied On</Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            type="date"
            id="start-date"
            name="start-date"
            value={startDate}
            onChange={handleStartDateChange}
          />{" "}
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
            outletContext.setActiveTab(0);
          }}
        >
          Cancel
        </Button>
      </div>
    </>
  );
};

export default TransporterCharges;
