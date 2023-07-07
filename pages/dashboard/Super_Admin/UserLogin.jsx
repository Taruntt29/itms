import { Button, Row, Col, Form, Container, Modal } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../user/User.css";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomModal from "../../modal/CustomModal";
import { putAPI } from "../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../components/Api/ApiEndpoint";

const UserLogin = () => {
  const [showPopup, setShowPopup] = useState(false);
  // debugger;
  const division = [{ name: "division", value: "1NA", label: "1NA" }];
  const facility = [
    { name: "facility", value: "1A1", label: "1A1" },
    { name: "facility", value: "1A4", label: "1A4" },
  ];
  const warehouse = [
    { name: "wareHouse", value: "4N1", label: "4N1" },
    { name: "wareHouse", value: "1N1", label: "1N1" },
    { name: "wareHouse", value: "5N1", label: "5N1" },
  ];
  // const [selectedFacility, setSelectedFacility] = useState(facility);
  const [warehouseOptions, setWarehouseOptions] = useState(warehouse);
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    locked_status: "",
    email: "",
    mobile: "",
    // product_type: "",
    // department: "",
    wareHouse: "",
    division: "",
    facility: "",
    roles: [],
  });
  useEffect(() => {
    // debugger;
    if (formData?.facility?.value === "1A1") {
      setWarehouseOptions([
        { name: "wareHouse", value: "4N1", label: "4N1" },
        { name: "wareHouse", value: "1N1", label: "1N1" },
      ]);
      // setFormData((prev) => ({ ...prev, wareHouse: {} }));
    } else if (formData?.facility?.value === "1A4") {
      setWarehouseOptions([{ name: "wareHouse", value: "5N1", label: "5N1" }]);
      // setFormData((prev) => ({ ...prev, wareHouse: {} }));
    }
  }, [formData.facility]);

  const onFacilityChange = (event, value) => {
    setSelectedFacility(value);
    onFormDataChange(event, value);
  };

  const [outletContext] = useOutletContext();
  const user = outletContext.selectedUser;
  // console.log(user);
  const allSelectData = useSelector((state) => state.selectData);
  const [userAdded, setUserAdded] = useState(false);
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState(user?.email);
  const [userId, setUserId] = useState(user?.userId);
  const [name, setName] = useState(user?.userName);
  const [number, setNumber] = useState(user?.mobile);
  const handleResetPassword = () => {
    setShowPopup(true);
  };

  useEffect(() => {
    if (user) {
      const existingRoles = [];
      user.roles.forEach((role) => {
        const selectedRole = allSelectData.roleData.find(
          (itm) => itm.value === user.roles[0].roleId
        );
        if (selectedRole) {
          existingRoles.push(selectedRole);
        }
      });

      const selectedDivision = division.filter(
        (itm) => itm.value === user?.division
      )[0];
      const selectedWareHouse = warehouse.filter(
        (itm) => itm.value === user?.wareHouse
      )[0];
      const selectedFacility = facility.filter(
        (itm) => itm.value === user?.facility
      )[0];
      const newFormData = {
        userId: user?.userId,
        userName: user?.userName,
        locked_status: user?.locked_status === "Y" ? true : false,
        email: user?.email,
        mobile: user?.mobile,
        // product_type: user.product_type,
        // department: user.department,
        wareHouse: selectedWareHouse,
        division: selectedDivision,
        facility: selectedFacility,
        roles: existingRoles,
      };
      // debugger;
      // console.log(newFormData);

      setFormData(newFormData);

      setEmail(user?.email);
      setName(user?.userName);
      setNumber(user?.mobile);
    }
  }, [outletContext.selectedUser]);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePassword(confirmPassword);
  };

  const validatePassword = (value) => {
    const lowerCaseRegex = /[a-z]/g;
    const upperCaseRegex = /[A-Z]/g;
    const numbersRegex = /[0-9]/g;

    if (!value.match(lowerCaseRegex)) {
      setPasswordError("Password should contain lowercase letters!");
    } else if (!value.match(upperCaseRegex)) {
      setPasswordError("Password should contain uppercase letters!");
    } else if (!value.match(numbersRegex)) {
      setPasswordError("Password should contain numbers!");
    } else if (value.length < 10) {
      setPasswordError("Password length should be at least 10 characters.");
    } else if (value !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const onFormDataChange = (e, selectValue) => {
    let { name, value } = e.target;

    if (selectValue !== undefined) {
      name = selectValue.name;

      value = selectValue;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetFlags = () => {
    setUserAdded(false);
    setError(false);
  };
  const onSubmitHandler = async () => {
    resetFlags();

    debugger;
    const body = {
      ...formData,
      locked_status: formData.locked_status ? "Y" : "N", // Convert locked_status to "Y" or "N"
      roles: formData.roles.map((role) => ({ roleId: role.value })),
      division: formData.division.value,
      facility: formData.facility.value,
      wareHouse: formData.wareHouse.value,
    };
    console.log(body);

    const response = await putAPI(apiEndpoints.updateUser, body);

    if (response.status === "Success") {
      setUserAdded(true);
    } else {
      setError(true);
    }
  };

  const afterSuccessRedirect = () => {
    resetFlags;
    outletContext.setActiveTab(0);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const [data, setData] = useState([]);
  const handleSave = async () => {
    try {
      const response = await putAPI(apiEndpoints.resetPasswordByAdmin, {
        userId: user.userId,
        password: "password",
        newPassword: password,
      });

      setData(response.data);
      setShowCurrentScreen(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {" "}
      <Container className="mt-2">
        <CustomModal
          show={userAdded}
          onHide={afterSuccessRedirect}
          header={false}
          closeButton={false}
          footer={false}
        >
          <p className="text-center text-success my-0">
            User Updated Successfully.
          </p>
        </CustomModal>
        <CustomModal
          show={error}
          onHide={resetFlags}
          header={false}
          closeButton={false}
          footer={false}
        >
          <p className="text-center text-danger my-0">
            Something went wrong, please try again.
          </p>
        </CustomModal>
        <h2>User Details</h2>
        <br />
        <div className="d-flex justify-content-end gap-2">
          <Button variant="dark" onClick={handleResetPassword}>
            Reset Password
          </Button>
          <Button variant="dark" onClick={onSubmitHandler}>
            Update
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
        <br />

        <Row>
          <Col>User ID*</Col>
          <Col>
            <TextField fullWidth sx={{ width: 300 }} value={formData?.userId} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>User Name*</Col>
          <Col>
            {" "}
            <TextField
              fullWidth
              sx={{ width: 300 }}
              value={formData?.userName}
              onChange={onFormDataChange}
              name="userName"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>Role*</Col>
          <Col>
            <Autocomplete
              // multiple
              disablePortal
              id="combo-box-demo"
              options={allSelectData?.roleData}
              value={formData?.roles}
              onChange={(e, newValue) => onFormDataChange(e, newValue)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="-----Select Role-----" />
              )}
            />
          </Col>
        </Row>
        <br />
        {/* <Row>
          <Col>Product Type*</Col>
          <Col>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={type}
              value={formData.product_type}
              onChange={onFormDataChange}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="-----Select Product-----" />
              )}
            />
          </Col>
        </Row>
        <br /> */}

        {/* <Row>
            {" "}
            <Col>Branch Name</Col>
            <Col>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={allSelectData.branchData}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="-----Select Branch-----" />
                )}
              />
            </Col>
          </Row>
          <br /> */}

        {/* <Row>
          <Col>Department*</Col>
          <Col>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={department}
              value={formData.department}
              onChange={(e, newValue) => onFormDataChange(e, newValue)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="-----Select Department-----" />
              )}
            />
          </Col>
        </Row>
        <br /> */}
        <Row>
          <Col>
            Division<span className="text-danger">*</span>
          </Col>
          <Col>
            <Autocomplete
              disablePortal
              value={formData?.division}
              id="combo-box-demo"
              options={division}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="-----Division-----" />
              )}
              name="division"
              onChange={onFormDataChange}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            Facility<span className="text-danger">*</span>
          </Col>
          <Col>
            <Autocomplete
              disablePortal
              id="facility-select"
              value={formData?.facility}
              options={facility}
              onChange={onFormDataChange}
              getOptionLabel={(option) => option.label}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="-----Facility-----" />
              )}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            Warehouse<span className="text-danger">*</span>
          </Col>
          <Col>
            <Autocomplete
              disablePortal
              id="warehouse-select"
              value={formData?.wareHouse}
              options={warehouseOptions}
              onChange={onFormDataChange}
              getOptionLabel={(option) => option.label}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="-----Warehouse-----" />
              )}
            />
          </Col>
        </Row>

        <br />
        <Row>
          <Col>Locked</Col>
          <Col>
            <Form>
              {["radio"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="Yes"
                    name="group1"
                    type={type}
                    id={`inline-${type}-1`}
                    defaultChecked={user?.locked_status === "Y" ? true : false}
                  />
                  <Form.Check
                    inline
                    label="No"
                    name="group1"
                    type={type}
                    id={`inline-${type}-2`}
                    defaultChecked={user?.locked_status === "N" ? true : false}
                  />
                </div>
              ))}
            </Form>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>Email*</Col>
          <Col>
            {" "}
            <TextField
              fullWidth
              sx={{ width: 300 }}
              value={formData?.email}
              name="email"
              onChange={onFormDataChange}
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col>Mobile Number*</Col>
          <Col>
            {" "}
            <TextField
              fullWidth
              sx={{ width: 300 }}
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </Col>
        </Row>
        <br />
        <Modal
          show={showPopup}
          onHide={() => setShowPopup(false)}
          className="mt-5 align-item-center"
          size="md"
        >
          <Modal.Header className="justify-content-center" closeButton>
            <Modal.Title>Reset Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="UserId">
                <Form.Label>User Id</Form.Label>
                <Form.Control
                  name="UserId"
                  className="rounded input"
                  required
                  type="text"
                  value={user?.userId}
                  disabled
                  // value={inputName}
                  // onChange={handleNameChange}
                  placeholder="Enter User ID "
                />
              </Form.Group>
              <br />
              <Form.Group className="mb-3" controlId="Password">
                <Form.Label>New Password*</Form.Label>
                <Form.Control
                  name="Password"
                  className="rounded input"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter New Password"
                />

                <div
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    top: "32%",
                    right: "12px",
                    zIndex: 1,
                  }}
                  onClick={togglePasswordVisibility}
                >
                  {" "}
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </div>
              </Form.Group>
              <br />
              <Form.Group className="mb-3" controlId="ConfirmPassword">
                <Form.Label>Confirm Password*</Form.Label>
                <Form.Control
                  name="ConfirmPassword"
                  className="rounded input"
                  required
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Please Confirm Password"
                />{" "}
                <div style={{ color: "red" }}>{passwordError}</div>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              variant="dark"
              className=" align-items-center"
              // onClick={() => setShowPopup(false)}
              disabled={passwordError !== ""}
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="danger"
              className=" align-items-center"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default UserLogin;
