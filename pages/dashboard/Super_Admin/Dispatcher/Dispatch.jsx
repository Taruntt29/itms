import { useEffect, useState } from "react";

import { useOutletContext } from "react-router-dom";
import CustomTable from "../../../../components/table/CustomTable";
import { useDispatch, useSelector } from "react-redux";
import { getAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";
import { setLogout } from "../../../../redux/auth-slice/auth-slice";
import { setAuthToken } from "../../../../components/Api/api";

const Dispatch = () => {
  const [outletContext] = useOutletContext();
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const columns = [
    { field: "id", headerName: "S no.", width: 70 },
    {
      field: "Invoice",
      headerName: "Invoice Number",
      width: 140,
      renderCell: (param) => (
        <span
          className="pointer text-primary"
          onClick={() => {
            const tarun = allUsers.find((itm) => itm.id === param.row.id);
            outletContext.setActiveTab(7);
            outletContext.setInvoice(tarun);
          }}
        >
          {param.row.Invoice}
        </span>
      ),
    },
    { field: "LR", headerName: "LR Number.", width: 100 },

    {
      field: "date",
      headerName: "Invoice Date",
      type: "number",
      width: 110,
    },
    {
      field: "transporter",
      headerName: "Transporter Name",
      type: "number",
      width: 170,
    },
    {
      field: "list",
      headerName: "Packing List",
      type: "number",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      width: 130,
    },
  ];

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    const getDispatch = async () => {
      try {
        const response = await getAPI(apiEndpoints.getAllInvoiceDataParts);
        if (response.errorMsg === "TOKEN HAS EXPIRED!!") {
          dispatch(setLogout());
          setAuthToken();
          return;
        }

        setAllUsers(response?.data?.data);
        const rowData =
          response?.data?.data?.map((itm) => ({
            id: itm?.id,
            Invoice: itm?.invoiceNum,
            transporter: itm?.transporterName,
            date: itm?.invoiceDate,
            LR: itm?.lrNumber,
            list: itm?.packingListNo,
            status: itm?.status,
          })) ?? [];

        setRows(rowData);
        setFilterRows(rowData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getDispatch();
  }, [getAPI]);

  return (
    <div className="mt-3">
      <h3>Dispatch</h3>

      <CustomTable
        divClass={"h-470px mt-4"}
        checkbox={false}
        rows={filterRows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        pageSize={5}
        columnWidth={138}
      />

      <br />
    </div>
  );
};

export default Dispatch;
