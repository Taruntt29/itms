import { TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import CustomTable from "../../../components/table/CustomTable";
import { useOutletContext } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { getAPI, putAPI } from "../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../components/Api/ApiEndpoint";
import { useSelector } from "react-redux";
import CustomModal from "../../../components/modal/CustomModal";

const Inbound = () => {
  const [rows, setRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filterRows, setFilterRows] = useState([]);
  const [billNo, setBillNo] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [checkboxError, setCheckboxError] = useState(false);
  const billNoChangeHandler = (e) => {
    setBillNo(e.target.value);
  };

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
      minWidth: 110,
    },
    {
      field: "GRN",
      headerName: "GRN No.",
      minWidth: 110,
    },
    {
      field: "Supplier",
      headerName: "Supplier Invoice No.",
      minWidth: 165,
    },
    {
      field: "GRNDate",
      headerName: "Invoice Date",
      minWidth: 108,
    },

    {
      field: "billNo",
      headerName: "Bill No.",
      minWidth: 125,
      renderCell: (params) => (
        <TextField
          value={params.row.billNo}
          onChange={(event) => {
            const newRows = [...filterRows];

            const rowIndex = filterRows.findIndex(
              (data) => data.id === params.row.id
            );
            newRows[rowIndex].billNo = event.target.value;
            setFilterRows(newRows);
          }}
          fullWidth
          variant="standard"
          size="small"
          inputProps={{ style: { padding: "8px" } }}
        />
      ),
    },

    {
      field: "checkbox",
      headerName: (
        // <Checkbox
        //   checked={selectAll}
        //   indeterminate={
        //     rows.some((row) => row.selected) &&
        //     !rows.every((row) => row.selected)
        //   }
        //   onChange={(event) => {
        //     const checked = event.target.checked;
        //     const newRows = rows.map((row) => ({ ...row, selected: checked }));
        //     setFilterRows(newRows);
        //     setSelectAll(checked);
        //   }}
        // />
        <Checkbox
          checked={selectedRows.length === filterRows.length}
          indeterminate={
            selectedRows.length > 0 && selectedRows.length < filterRows.length
          }
          onChange={(event) => {
            const checked = event.target.checked;
            const updatedRows = filterRows.map((row) => ({
              ...row,
              selected: checked,
            }));
            setFilterRows(updatedRows);
            setSelectedRows(updatedRows.filter((row) => row.selected));
          }}
        />
      ),
      minWidth: 20,
      renderCell: (params) => (
        <Checkbox
          checked={params.row.selected}
          onChange={(event) => {
            const checked = event.target.checked;

            const rowId = params.row.id;
            //   const updatedRows = rows.map((row) => {
            //     if (row.id === rowId) {
            //       return { ...row, selected: checked };
            //     }
            //     return row;
            //   });

            //   setFilterRows(updatedRows);
            // }}
            const updatedRows = filterRows.map((row) => {
              if (row.id === rowId) {
                return { ...row, selected: checked };
              }
              return row;
            });
            setFilterRows(updatedRows);
            setSelectedRows(updatedRows.filter((row) => row.selected));
          }}
        />
      ),
    },
  ];
  const [outletContext] = useOutletContext();
  const [startDate, setStartDate] = useState("dd-mm-yyyy"); //Fix
  const handleStartDateChange = (e) => {
    const date = e.target.value;
    setStartDate(date);
    filterResults(date, endDate);
  };

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
        row.PoName.toString().toLowerCase().includes(userId.toLowerCase())
      );
    }
    if (username) {
      filteredRows = filteredRows.filter((row) =>
        row.Supplier.toLowerCase().includes(username.toLowerCase())
      );
    }
    if (department) {
      filteredRows = filteredRows.filter((row) => {
        return (
          row.GRNDate.replace(REGEX.whitespace, "").toLowerCase() ===
          department.replace(REGEX.whitespace, "").toLowerCase()
        );
      });
    }
    setFilterRows(filteredRows);
  };
  const [error, setError] = useState(false);

  const userData = useSelector((state) => state.user.userData);
  const onSubmitHandler = async () => {
    const selectedRows = filterRows.filter((row) => row.selected === true);
    if (selectedRows.length === 0) {
      setCheckboxError(true); // Set the checkbox error state to true if no checkboxes are selected
      return;
    }

    setCheckboxError(false);
    for (const row of selectedRows) {
      const body = {
        id: row.id,
        transportBillNumber: row.billNo,
        status: "notApproved",
      };

      try {
        const response = await putAPI(
          `${apiEndpoints.updateInbondDetailsData}${userData.userName}`,
          body
        );

        if (response?.data?.status === "Success") {
          const newFilterRows = filterRows.filter((itm) => itm.id !== row.id);
          setFilterRows(newFilterRows);
          setShowModal(true); // Show modal on successful API response
          setSelectedRows([]);
          setRefresh(true);
        } else {
          console.log("ERROR FOR" + body);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    }
  };
  const [refresh, setRefresh] = useState(false);
  useEffect(() => {
    const getInboundData = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getInbondDetailsByStatus}?status=fresh`
        );

        const rowData =
          response?.data?.data?.map((itm) => ({
            id: itm?.id,
            SupplierN: itm?.supplierName,
            PoName: itm?.poNumber,
            PoDate: itm?.poDate,
            GRN: itm?.grnNumber,
            Supplier: itm?.supplierInvoiceNumber,
            GRNDate: itm?.grnDate,
            billNo: "",
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
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div className="mt-2">
      <CustomModal
        show={checkboxError}
        onHide={() => setError(setCheckboxError)}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">Please select checkbox</p>
      </CustomModal>
      <CustomModal
        show={error}
        onHide={() => setError(false)}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-danger my-0">Bill Number is Empty</p>
      </CustomModal>
      <CustomModal
        show={showModal}
        onHide={closeModal}
        header={false}
        closeButton={false}
        footer={false}
      >
        <p className="text-center text-success my-0">
          Bill Number is Submitted Successfully.
        </p>
      </CustomModal>
      <h3>Inbound</h3>

      <div className="d-flex justify-content-center gap-2">
        <TextField
          label="PO Number"
          variant="outlined"
          value={userId}
          onChange={userIdChangeHandler}
        />
        <TextField
          label="Invoice Number"
          variant="outlined"
          value={username}
          onChange={usernameChangeHandler}
        />
        <TextField
          fullWidth
          sx={{ width: 200 }}
          // label="Invoice Date"
          type="date"
          id="start-date"
          name="start-date"
          value={startDate}
          onChange={handleStartDateChange}
        />{" "}
        <Button variant="dark" onClick={searchClickHandler}>
          Search
        </Button>
        <Button variant="danger" onClick={resetClickHandler}>
          Reset
        </Button>
        <Button variant="info" onClick={onSubmitHandler}>
          Submit
        </Button>
      </div>
      <br />
      <div className="d-flex justify-content-end gap-2">
        {" "}
        <TextField
          label="Bill No."
          variant="outlined"
          sx={{ width: 200 }}
          value={billNo}
          onChange={billNoChangeHandler}
        />
        <Button
          onClick={() => {
            const updatedRows = filterRows.map((row) => {
              if (row.selected) {
                return { ...row, billNo: billNo };
              }
              return row;
            });
            setFilterRows(updatedRows);
          }}
        >
          Update
        </Button>
      </div>
      <CustomTable
        divClass={"h-470px mt-4"}
        rows={filterRows}
        columns={columns}
        checkbox={false}
        pageSizeOptions={[10, 25, 100]}
        pageSize={10}
        columnWidth={121}
      />
    </div>
  );
};

export default Inbound;
