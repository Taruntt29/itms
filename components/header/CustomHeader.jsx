import React from "react";
import { Button, Dropdown, Image } from "react-bootstrap";
import "../../common/Common.css";
import "./CustomHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../redux/auth-slice/auth-slice";
import Person3Icon from "@mui/icons-material/Person3";
import { setAuthToken } from "../Api/api";
import itms from "../../assets/images/itms.png";
import manitou from "../../assets/images/manitouLogo.jpg";

const CustomHeader = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);

  const logoutHandler = () => {
    dispatch(setLogout());
    setAuthToken();
  };

  return (
    <div className="position-fixed w-100 header-shadow header-bg">
      <div className="d-flex w-100 align-items-center justify-content-between">
        <div className="justify-content-start d-flex p-2">
          <img src={manitou} className="logo" />
        </div>

        <div className="justify-content-end d-flex p-2">
          <img src={itms} className="logo" />
          <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic">
              <Person3Icon />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Button
                  variant="danger"
                  onClick={() => {
                    props.setActiveTab(6);
                  }}
                >
                  Profile Info
                </Button>
              </Dropdown.Item>
              <Dropdown.Item>
                <Button variant="dark" onClick={logoutHandler}>
                  Logout
                </Button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default CustomHeader;
