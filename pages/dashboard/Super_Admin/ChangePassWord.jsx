import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import CustomModal from "../../modal/CustomModal";
import { putAPI } from "../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../components/Api/ApiEndpoint";
import { TextField, IconButton, Grid } from "@mui/material";
import { Button, Col, Row } from "react-bootstrap";

function ChangePassword() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSaveChanges = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);

      try {
        const formData = {
          userId: userData.userId,
          password: userData.password,
          newPassword: newPassword,
        };

        const response = await putAPI(
          apiEndpoints.resetPasswordByUser,
          formData
        );

        setShowModal(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleNewPasswordChange = (event) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
    validatePassword(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmPassword(confirmPassword);
    validatePassword(newPassword, confirmPassword);
  };

  const validatePassword = (newPassword, confirmPassword) => {
    const lowerCaseRegex = /[a-z]/g;
    const upperCaseRegex = /[A-Z]/g;
    const numbersRegex = /[0-9]/g;

    if (!newPassword.match(lowerCaseRegex)) {
      setPasswordError("Password should contain lowercase letters!");
    } else if (!newPassword.match(upperCaseRegex)) {
      setPasswordError("Password should contain uppercase letters!");
    } else if (!newPassword.match(numbersRegex)) {
      setPasswordError("Password should contain numbers!");
    } else if (newPassword.length < 10) {
      setPasswordError("Password length should be at least 10 characters.");
    } else if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <CustomModal
          show={showModal}
          onHide={() => setShowModal(false)}
          header={false}
          closeButton={false}
          footer={false}
        >
          <p className="text-center text-success my-0">
            Password Change Successful
          </p>
        </CustomModal>
        <h4>Change Password</h4>
        <Button
          variant="dark"
          className="align-items-center"
          disabled={passwordError !== ""}
          onClick={handleSaveChanges}
        >
          Save Changes
        </Button>
      </div>
      <div className="mt-3">
        <Row>
          <Col>User Id</Col>
          <Col>
            <TextField
              name="UserId"
              label="UserId"
              variant="outlined"
              fullWidth
              value={userData.userId}
              disabled
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>Old Password</Col>
          <Col>
            <TextField
              name="OldPassword"
              label="Current Password"
              variant="outlined"
              fullWidth
              type={showNewPassword ? "text" : "password"}
              value={userData.password}
              disabled
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>New Password</Col>
          <Col>
            <TextField
              name="NewPassword"
              label="New Password"
              variant="outlined"
              fullWidth
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Enter New Password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={toggleNewPasswordVisibility}>
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>Confirm New Password</Col>
          <Col>
            <TextField
              name="ConfirmPassword"
              label="Confirm New Password"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Please Confirm Password"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
            {passwordError && (
              <div style={{ color: "red" }}>{passwordError}</div>
            )}
            {passwordMatchError && (
              <div style={{ color: "red" }}>Passwords do not match.</div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
}

export default ChangePassword;
