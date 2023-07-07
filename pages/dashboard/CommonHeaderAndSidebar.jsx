import { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import CustomHeader from "../../components/header/CustomHeader";
import CustomSidebar from "../../components/sidebar/CustomSidebar";
import "../../common/Common.css";
import "./CommonHeaderAndSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { getAPI } from "../../components/Api/ApiRequest";
import { apiEndpoints } from "../../components/Api/ApiEndpoint";
import {
  setRoleSelectData,
  setBranchSelectData,
} from "../../redux/select-data-slice/selectData-slice";
import {
  accountsMenuItems,
  inboundAdminMenuItems,
  inboundUserMenuItems,
  MachineAdminMenuItems,
  MachineUserMenuItems,
  partAdminDispatchUserMenuItems,
  partDispatchUserMenuItems,
  superAdminUserMenuItems,
} from "../../utils/SideMenu";
import { setLogout } from "../../redux/auth-slice/auth-slice";
import { setAuthToken } from "../../components/Api/api";
const CommonHeaderAndSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(351);
  const [selectedUser, setSelectedUser] = useState({});
  const [Outbound, setOutbound] = useState([]);
  const [dispatcher, setDispatcher] = useState([]);
  const [qRValue, setQRValue] = useState("");
  const [invoice, setInvoice] = useState([]);
  const [merge, setMerge] = useState("");
  const allSelectData = useSelector((state) => state.selectData);
  const dispatch = useDispatch();
  const { userRoleId, warehouse } = useSelector((state) => state.user.userData);
  const [sideMenu, setSideMenu] = useState([]);
  const [openSubMenu, setOpenSubMenu] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const subMenuClickHandler = (subMenu) => {
    if (openSubMenu === subMenu) {
      setOpenSubMenu("");
    } else {
      setOpenSubMenu(subMenu);
    }
  };
  useEffect(() => {
    if (userRoleId === "USER" && warehouse === "5N1") {
      setSidebarVisible(false);
      setActiveTab(19);
      setCollapsed(true);
    } else if (userRoleId === "SUPERADMIN") {
      setSideMenu(superAdminUserMenuItems);
    } else if (userRoleId === "ADMIN" && warehouse === "5N1") {
      setSideMenu(partAdminDispatchUserMenuItems);
    } else if (userRoleId === "USER" && warehouse === "4N1") {
      setSideMenu(MachineUserMenuItems);
    } else if (userRoleId === "ADMIN" && warehouse === "4N1") {
      setSideMenu(MachineAdminMenuItems);
    } else if (userRoleId === "USER" && warehouse === "1N1") {
      setSideMenu(inboundUserMenuItems);
    } else if (userRoleId === "ADMIN" && warehouse === "1N1") {
      setSideMenu(inboundAdminMenuItems);
    } else if (userRoleId === "ACCOUNTS") {
      setSideMenu(accountsMenuItems);
    } else {
      dispatch(setLogout());
      setAuthToken();
    }
  }, [userRoleId]);
  useEffect(() => {
    const getAllRoles = async () => {
      try {
        const response = await getAPI(apiEndpoints.getAllRole);
        if (response.status === "Success") {
          const options = response.data.map((select) => {
            return {
              name: "roles",
              value: select.roleId,
              label: select.roleDesc,
            };
          });
          dispatch(setRoleSelectData({ data: options }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    const getAllBranches = async () => {
      try {
        const response = await getAPI(apiEndpoints.getAllBranches);
        if (response.status === "Success") {
          const options = response.data.map((select) => {
            return {
              name: "branch",
              value: select.branchId,
              label: select.branchName ?? "N/A",
            };
          });
          dispatch(setBranchSelectData({ data: options }));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (allSelectData.roleData.length === 0) {
      getAllRoles();
    }
    if (allSelectData.branchData.length === 0) {
      getAllBranches();
    }
  }, []);
  const subMenuTaggleHandler = (e) => {
    console.log(e.target);
  };
  return (
    <div className="min-100vh">
      <Row className="w-100 m-0 position-fixed zIndex-9000">
        <CustomHeader setActiveTab={setActiveTab} />
      </Row>
      <div className="d-flex nevbarMenu">
        {sidebarVisible && (
          <div className="d-flex position-fixed h-100 zIndex-9000">
            <CustomSidebar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              setActiveTab={setActiveTab}
              menuItems={sideMenu}
              subMenuOnClick={subMenuClickHandler}
              open={openSubMenu}
            />
          </div>
        )}
        <div
          className="w-100 transition-3s"
          style={{ marginLeft: collapsed ? "80px " : "220px" }}
        >
          <Outlet
            context={[
              {
                activeTab: activeTab,
                setActiveTab: setActiveTab,
                selectedUser: selectedUser,
                setSelectedUser: setSelectedUser,
                outbound: Outbound,
                setOutbound: setOutbound,
                dispatcher: dispatcher,
                setDispatcher: setDispatcher,
                qRValue: qRValue,
                setQRValue: setQRValue,
                invoice: invoice,
                setInvoice: setInvoice,
                merge: merge,
                setMerge: setMerge,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
export default CommonHeaderAndSidebar;
