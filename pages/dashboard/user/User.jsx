import { Switch, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import CustomSelect from "../../../components/input-select/CustomSelect";
import { useEffect, useState } from "react";
import CustomTable from "../../../components/table/CustomTable";
import "./User.css";
import "../../../common/Common.css";
import { useOutletContext } from "react-router-dom";
import { getAPI, putAPI } from "../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../components/Api/ApiEndpoint";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../redux/auth-slice/auth-slice";
import { setAuthToken } from "../../../components/Api/api";
import CustomModal from "../../modal/CustomModal";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
const options = [
  { value: "outbound", label: "Outbound" },
  { value: "inbound", label: "Inbound" },
  { value: "dispatch", label: "Dispatch" },
  { value: "reports", label: "Reports" },
];
const User = () => {
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);
  const [outletContext] = useOutletContext();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [department, setDepartment] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const userIdChangeHandler = (e) => {
    setUserId(e.target.value);
  };
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const departmentChangeHandler = (e) => {
    setDepartment(e.target.value);
  };
  const resetClickHandler = () => {
    setUserId("");
    setUsername("");
    setDepartment("");
    setFilterRows(rows);
  };
  const searchClickHandler = () => {
    let filteredRows = rows;
    if (userId) {
      filteredRows = filteredRows.filter((row) =>
        row.user.toString().toLowerCase().includes(userId.toLowerCase())
      );
    }
    if (username) {
      filteredRows = filteredRows.filter((row) =>
        row.name.toLowerCase().includes(username.toLowerCase())
      );
    }
    if (department) {
      filteredRows = filteredRows.filter(
        (row) => row.dept.toLowerCase() === department.toLowerCase()
      );
    }
    setFilterRows(filteredRows);
  };
  const findUserData = (id) => {
    return allUsers.filter((user) => user.id === id)[0];
  };
  // const switchChangeHandler = async (params, event) => {
  const switchChangeHandler = async (params, event) => {
    const userId = params.row.user;
    const status = event.target.checked ? "ACTIVE" : "IN-ACTIVE";
    try {
      const response = await putAPI(
        `${apiEndpoints.deleteUserById}${userId}&status=${status}`
      );
      // Update the state with the updated rows
      const updatedRows = [...filterRows];
      const rowIndex = updatedRows.findIndex((row) => row.id === params.id);
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        action: status,
      };
      setFilterRows(updatedRows);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };
  /* * *********************************************************************
     * * Function name : handleExportExcel
     * * Developed By : Ashish Umrao
     * * Purpose  : This function used for Export Excel download
     * * Date : 06 JUly 2023
     * * **********************************************************************/
  const handleExportExcel = () => {
    const data = filterRows.map((row) => ({
      ID: row.id,
      "User ID": row.user,
      "User Name.": row.name,
      "Locked Status.": row.lockStatus,
      "Warehouse": row.branch,
      "Role": row.role,
      "Status": row.lockStatus,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      type: "array",
      bookType: "xlsx",
    });
    const fileName = "User Export.xlsx";
    const file = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(file, fileName);
  };
  const columns = [
    { field: "id", headerName: "SNo.", width: 70 },
    {
      field: "user",
      headerName: "User ID",
      renderCell: (param) => (
        <span
          className="pointer text-primary"
          onClick={() => {
            const user = allUsers.find((itm) => {
              return itm.id === param.row.uid;
            });
            outletContext.setActiveTab(5);
            outletContext.setSelectedUser(user);
          }}
        >
          {param.row.user}
        </span>
      ),
    },
    {
      field: "name",
      headerName: "User Name",
      minWidth: 140,
    },
    {
      field: "lockStatus",
      headerName: "Locked Status",
      minWidth: 130,
    },
    {
      field: "dept",
      headerName: "Warehouse",
      minWidth: 150,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 150,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params) => {
        if (params.row.action == "ACTIVE") {
          return (
            <span className="label label-table label-success">Active</span>
          );
        } else if (params.row.action == "IN-ACTIVE") {
          return (
            <span className="label label-table label-danger">In-Active</span>
          );
        }
      },
    },
    {
      field: "action",
      headerName: "Action",
      minWidth: 100,
      renderCell: (params) => (
        <Switch
          checked={params.row.action === "ACTIVE" ? true : false}
          onClick={switchChangeHandler.bind(null, params)}
          color="success"
        />
      ),
    },
  ];
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    const getRowData = async () => {
      try {
        const response = await getAPI(apiEndpoints.getAllUser);
        if (response.errorMsg === "TOKEN HAS EXPIRED!!") {
          dispatch(setLogout());
          setAuthToken();
          return;
        }
        setAllUsers(response?.data);
        const rowData =
          response?.data?.map((itm, index) => ({
            id: index + 1,
            uid: itm?.id,
            user: itm?.userId,
            name: itm?.userName,
            branch: itm?.branch?.branchName || "N/A",
            lockStatus: itm?.locked_status,
            dept: itm?.wareHouse || "N/A",
            role: itm?.roles[0]?.roleDesc || "N/A",
            action: itm?.status,
          })) ?? [];
        setRows(rowData);
        setFilterRows(rowData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getRowData();
  }, [getAPI]);
  return (
    <div className="p-2 mt-2 ">
      {/* <CustomModal
        show={userExists}
        onHide={() => setUserExists(false)}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">
          Session is expired!! Please Login again
        </p>
      </CustomModal> */}
      <div className="d-flex justify-content-between mb-3">
        <h3>User Dashboard</h3>
        <Button variant="success" onClick={handleExportExcel} style={{ marginLeft: '657px' }}>
          Export to Excel
        </Button>
        <Button
          variant="dark"
          onClick={() => {
            outletContext.setActiveTab(2);
          }}
        >
          Add User
        </Button>
      </div>
      <div className="d-flex justify-content-evenly gap-2">
        <TextField
          label="User ID Search"
          variant="outlined"
          value={userId}
          onChange={userIdChangeHandler}
        />
        <TextField
          label="User Name"
          variant="outlined"
          value={username}
          onChange={usernameChangeHandler}
        />
        <TextField
          label="Warehouse"
          variant="outlined"
          value={department}
          onChange={departmentChangeHandler}
        />
        {/* <CustomSelect
          options={options}
          select={{
            value: department,
            onChange: departmentChangeHandler,
          }}
          input={{ label: "Select Warehouse" }}
        /> */}
        <Button variant="dark" onClick={searchClickHandler}>
          Search
        </Button>
        <Button variant="danger" onClick={resetClickHandler}>
          Reset
        </Button>
      </div>
      <CustomTable
        divClass={"h-470px mt-4"}
        checkbox={false}
        rows={filterRows}
        columns={columns}
        pageSizeOptions={[10, 25, 100]}
        pageSize={10}
        columnWidth={119}
      />
    </div>
  );
};
export default User;
