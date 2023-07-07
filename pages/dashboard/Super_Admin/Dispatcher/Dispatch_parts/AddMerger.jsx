import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useOutletContext } from "react-router-dom";
import { postAPI } from "../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../components/Api/ApiEndpoint";
import CustomModal from "../../../../modal/CustomModal";

function AddMerger() {
  const [outletContext] = useOutletContext();
  const [mergeList, setMergeList] = useState([""]); // State to store merge dispatch list
  const [userAdded, setUserAdded] = useState(false);

  const addTextField = () => {
    setMergeList([...mergeList, ""]); // Add an empty string to the mergeList state
  };

  const removeTextField = (index) => {
    const updatedList = [...mergeList];
    updatedList.splice(index, 1);
    setMergeList(updatedList);
  };

  const handleChange = (index, value) => {
    const updatedList = [...mergeList];
    updatedList[index] = value;
    setMergeList(updatedList);
  };
  const [dispatchNo, setDispatchNo] = useState("");
  const dispatchChangeHandler = (e) => {
    setDispatchNo(e.target.value);
  };
  const saveHandler = async () => {
    const data = {
      dispatchList: dispatchNo,
      mergerDispatchList: mergeList,
    };

    const updateResponse = await postAPI(
      apiEndpoints.saveMergerDispatchData,
      data
    );

    if (updateResponse.status === "Success") {
      setUserAdded(true);
    }
  };
  const afterSuccessRedirect = () => {
    setUserAdded(false);
    outletContext.setActiveTab(33);
  };

  return (
    <>
      <div className="mt-3">
        <CustomModal
          show={userAdded}
          onHide={afterSuccessRedirect}
          header={false}
          closeButton={false}
          footer={false}
        >
          <p className="text-center text-success my-0">
            Dispatch Added Successfully.
          </p>
        </CustomModal>
        <div className="d-flex justify-content-between">
          <h3>Add Merger Dispatch</h3>
          <div className="d-flex justify-content-end gap-2">
            <Button onClick={saveHandler} variant="danger">
              {" "}
              Add All
            </Button>
            <Button
              variant="dark"
              onClick={() => {
                outletContext.setActiveTab(33);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
        <br />
        <div>
          <Row>
            <Col>
              <TextField
                label="Dispatch List No."
                variant="outlined"
                value={dispatchNo}
                onChange={dispatchChangeHandler}
              />
            </Col>
            <Col>
              {mergeList.map((value, index) => (
                <Row key={index} className="my-2">
                  <Col>
                    <TextField
                      label="Merge Dispatch List"
                      variant="outlined"
                      value={value}
                      onChange={(e) => handleChange(index, e.target.value)}
                    />
                  </Col>
                  {index === 0 ? (
                    <Col xs="auto" className="d-flex align-items-center">
                      <Button
                        className="rounded-circle p-2"
                        onClick={addTextField}
                      >
                        <AddCircleIcon className="m-auto" />
                      </Button>
                    </Col>
                  ) : (
                    <Col xs="auto" className="d-flex align-items-center">
                      <Button
                        className="rounded-circle p-2"
                        onClick={() => removeTextField(index)}
                      >
                        <CloseIcon className="m-auto" />
                      </Button>
                    </Col>
                  )}
                </Row>
              ))}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}

export default AddMerger;
