import { Button, Container, Form } from "react-bootstrap";
import homeImage from "../../assets/images/manitouLogo.jpg";
import "../../common/Common.css";
import "./Login.css";
import CustomFormGroup from "../../components/form-group/CustomFormGroup";
import { useState } from "react";
import ErrorModal from "../../components/error-modal/ErrorModal";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/auth-slice/auth-slice";
import { setUserData } from "../../redux/userdata-slice/usedata-slice";
import { getAPI, postAPI } from "../../components/Api/ApiRequest";
import { apiEndpoints } from "../../components/Api/ApiEndpoint";

import { setAuthToken } from "../../components/Api/api";
import CustomErrorPage from "../error/CustomErrorPage";

const Login = () => {
  try {
    const dispatch = useDispatch();
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [username, setUsername] = useState("vivek");
    const [password, setPassword] = useState("password");
    const [error, setError] = useState({ show: false, message: "" });
    const removeAlert = () => {
      setError({ show: false, message: "" });
    };
    const onUsernameChange = (e) => {
      setUsername(e.target.value);
    };
    const onPasswordChange = (e) => {
      setPassword(e.target.value);
    };
    const loginHandler = async (e) => {
      e.preventDefault();
      removeAlert();
      if (username.length === 0) {
        setError({
          show: true,
          message: "Username is empty. Please enter your username.",
        });
        return;
      }
      if (password.length === 0) {
        setError({
          show: true,
          message: "Password is empty. Please enter your password.",
        });
        return;
      }
      const loginData = {
        userId: username,
        password,
      };
      try {
        const response = await postAPI(apiEndpoints.createToken, loginData);
        if (response.authToken !== undefined) {
          if (response.statusCode === "200") {
            setAuthToken(response.authToken);
            const roleResponse = await getAPI(
              `${apiEndpoints.getRolesByUserId}${username}`
            );

            dispatch(setLogin({ status: true, token: response.authToken }));
            dispatch(
              setUserData({
                user: {
                  ...loginData,
                  userRoleId: roleResponse.data.roles[0]?.roleId,
                  warehouse: roleResponse.data.warehouse,
                },
              })
            );
          } else {
            setError({
              show: true,
              message: response.errorMsg,
            });
          }
        } else {
          setError({
            show: true,
            message: "Something went wrong. Please try again.",
          });
        }
      } catch (err) {
        setError({
          show: true,
          message: "Something went wrong. Please try again.",
        });
      }
    };
    return (
      <>
        {error.show && (
          <ErrorModal message={error.message} onClose={removeAlert} />
        )}
        <Container className="w-33 center">
          <div className="p-3 bg-white rounded-top">
            <img src={homeImage} className="w-100" alt="Home" />
          </div>
          <div className="bg-danger rounded-bottom p-4">
            <Form>
              <CustomFormGroup
                groupClass="mb-1"
                label="Username"
                control={{
                  type: "text",
                  placeholder: "Username",
                  value: username,
                  onChange: onUsernameChange,
                }}
              />
              <CustomFormGroup
                groupClass="mb-3"
                label="Password"
                control={{
                  type: "password",
                  placeholder: "Password",
                  value: password,
                  onChange: onPasswordChange,
                }}
              />
              <Button
                type="submit"
                className="w-100 py-2"
                variant="secondary"
                onClick={loginHandler}
              >
                SIGN IN
              </Button>
            </Form>
          </div>
        </Container>
      </>
    );
  } catch (error) {
    console.log(error);
    return <CustomErrorPage />;
  }
};

export default Login;
