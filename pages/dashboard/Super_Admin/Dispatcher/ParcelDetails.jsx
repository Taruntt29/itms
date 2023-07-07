import React, { useState } from "react";
import { Button, Col, InputGroup, Row, Table } from "react-bootstrap";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const InputField = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  feedback,
}) => {
  return (
    <>
      <label htmlFor={name} className="input-label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="form-control input-background"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {feedback && <div className="invalid-feedback">{feedback}</div>}
    </>
  );
};

const ParcelDetails = ({ setPropertyFormData, currentlyComparing }) => {
  const [price, setPrice] = useState({
    parcel: "",
    matched: "",
    delete: "no",
    pass: "no",
    remarks: "",
  });

  const handleAddRow = () => {
    if (
      price.parcel &&
      price.matched &&
      price.delete &&
      price.pass &&
      price.remarks
    ) {
      const newRow = { ...price };

      if (Array.isArray(currentlyComparing)) {
        setPropertyFormData((prevPropertyFormData) => ({
          ...prevPropertyFormData,
          currentlyComparing: [...currentlyComparing, newRow],
        }));
      } else {
        setPropertyFormData((prevPropertyFormData) => ({
          ...prevPropertyFormData,
          currentlyComparing: [newRow],
        }));
      }

      setPrice({
        parcel: "",
        matched: "",
        delete: "no",
        pass: "no",
        remarks: "",
      });
    }
  };

  const handleChange = (e) => {
    setPrice((prevPrice) => ({
      ...prevPrice,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Row className="d-flex gy-2">
        <Col>
          <InputField
            label="PARCEL(NO)"
            name="parcel"
            type="text"
            placeholder="PARCEL"
            value={price.parcel}
            onChange={handleChange}
            feedback="Please enter a valid value"
          />
        </Col>
        <Col>
          <InputGroup>
            <label htmlFor="matched" className="input-label">
              Matched/Mismatched
            </label>
            <select
              id="matched"
              name="matched"
              value={price.matched}
              onChange={handleChange}
              className="form-select input-background"
            >
              <option value="">Select</option>
              <option value="matched">Matched</option>
              <option value="mismatched">Mismatched</option>
            </select>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <label htmlFor="delete" className="input-label">
              Manual Delete
            </label>
            <select
              id="delete"
              name="delete"
              value={price.delete}
              onChange={handleChange}
              className="form-select input-background"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <label htmlFor="pass" className="input-label">
              Manual Pass
            </label>
            <select
              id="pass"
              name="pass"
              value={price.pass}
              onChange={handleChange}
              className="form-select input-background"
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </InputGroup>
        </Col>
        <Col>
          <InputField
            label="Remarks"
            name="remarks"
            type="text"
            placeholder="Remarks"
            value={price.remarks}
            onChange={handleChange}
            feedback="Please enter a valid value"
          />
        </Col>
        <Col>
          <Button
            onClick={handleAddRow}
            className="rounded-circle p-2 d-flex justify-content-end align-items-end"
          >
            <AddCircleIcon size={48} className="m-auto circle" />
          </Button>
        </Col>
      </Row>

      {!!Array.isArray(currentlyComparing) && currentlyComparing.length > 0 && (
        <Col xs={12}>
          <Table bordered responsive className="mt-4">
            <thead>
              <tr>
                <th className="text-center">Locality</th>
                <th className="text-center">Current Price</th>
                <th className="text-center">Manual Delete</th>
                <th className="text-center">Manual Pass</th>
                <th className="text-center">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {currentlyComparing.map((row, index) => (
                <tr key={index}>
                  <td className="text-center">{row.parcel}</td>
                  <td className="text-center">{row.matched}</td>
                  <td className="text-center">{row.delete}</td>
                  <td className="text-center">{row.pass}</td>
                  <td className="text-center">{row.remarks}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      )}
    </>
  );
};

export default ParcelDetails;
