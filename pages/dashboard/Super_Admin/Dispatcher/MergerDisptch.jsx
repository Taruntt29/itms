import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { setLogout } from "../../../../redux/auth-slice/auth-slice";
import { setAuthToken } from "../../../../components/Api/api";
import { getAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";
import CustomTable from "../../../../components/table/CustomTable";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TEST from "./Dispatch_parts/Test";
import ReactDOMServer from "react-dom/server";
import html2pdf from "html2pdf.js";
import jsxToPDF from "./Dispatch_parts/Test";
import MergerPDF from "./Dispatch_parts/MergerPDF";
const MergerDispatch = () => {
  const [outletContext] = useOutletContext();
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [selectedPDFData, setSelectedPDFData] = useState(null);
  const columns = [
    { field: "id", headerName: "S no.", width: 150 },
    {
      field: "LR",
      headerName: "Dispatch List",
      width: 160,
      renderCell: (param) => (
        <span
          className="pointer text-primary"
          onClick={() => {
            const tarun = allUsers.find((itm) => itm.id === param.row.id);
            outletContext.setActiveTab(38);
            outletContext.setMerge(tarun);
          }}
        >
          {param.row.LR}
        </span>
      ),
    },
    {
      field: "transporter",
      headerName: "Merge Dispatch List Number",
      type: "number",
      width: 240,
    },
    {
      field: "pdf",
      headerName: "Generate PDF for Merger",
      type: "number",
      width: 290,
      renderCell: (params) => {
        const handlePDFDownload = async () => {
          try {
            const response = await getAPI(
              `${apiEndpoints.mergerdispatchNo}${params.row.transporter}`
            );
            const shipmentNo = response?.data?.data.shipmentNo;
            var content = "";
            if (response.statusCode == 200) {
              content = ReactDOMServer.renderToStaticMarkup(
                <MergerPDF parcelData={response?.data?.data ?? {}} />
              );
            } else {
              alert("Data Not Found");
              return false;
            }
            // const content = ReactDOMServer.renderToStaticMarkup(
            //   <MergerPDF parcelData={response?.data?.data ?? {}} />
            // );
            html2pdf()
              .set({
                margin: 1,
                filename: shipmentNo,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: {
                  unit: "mm",
                  format: "a4",
                  orientation: "p",
                },
              })
              .from(content)
              .save();
            // setParcelData(response?.data?.data[0]);
            // console.log(response.data.data);
            // const str = TEST(response.data.data);
            // jsxToPDF(response.data.data, "download.pdf");
          } catch (error) {
            console.error(error);
          }
        };
        const pdf = params.row.pdf;
        return pdf ? (
          <PictureAsPdfIcon className="pointer" onClick={handlePDFDownload} />
        ) : null;
      },
    },
  ];
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const [parcelData, setParcelData] = useState({});
  useEffect(() => {
    const getDispatch = async () => {
      try {
        const response = await getAPI(apiEndpoints.getMergerDispatchData);
        if (response.errorMsg === "TOKEN HAS EXPIRED!!") {
          dispatch(setLogout());
          setAuthToken();
          return;
        }
        setAllUsers(response?.data?.data);
        const rowData =
          response?.data?.data?.map((itm) => ({
            id: itm?.id,
            transporter: itm.mergerDispatchList,
            LR: itm?.dispatchList,
            pdf: true,
          })) ?? [];
        setRows(rowData);
        setFilterRows(rowData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getDispatch();
  }, []);
  const handleAddClick = () => {
    outletContext.setActiveTab(37);
  };
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between">
        <h3>Merge Dispatch</h3>
        <Button variant="dark" onClick={handleAddClick}>
          Add
        </Button>
      </div>
      <CustomTable
        divClass="h-470px mt-4"
        checkbox={false}
        rows={filterRows}
        columns={columns}
        pageSizeOptions={[5, 10, 25]}
        pageSize={5}
        columnWidth={239}
      />
      <br />
      {/* <MergerPDF parcelData={parcelData} data={selectedPDFData} /> */}
    </div>
  );
};
export default MergerDispatch;
