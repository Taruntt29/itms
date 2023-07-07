import { Switch, TextField } from "@mui/material";
import { Button } from "react-bootstrap";
import CustomSelect from "../../../components/input-select/CustomSelect";
import { useEffect, useState } from "react";
import CustomTable from "../../../components/table/CustomTable";
// import "./User.css";
import { useOutletContext } from "react-router-dom";
// import { REGEX } from "../../../utils/RegEx";
import { getAPI } from "../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../components/Api/ApiEndpoint";

const options = [{ label: "Machine" }, { label: "Parts" }];

// const rowsData = [
//   {
//     id: 1,
//     SupplierN: "Vivek",
//     PoName: "2329784623",
//     PoDate: "13/05/2023",
//     GRN: "00127659",
//     Supplier: "20344/2872",
//     GRNDate: "12/05/2023",
//     Bill: "78349723",
//   },
//   {
//     id: 2,
//     SupplierN: "Tarun",
//     PoName: "2329787463",
//     PoDate: "12/05/2023",
//     GRN: "01526452",
//     Supplier: "233344/2872",
//     GRNDate: "12/05/2023",
//     Bill: "7832479723",
//   },
//   {
//     id: 3,
//     SupplierN: "Tarun",
//     PoName: "232462509483",
//     PoDate: "18/05/2023",
//     GRN: "07727475",
//     Supplier: "34654620344/2872",
//     GRNDate: "12/05/2023",
//     Bill: "74349723",
//   },
//   {
//     id: 4,
//     SupplierN: "Ritesh",
//     PoName: "232934223",
//     PoDate: "13/05/2023",
//     GRN: "001276574",
//     Supplier: "2354620344/2872",
//     GRNDate: "12/05/2023",
//     Bill: "989349723",
//   },
//   {
//     id: 5,
//     SupplierN: "Vivek",
//     PoName: "2322474623",
//     PoDate: "13/05/2023",
//     GRN: "0012876673",
//     Supplier: "867655420344/2872",
//     GRNDate: "12/05/2023",
//     Bill: "78349723",
//   },
//   {
//     id: 6,
//     SupplierN: "Shalini",
//     PoName: "3659784623",
//     PoDate: "13/05/2023",
//     GRN: "00123645768",
//     Supplier: "876520344/2872",
//     GRNDate: "12/05/2023",
//     Bill: "78349723",
//   },
//   {
//     id: 7,
//     SupplierN: "Tarun",
//     PoName: "635837784623",
//     PoDate: "13/05/2023",
//     GRN: "0012536255",
//     Supplier: "234520344/2872",
//     GRNDate: "12/05/2023",
//     Bill: "78349723",
//   },
//   {
//     id: 8,
//     SupplierN: "Vivek",
//     PoName: "749654784623",
//     PoDate: "13/05/2023",
//     GRN: "0012685573",
//     Supplier: "2354540344/2872",
//     GRNDate: "12/05/2023",
//     Bill: "78349723",
//   },
//   {
//     id: 9,
//     SupplierN: "Ritesh",
//     PoName: "8495687623",
//     PoDate: "13/05/2023",
//     GRN: "0012558476",
//     Supplier: "Ritesh",
//     GRNDate: "12/05/2023",
//     Bill: "78349723",
//   },
//   {
//     id: 10,
//     SupplierN: "Vivek",
//     PoName: "9745789784",
//     PoDate: "13/05/2023",
//     GRN: "001267678",
//     Supplier: "224350344/2872",
//     GRNDate: "12/05/2023",
//     Bill: "78349723",
//   },
//   {
//     id: 11,
//     SupplierN: "Vivek",
//     PoName: "2329784623",
//     PoDate: "13/05/2023",
//     GRN: "001257576",
//     Supplier: "255460344/2872",
//     GRNDate: "12/05/2023",
//     Bill: "78349723",
//   },
// ];
function InboundApproved() {
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const columns = [
    {
      field: "SupplierN",
      headerName: "Supplier Name",
      minWidth: 115,
    },
    {
      field: "PoName",
      headerName: "PO Number",
      minWidth: 127,
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
  useEffect(() => {
    const getInboundApprovalData = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getInbondDetailsByStatus}?status=approved`
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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getInboundApprovalData();
  }, [getAPI]);
  return (
    <div className="mt-2">
      <h3>Inbound Approved</h3>

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
        {/* <Button
          variant="primary"
          onClick={() => {
            outletContext.setActiveTab(10);
          }}
        >
          Approved
        </Button> */}
      </div>
      <CustomTable
        divClass={"h-470px mt-4"}
        checkbox={false}
        // rows={rows}
        rows={filterRows}
        columns={columns}
        pageSizeOptions={[10, 25, 100]}
        pageSize={10}
        columnWidth={138}
      />
    </div>
  );
}

export default InboundApproved;
