import { useEffect, useState } from "react";
import { Switch, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import "../../../../../../common/common.css";
import { useOutletContext } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { putAPI, getAPI } from "../../../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../../../components/Api/ApiEndpoint";
import CustomTable from "../../../../../../components/table/CustomTable";
import CustomSelect from "../../../../../../components/input-select/CustomSelect";
import CustomModal from "../../../../../../components/modal/CustomModal";
const statusOptions = [
  { value: "active", label: "Active" },
  { value: "in-active", label: "In Active" },
];
const TransporterDetailsList = () => {
  const [outletContext] = useOutletContext();
  const getDataById = outletContext.merge;
  const [allUsers, setAllUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [transporterId, setTranspoterId] = useState("");
  const [transporterName, setTransportername] = useState("");
  const [status, setTransporterstatus] = useState("");
  const [filterRows, setFilterRows] = useState([]);
  const [error, setError] = useState(false);
  const searchClickHandler = () => {
    let filteredRows = rows;
    if (transporterId) {
      filteredRows = filteredRows.filter((row) =>
        row.transporterId
          .toString()
          .toLowerCase()
          .includes(transporterId.toLowerCase())
      );
    }
    if (transporterName) {
      filteredRows = filteredRows.filter((row) =>
        row.transporterName
          .toLowerCase()
          .includes(transporterName.toLowerCase())
      );
    }
    if (status) {
      filteredRows = filteredRows.filter((row) =>
        row.status.toLowerCase().includes(status.toLowerCase())
      );
    }
    setFilterRows(filteredRows);
  };
  const transporterIdChangeHandler = (e) => {
    setTranspoterId(e.target.value);
  };
  const transporternameChangeHandler = (e) => {
    setTransportername(e.target.value);
  };
  const transporterStatusChangeHandler = (e) => {
    setTransporterstatus(e.target.value);
  };
  const resetClickHandler = () => {
    setTranspoterId("");
    setTransportername("");
    setTransporterstatus("");
    setFilterRows(rows);
  };
  /* * *********************************************************************
   * * Function name : switchChangeHandler
   * * Developed By : Ashish Umrao
   * * Purpose  : This function used for switchChangeHandler
   * * Date : 03 JULY 2023
   * * **********************************************************************/
  const switchChangeHandler = async (params, event) => {
    const userId = "vivek";
    const paramData = {
      id: params.row.id,
      status: event.target.checked ? "active" : "in-active",
    };
    try {
      const response = await putAPI(
        apiEndpoints.updateTransporterMasterStatus + userId,
        paramData
      );
      // Update the state with the updated rows
      if (response.status === "Success") {
        const updatedRows = [...filterRows];
        const rowIndex = updatedRows.findIndex((row) => row.id === params.id);
        updatedRows[rowIndex] = {
          ...updatedRows[rowIndex],
          status: paramData.status,
        };
        setFilterRows(updatedRows);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };
  // const afterSuccessRedirect = () => {
  //   resetFlags;
  //   outletContext.setActiveTab(53);
  //   //setFilterRows(rows);
  // };
  // const resetFlags = () => {
  //   setFilterRows(rows);
  //   setError(false);
  // };
  /************************************************************************
   **********************************************************************/
  const columns = [
    { field: "id", headerName: "Sr. No.", width: 50 },
    { field: "transporterId", headerName: "Transpoter Id", width: 100 },
    {
      field: "transporterName",
      headerName: "Transporter Name",
      width: 139,
    },
    {
      field: "transporterState",
      headerName: "Transporter State",
      minWidth: 135,
    },
    {
      field: "transporterPinCode",
      headerName: "Transporter Pincode",
      minWidth: 50,
    },
    {
      field: "address",
      headerName: "Transporter Address",
      minWidth: 50,
    },
    {
      field: "transporterGst",
      headerName: "Transporter Gst Number",
      minWidth: 120,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 50,
      renderCell: (params) => {
        if (params.row.status == "active") {
          return (
            <span className="label label-table label-success">Active</span>
          );
        } else if (params.row.status == "in-active") {
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
      renderCell: (param) => (
        <>
          <span
            className="pointer text-primary"
            onClick={() => {
              const tarun = allUsers.find((data) => data.id === param.row.id);
              outletContext.setMerge(tarun);
              outletContext.setActiveTab(55);
            }}
          >
            <EditIcon />
          </span>
          <span>
            <Switch
              checked={param.row.status === "active" ? true : false}
              onClick={switchChangeHandler.bind(null, param)}
              color="success"
            />
          </span>
        </>
      ),
    },
  ];
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    const getRowData = async () => {
      try {
        const response = await getAPI(apiEndpoints.getAllTransporterMasterData);
        setAllUsers(response?.data?.data);
        const rowData =
          response.data.data?.map((dataSet, index) => ({
            id: dataSet?.id,
            address: dataSet?.address,
            transporterGst: dataSet?.transporterGst,
            transporterId: dataSet?.transporterId || "N/A",
            transporterName: dataSet?.transporterName,
            transporterState: dataSet?.transporterState || "N/A",
            transporterPinCode: dataSet?.transporterPinCode || "N/A",
            status: dataSet?.status,
            action: dataSet?.id,
          })) ?? [];
        setRows(rowData);
        setFilterRows(rowData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getRowData();
  }, []);
  return (
    <div className="p-2 mt-2 ">
      {/* <CustomModal
        show={rows}
        onHide={afterSuccessRedirect}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-success my-0">
          Status Updated Successfully.
        </p>
      </CustomModal> */}
      <div className="d-flex justify-content-between mb-3">
        <h3>Transporter List</h3>
        <Button
          variant="primary"
          onClick={() => {
            outletContext.setActiveTab(54);
          }}
        >
          Add Transporter
        </Button>
      </div>
      <div className="d-flex justify-content-evenly gap-2">
        <TextField
          label="Transporter ID Search"
          variant="outlined"
          value={transporterId}
          onChange={transporterIdChangeHandler}
        />
        <TextField
          label="Transporter Name"
          variant="outlined"
          value={transporterName}
          onChange={transporternameChangeHandler}
        />
        <CustomSelect
          options={statusOptions}
          select={{
            value: status,
            onChange: transporterStatusChangeHandler,
          }}
          input={{ label: "Select Status" }}
        />
        <Button variant="primary" onClick={searchClickHandler}>
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
        columnWidth={80}
      />
    </div>
  );
};
export default TransporterDetailsList;
