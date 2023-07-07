import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useOutletContext } from "react-router-dom";
import CustomTable from "../../../../components/table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../../redux/auth-slice/auth-slice";
import { setAuthToken } from "../../../../components/Api/api";
import { getAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";
const DeliveryTable = () => {
  const [outletContext] = useOutletContext();
  const [showTable, setShowTable] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "transporter",
      headerName: "Transporter name",
      width: 190,
      renderCell: (param) => (
        <span
          className="pointer text-primary"
          onClick={() => {
            const tarun = allUsers.find((itm) => itm.id === param.row.id);
            if (param.row.transporter === "BlueDart") {
              outletContext.setActiveTab(41);
            } else {
              outletContext.setActiveTab(42);
            }
            outletContext.setMerge(tarun);
          }}
        >
          {param.row.transporter}
        </span>
      ),
    },
    {
      field: "mode",
      headerName: "Transporter Mode",
      width: 190,
    },
    {
      field: "Charges",
      headerName: "Transporter Charges",
      type: "number",
      width: 240,
    },
  ];
  const [userId, setUserId] = useState("");
  const userIdChangeHandler = (e) => {
    setUserId(e.target.value);
  };
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAPI(apiEndpoints.getAllTransporterData);
        if (response.errorMsg === "TOKEN HAS EXPIRED!!") {
          dispatch(setLogout());
          setAuthToken();
          return;
        }
        setAllUsers(response?.data?.data);
        const rowData =
          response?.data?.data?.map((itm) => ({
            id: itm?.id,
            Charges: itm?.transportCharge,
            transporter: itm?.transporterName,
            mode: itm?.transporterMode,
          })) ?? [];
        setRows(rowData);
        setFilterRows(rowData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between">
        <h3>Delivery Data</h3>
        <Button
          variant="danger"
          onClick={() => {
            outletContext.setActiveTab(24);
          }}
        >
          Add Delivery
        </Button>
      </div>
      <br />
      <CustomTable
        divClass="h-470px mt-4"
        checkbox={false}
        rows={filterRows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        pageSize={5}
        columnWidth={237}
      />
      <br />
    </div>
  );
};
export default DeliveryTable;
