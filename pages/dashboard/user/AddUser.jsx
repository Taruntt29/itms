import { Button, Row, Col } from "react-bootstrap";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAPI, postAPI } from "../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../components/Api/ApiEndpoint";
import CustomModal from "../../../components/modal/CustomModal";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const AddUser = () => {
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
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [warehouseOptions, setWarehouseOptions] = useState(warehouse);
  useEffect(() => {
    if (selectedFacility && selectedFacility.value === "1A1") {
      setWarehouseOptions([
        { name: "wareHouse", value: "4N1", label: "4N1" },
        { name: "wareHouse", value: "1N1", label: "1N1" },
      ]);
    } else if (selectedFacility && selectedFacility.value === "1A4") {
      setWarehouseOptions([{ name: "wareHouse", value: "5N1", label: "5N1" }]);
    } else {
      setWarehouseOptions(warehouse);
    }
  }, [selectedFacility]);
  const onFacilityChange = (event, value) => {
    setSelectedFacility(value);
    onFormDataChange(event, value);
  };
  const [selectedRole, setSelectedRole] = useState(null);

  const [showPassword, setShowPassword] = useState(false);
  const [outletContext] = useOutletContext();
  const allSelectData = useSelector((state) => state.selectData);
  const [userAdded, setUserAdded] = useState(false);
  const [error, setError] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    userName: "",
    password: "",
    email: "",
    mobile: "",
    division: "",
    wareHouse: "",
    facility: "",
    roles: [],
  });
  const onFormDataChange = (e, selectValue) => {
    let { name, value } = e.target;
    if (selectValue !== undefined) {
      if (selectValue?.name === "roles") {
        name = selectValue.name;
        value = [{ roleId: selectValue.value }];

        // Update selected role state
        setSelectedRole(selectValue.value);

        // Reset Autocomplete fields for Division, Facility, and Warehouse
        if (
          selectValue.value === "SUPERADMIN" ||
          selectValue.value === "ACCOUNTS"
        ) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            division: "",
            facility: "",
            wareHouse: "",
          }));
          setSelectedFacility(null);
        }
      }

      if (
        selectValue.name === "division" ||
        selectValue.name === "facility" ||
        selectValue.name === "wareHouse"
      ) {
        name = selectValue.name;
        value = selectValue.value;
      }
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
  const checkExistingUser = async (e) => {
    try {
      const responseUser = await getAPI(apiEndpoints.getAllUser);
      const userIdExists = responseUser.data.some(
        (user) => user.userId === formData.userId.trim()
      );
      setUserExists(userIdExists);
      if (userIdExists) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          userId: "", // Reset the User ID field
        }));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const onSubmitHandler = async () => {
    resetFlags();
    if (
      formData.userId.trim() === "" ||
      formData.userName.trim() === "" ||
      formData.password.trim() === "" ||
      formData.product_type === "" ||
      formData.email.trim() === "" ||
      formData.mobile.trim() === "" ||
      // formData.division.trim() === "" ||
      // formData.facility.trim() === "" ||
      // formData.wareHouse.trim() === "" ||
      formData.department === "" ||
      formData.roles.length === 0
    ) {
      setError(true);
      return;
    }
    const response = await postAPI(apiEndpoints.saveUser, formData);
    if (response.status === "Success") {
      setUserAdded(true);
    } else if (response.status === "Fail") {
      setUserExists(true);
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
  const isDisable = (input) => {
    if (input === "warehouse") {
      // return formData.division.length === 0;
      return formData.facility.length === 0;
    } else if (input === "facility") {
      return formData.division.length === 0;
    }
  };
  return (
    <>
      <CustomModal
        show={userExists}
        onHide={() => setUserExists(false)}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">User ID already exists.</p>
      </CustomModal>
      <CustomModal
        show={userAdded}
        onHide={afterSuccessRedirect}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-success my-0">
          User Added Successfully.
        </p>
      </CustomModal>
      <CustomModal
        show={error}
        onHide={() => setError(false)}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">
          Something went wrong, please try again.
        </p>
      </CustomModal>
      <h2>Add User</h2>
      <br />
      <Row>
        <Col>
          User ID<span className="text-danger">*</span>
        </Col>
        <Col>
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----User ID-----"
            value={formData.userId}
            name="userId"
            onChange={onFormDataChange}
            onBlur={checkExistingUser}
            error={userExists}
            helperText={userExists ? "User ID already exists" : ""}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          User Name<span className="text-danger">*</span>
        </Col>
        <Col>
          {" "}
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----User Name-----"
            value={formData.userName}
            name="userName"
            onChange={onFormDataChange}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          Role<span className="text-danger">*</span>
        </Col>
        <Col>
          <Autocomplete
            // multiple
            disablePortal
            id="combo-box-demo"
            options={allSelectData.roleData}
            onChange={onFormDataChange}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="-----Select Role-----" />
            )}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          Password<span className="text-danger">*</span>
        </Col>
        <Col>
          {" "}
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Password-----"
            value={formData.password}
            name="password"
            onChange={onFormDataChange}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          Division<span className="text-danger">*</span>
        </Col>
        <Col>
          {console.log("formData.roles[0]", formData.roles[0]?.roleId)}
          <Autocomplete
            disablePortal
            disabled={
              formData.roles[0]?.roleId === "SUPERADMIN" ||
              formData.roles[0]?.roleId === "ACCOUNTS" ||
              formData.roles[0]?.roleId == undefined
            }
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
            disabled={
              formData.roles[0]?.roleId === "SUPERADMIN" ||
              formData.roles[0]?.roleId === "ACCOUNTS" ||
              isDisable("facility")
            }
            id="facility-select"
            options={facility}
            getOptionLabel={(option) => option.label}
            value={selectedFacility}
            onChange={onFacilityChange}
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
            disabled={
              formData.roles[0]?.roleId === "SUPERADMIN" ||
              formData.roles[0]?.roleId === "ACCOUNTS" ||
              formData.wareHouse == undefined ||
              isDisable("warehouse")
            }
            id="warehouse-select"
            options={warehouseOptions}
            // value={formData.wareHouse}
            onChange={(e, newValue) => onFormDataChange(e, newValue)}
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
        <Col>
          Email<span className="text-danger">*</span>
        </Col>
        <Col>
          {" "}
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Email-----"
            value={formData.email}
            onChange={onFormDataChange}
            name="email"
            error={formData.email !== "" && !isEmailValid(formData.email)}
            helperText={
              formData.email !== "" && !isEmailValid(formData.email)
                ? "Invalid email address"
                : ""
            }
          />
        </Col>
      </Row>
      <br />
      <Row>
        <Col>
          Phone Number<span className="text-danger">*</span>
        </Col>
        <Col>
          {" "}
          <TextField
            fullWidth
            sx={{ width: 300 }}
            label="-----Phone Number-----"
            value={formData.mobile}
            onChange={onFormDataChange}
            name="mobile"
            inputProps={{ maxLength: 10 }}
            error={
              formData.mobile.length !== 0 && formData.mobile.length !== 10
            }
            helperText={
              formData.mobile.length !== 0 && formData.mobile.length !== 10
                ? "Please enter a valid 10-digit phone number"
                : ""
            }
          />
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
export default AddUser;
