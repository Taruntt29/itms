import { Switch, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import CustomSelect from "../../../components/input-select/CustomSelect";
import { useEffect, useState } from "react";
import CustomTable from "../../../components/table/CustomTable";

import { useOutletContext } from "react-router-dom";

import { getAPI, putAPI } from "../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../components/Api/ApiEndpoint";
import { useDispatch, useSelector } from "react-redux";
// import { refreshToken } from "../../../components/Api/refreshToken";
import CustomModal from "../../../components/modal/CustomModal";

const options = [{ label: "Machine" }, { label: "Parts" }];

function Reports() {
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const columns = [
    {
      field: "SupplierN",
      headerName: "Supplier Name",
      minWidth: 115,
    },
    {
      field: "PoName",
      headerName: "PO Number",
      minWidth: 117,
    },
    {
      field: "PoDate",
      headerName: "PO Date",
      minWidth: 115,
    },
    {
      field: "GRN",
      headerName: "GRN No.",
      minWidth: 102,
    },
    {
      field: "Supplier",
      headerName: "Supplier Invoice No.",
      minWidth: 160,
    },
    {
      field: "GRNDate",
      headerName: "GRN Date",
      minWidth: 130,
    },
    {
      field: "Bill",
      headerName: "Transport Bill No.",
      minWidth: 135,
    },
  ];
  const [allUsers, setAllUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [outletContext] = useOutletContext();
  const [userId, setUserId] = useState("");
  const userIdChangeHandler = (e) => {
    setUserId(e.target.value);
  };
  const [username, setUsername] = useState("");
  const usernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };
  const [department, setDepartment] = useState("");
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
        row.SupplierN.toString().toLowerCase().includes(userId.toLowerCase())
      );
    }
    if (username) {
      filteredRows = filteredRows.filter((row) =>
        row.GRN.toLowerCase().includes(username.toLowerCase())
      );
    }
    if (department) {
      filteredRows = filteredRows.filter((row) => {
        return (
          row.dept.replace(REGEX.whitespace, "").toLowerCase() ===
          department.replace(REGEX.whitespace, "").toLowerCase()
        );
      });
    }
    setFilterRows(filteredRows);
  };
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getInboundData = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getInbondDetailsByStatus}?status=notApproved`
        );

        setAllUsers(response?.data);
        const rowData =
          response?.data?.data?.map((itm) => ({
            id: itm?.id,
            SupplierN: itm?.supplierName,
            PoName: itm?.poNumber,
            PoDate: itm?.poDate,
            GRN: itm?.grnNumber,
            Supplier: itm?.supplierInvoiceNumber,
            GRNDate: itm?.grnDate,
            Bill: itm?.transportBillNumber,
            selected: false,
          })) ?? [];

        setRows(rowData);
        setFilterRows(rowData);
        setRefresh(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getInboundData();
  }, [refresh]);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const [selectedRows, setSelectedRows] = useState([]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const handleSelectionModelChange = async (e) => {
    setSelectedRows(e);
  };

  const onApprovedHandler = async () => {
    if (selectedRows.length === 0) {
      setShowErrorModal(true); // Show the error modal
      return; // Do not proceed further
    }
    // const selectedRows = filterRows.filter((row) => row.selected === true);
    for (const rowId of selectedRows) {
      const row = rows.find((row) => row.id === rowId);

      const body = {
        id: row.id,
        transportBillNumber: row.Bill,
        status: "approved",
      };

      const response = await putAPI(
        `${apiEndpoints.updateInbondDetailsData}${userData.userName}`,
        body
      );

      if (response.errorMsg === "TOKEN HAS EXPIRED!!") {
        // dispatch(refreshToken(userData));
      }
      if (response?.data?.status === "Success") {
        const newUpdatedRows = filterRows.filter((row) => row.id !== rowId);

        setFilterRows(newUpdatedRows);
        openModal();
        setRefresh(true);
      } else {
        console.log("ERROR FOR" + body);
      }
    }
    //API CALL
  };

  return (
    <div className="mt-2">
      <CustomModal
        show={showModal}
        onHide={closeModal}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-success my-0">
          Bill Number is Approved Successfully.
        </p>
      </CustomModal>
      <CustomModal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">
          Please select atleast 1 checkbox to approve
        </p>
      </CustomModal>
      <h3>Inbound Approval</h3>

      <div className="d-flex justify-content-center gap-2">
        <TextField
          label="Supplier Name Search"
          variant="outlined"
          value={userId}
          onChange={userIdChangeHandler}
        />
        <TextField
          label="GRN NO. Search"
          variant="outlined"
          value={username}
          onChange={usernameChangeHandler}
        />
        <CustomSelect
          options={options}
          select={{
            value: department,
            onChange: departmentChangeHandler,
          }}
          input={{ label: "Select Department" }}
        />
        <Button variant="dark" onClick={searchClickHandler}>
          Search
        </Button>
        <Button variant="danger" onClick={resetClickHandler}>
          Reset
        </Button>
        <Button
          variant="primary"
          // onClick={() => {
          //   outletContext.setActiveTab(23);
          // }}
          onClick={onApprovedHandler}
        >
          Approved
        </Button>
      </div>
      <CustomTable
        divClass={"h-470px mt-4"}
        checkbox={true}
        // rows={rows}
        rows={filterRows}
        columns={columns}
        pageSizeOptions={[10, 25, 100]}
        pageSize={10}
        columnWidth={138}
        onRowSelectionModelChange={handleSelectionModelChange}
      />
    </div>
  );
}

export default Reports;
