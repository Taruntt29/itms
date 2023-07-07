import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../../modal/CustomModal";
import { getAPI, putAPI } from "../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../components/Api/ApiEndpoint";
import { setLogout } from "../../../redux/auth-slice/auth-slice";
import { setAuthToken } from "../../../components/Api/api";

function PersonalInfo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileNumberError, setMobileNumberError] = useState("");
  const [data, setData] = useState("");
  const [showModal, setShowModal] = useState(false);

  const userData = useSelector((state) => state.user.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getUserByUserId}${userData.userId}`
        );
        if (response.errorMsg === "TOKEN HAS EXPIRED!!") {
          dispatch(setLogout());
          setAuthToken();
          return;
        }
        const userData1 = response.data;

        setName(userData1?.userName);
        setEmail(userData1?.email);
        setMobileNumber(userData1?.mobile);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, []);

  const validateForm = () => {
    let isValid = true;

    // Validate name field
    if (name.trim() === "") {
      setNameError("Name is required");
      isValid = false;
    } else {
      setNameError("");
    }

    // Validate email field
    if (email.trim() === "") {
      setEmailError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate mobile number field
    if (mobileNumber.trim() === "") {
      setMobileNumberError("Mobile number is required");
      isValid = false;
    } else if (!/^[0-9\b]+$/.test(mobileNumber)) {
      setMobileNumberError("Invalid mobile number");
      isValid = false;
    } else {
      setMobileNumberError("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      await handleSave();
    }
  };

  const handleSave = async () => {
    const formData = {
      userId: userData.userId,
      userName: name,
      email: email,
      mobile: mobileNumber,
    };

    try {
      const response = await putAPI(apiEndpoints.updateUser, formData);

      setData(response.data);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mt-3">
        <CustomModal
          show={showModal}
          onHide={() => setShowModal(false)}
          header={false}
          closeButton={false}
          footer={false}
        >
          <p className="text-center text-success my-0">
            Profile Updated Successfully
          </p>
        </CustomModal>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <h5>Name</h5>
            </Col>
            <Col>
              <TextField
                fullWidth
                sx={{ width: 300 }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!nameError}
                helperText={nameError}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <h5>Email</h5>
            </Col>
            <Col>
              <TextField
                fullWidth
                sx={{ width: 300 }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>
              <h5>Mobile Number</h5>
            </Col>
            <Col>
              <TextField
                fullWidth
                sx={{ width: 300 }}
                value={mobileNumber}
                inputProps={{ maxLength: 10 }}
                onChange={(e) => setMobileNumber(e.target.value)}
                error={!!mobileNumberError}
                helperText={mobileNumberError}
              />
            </Col>
          </Row>
          <br />
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default PersonalInfo;
