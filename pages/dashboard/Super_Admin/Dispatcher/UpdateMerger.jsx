import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { TextField } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useOutletContext } from "react-router-dom";
import CustomModal from "../../../modal/CustomModal";
import { putAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";
import { useSelector } from "react-redux";

function UpdateMerger() {
  const [outletContext] = useOutletContext();
  const [mergeList, setMergeList] = useState(
    outletContext.merge.mergerDispatchList
  );
  const [userAdded, setUserAdded] = useState(false);
  const userData = useSelector((state) => state.user.userData);
  const tarun = outletContext.merge;

  const addTextField = () => {
    setMergeList([...mergeList, ""]);
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

  const [dispatchNo, setDispatchNo] = useState(tarun.dispatchList);

  const dispatchChangeHandler = (e) => {
    setDispatchNo(e.target.value);
  };

  const saveHandler = async () => {
    const data = {
      id: tarun.id,
      dispatchList: dispatchNo,
      mergerDispatchList: mergeList,
    };

    const updateResponse = await putAPI(
      `${apiEndpoints.updateMerger}${userData.userId}`,
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
    <div className="mt-3">
      <CustomModal
        show={userAdded}
        onHide={afterSuccessRedirect}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-success my-0">
          Dispatch Updated Successfully.
        </p>
      </CustomModal>
      <div className="d-flex justify-content-between">
        <h3>Update Merger Dispatch</h3>
        <div className="d-flex justify-content-end gap-2">
          <Button onClick={saveHandler} variant="danger">
            Update
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
                    value={mergeList[index]}
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
  );
}

export default UpdateMerger;
