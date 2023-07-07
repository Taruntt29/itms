import { IconButton, InputAdornment } from "@mui/material";
import DashboardFormInput from "../../../components/dashboard-form-input/DashboardFormInput";
import { useEffect, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button } from "react-bootstrap";

const ChangePassword = () => {
  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setPasswordDetails((prevState) => ({ ...prevState, [name]: value }));
  };
  const validatePasswordMatch = (e) => {
    if (
      passwordDetails.newPassword.length !== 0 &&
      e.target.value.length !== 0
    ) {
      if (passwordDetails.newPassword !== e.target.value) {
        setPasswordMatch(false);
      } else {
        setPasswordMatch(true);
      }
    }
  };
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const passwordToggleHandler = (name) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const resetFields = () => {
    setPasswordDetails({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setShowPassword({
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    });
    setPasswordMatch(true);
  };
  const updatePasswordHandler = () => {
    if (!passwordMatch) {
      return;
    }
    resetFields();
  };

  const [eyeButtons, setEyeButtons] = useState({});
  useEffect(() => {
    const createEyeButtons = () => {
      const buttons = {};
      ["oldPassword", "newPassword", "confirmNewPassword"].forEach((name) => {
        buttons[name] = (
          <InputAdornment position="end">
            <IconButton
              onClick={passwordToggleHandler.bind(null, name)}
              edge="end"
            >
              {showPassword[name] ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        );
      });
      setEyeButtons(buttons);
    };
    createEyeButtons();
  }, [showPassword]);
  return (
    <div className="mt-5">
      <DashboardFormInput
        divClassName="d-flex justify-content-between align-items-center my-3"
        label="Current Password"
        labelClassName="w-200px"
        isRequired={false}
        className="w-300px"
        textField={{
          // type: showPassword ? "text" : "password",
          type: showPassword.oldPassword ? "text" : "password",
          value: passwordDetails.oldPassword,
          onChange: inputChangeHandler,
          name: "oldPassword",
          // InputProps: { endAdornment: passwordEyeButton },
          InputProps: { endAdornment: eyeButtons.oldPassword },
        }}
      />
      <DashboardFormInput
        divClassName="d-flex justify-content-between align-items-center my-3"
        label="New Password"
        labelClassName="w-200px"
        isRequired={false}
        className="w-300px"
        textField={{
          type: showPassword.newPassword ? "text" : "password",
          value: passwordDetails.newPassword,
          onChange: inputChangeHandler,
          name: "newPassword",
          InputProps: { endAdornment: eyeButtons.newPassword },
        }}
      />
      <DashboardFormInput
        divClassName="d-flex justify-content-between align-items-center my-3"
        label="Confirm Password"
        labelClassName="w-200px"
        isRequired={false}
        className="w-300px"
        textField={{
          type: showPassword.confirmNewPassword ? "text" : "password",
          value: passwordDetails.confirmNewPassword,
          onChange: inputChangeHandler,
          onBlur: validatePasswordMatch,
          name: "confirmNewPassword",
          InputProps: { endAdornment: eyeButtons.confirmNewPassword },
          error: !passwordMatch,
          helperText: passwordMatch ? "" : "Confirm Password do not match.",
        }}
      />
      <div className="d-flex justify-content-center mx-5 mt-5">
        <Button
          variant="dark"
          className="rounded-pill px-5"
          onClick={updatePasswordHandler}
        >
          Update Password
        </Button>
      </div>
    </div>
  );
};

ChangePassword.propTypes = {};

export default ChangePassword;
