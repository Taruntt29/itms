import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Row, Col, Table, Button } from "react-bootstrap";
import CustomTable from "../../../../components/table/CustomTable";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../../../redux/auth-slice/auth-slice";
import { setAuthToken } from "../../../../components/Api/api";
import { getAPI, putAPI } from "../../../../components/Api/ApiRequest";
import { apiEndpoints } from "../../../../components/Api/ApiEndpoint";

function Dispatcher() {
  const [outletContext] = useOutletContext();
  const name = [{ label: "BlueDart" }, { label: "SafeX" }];
  const mode = [{ label: "By Air" }, { label: "By Road" }];
  const [parcelRows, setParcelRows] = useState([]);
  const [expandedRowData, setExpandedRowData] = useState(null);
  const tarun = outletContext.invoice;

  const [expandedRow, setExpandedRow] = useState(null);
  const [rows, setRows] = useState([]);
  const [filterRows, setFilterRows] = useState([]);

  const handleRowClick = (rowId) => {
    if (expandedRow === rowId) {
      // If the clicked row is already expanded, close it
      setExpandedRow(null);
    } else {
      // If the clicked row is not expanded, open it
      setExpandedRow(rowId);
    }
  };

  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    const getInvoice = async () => {
      try {
        const InvoiceResponse = await getAPI(
          `${apiEndpoints.getInvoicebyInvoiceNo}${tarun.invoiceNum}`
        );
        if (InvoiceResponse.errorMsg === "TOKEN HAS EXPIRED!!") {
          dispatch(setLogout());
          setAuthToken();
          return;
        }

        const rowData =
          InvoiceResponse?.data?.data?.items?.map((itm) => ({
            id: itm?.id,
            quantity: itm?.quantity,
            description: itm?.itemDescription,
            item: itm?.itemCode,
          })) ?? [];

        setRows(rowData);
        setFilterRows(rowData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getInvoice();
  }, [getAPI]);

  const columns = [
    { field: "id", headerName: "S.NO", width: 90 },
    { field: "quantity", headerName: "QUANTITY", width: 230 },
    { field: "description", headerName: "DESCRIPTION", width: 290 },
    {
      field: "item",
      headerName: "ITEM NUMBER",
      type: "number",

      width: 210,
    },
  ];
  useEffect(() => {
    const getParcel = async () => {
      try {
        const response = await getAPI(
          `${apiEndpoints.getReflexParcelbyInvoiceNo}${tarun.invoiceNum}`
        );
        if (response.errorMsg === "TOKEN HAS EXPIRED!!") {
          dispatch(setLogout());
          setAuthToken();
          return;
        }

        const parcelRowsData =
          response?.data?.data?.map((item) => ({
            id: item.id,
            field1: item?.parcelNo,
            field2: item?.parcelNoIsMatchedWithDevice,
            field3: (
              <TextField
                select
                label="Pass/Delete"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
                defaultValue="Select Manually"
                style={{ width: "100%" }}
                disabled={item?.parcelNoIsMatchedWithDevice}
              >
                <option value="Select Manually">Select Manually</option>
                <option value="Pass">Pass</option>
                <option value="Delete">Delete</option>
              </TextField>
            ),
            field5: (
              <TextField
                label="Remarks"
                variant="outlined"
                disabled={item?.parcelNoIsMatchedWithDevice}
              />
            ),
            // Additional fields for the expanded row

            field6: item.items.map((subItem) => subItem.id),
            field7: item.items.map((subItem) => subItem.itemCode),
            field8: item.items.map((subItem) => subItem.itemDescription),
            field9: item.items.map((subItem) => subItem.itemQty),
            field10: item.items.map((subItem) => subItem.orderNo),
          })) ?? [];

        setParcelRows(parcelRowsData);
      } catch (error) {
        console.error("Error fetching parcel data:", error);
      }
    };

    getParcel();
  }, []);

  const handleUpdate = async () => {
    const adminData = parcelRows.map((row) => ({
      id: row.id,
      manuallyStatus: row.field3.value,
      remarks: row.field5.value,
    }));
    debugger;
    console.log(adminData);

    try {
      const response = await putAPI(
        `${apiEndpoints.updateParcelRemarksAndManuStatus}${userData.userId}`,
        adminData
      );

      if (response.status === "Success") {
        outletContext.setActiveTab(31);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const parcelColumns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "field1", headerName: "Parcel Number", width: 150 },
    { field: "field2", headerName: "Matched", width: 150 },
    { field: "field3", headerName: "Manually Select", width: 150 },
    { field: "field5", headerName: "Remarks", width: 150 },
  ];

  return (
    <>
      <div className="mt-3 mb-4">
        <h3>Invoice Details</h3>
        <div className="d-flex justify-content end gap-2">
          {tarun.status !== "Submit" && (
            <Button
              variant="danger"
              className="d-flex justify-content-end"
              onClick={handleUpdate}
            >
              Submit
            </Button>
          )}
          <Button
            variant="dark"
            className="d-flex justify-content-end"
            onClick={() => {
              outletContext.setActiveTab(31);
            }}
          >
            Cancel
          </Button>
        </div>
        <br />
        <div>
          <Row>
            <Col>Invoice Number</Col>
            <Col>
              <TextField
                // label="Invoice Number"
                disabled
                variant="outlined"
                defaultValue={tarun.invoiceNum}
              />
            </Col>
            <Col></Col>
            <Col>LR Number</Col>
            <Col>
              <TextField
                // label="LR Number"
                variant="outlined"
                defaultValue={tarun.lrNumber}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>Supplier Name:</Col>
            <Col>
              <TextField
                // label="Supplier Name"
                variant="outlined"
                value={tarun.supplierLegalName}
              />
            </Col>
            <Col></Col>
            {/* <Col>Buyers Name:</Col> */}
            <Col>Dispatch List No.</Col>
            <Col>
              <TextField
                // label="Dispatch List"
                variant="outlined"
                value={tarun.packingListNo}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>Transporter Name</Col>
            <Col>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={name}
                value={tarun.transporterName}
                // sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="-----Transporter Name-----" />
                )}
              />
            </Col>
            <Col></Col>
            <Col>Transporter Mode</Col>
            <Col>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={mode}
                value={tarun.transporterMode}
                // sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="-----Transporter Mode-----" />
                )}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col>Exception</Col>
            <Col>
              <TextField
                // label="Supplier Name"
                variant="outlined"
                value={tarun.exception_msg}
              />
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </div>

        <br />
        <div>
          <h4>Invoice Items Details</h4>
          <CustomTable
            divClass={"h-470px mt-4"}
            checkbox={false}
            rows={filterRows}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            pageSize={5}
            columnWidth={240}
          />
        </div>

        <br />
        <div>
          <h4>Parcel details</h4>
          <Table bordered hover>
            <thead>
              <tr>
                {parcelColumns.map((column) => (
                  <th key={column.field} style={{ width: column.width }}>
                    {column.headerName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parcelRows.map((row) => (
                <React.Fragment key={row.id}>
                  <tr>
                    {parcelColumns.map((column) => (
                      <td key={column.field}>
                        {" "}
                        {column.field === "field1" ? (
                          <span
                            style={{ cursor: "pointer" }}
                            onClick={() => handleRowClick(row.id)}
                          >
                            {row[column.field]}
                          </span>
                        ) : (
                          row[column.field]
                        )}
                      </td>
                    ))}
                  </tr>
                  {expandedRow === row.id && (
                    <tr>
                      <td colSpan={parcelColumns.length}>
                        <Table>
                          <thead>
                            <tr>
                              <th style={{ fontSize: "12px" }}>S No.</th>
                              <th style={{ fontSize: "12px" }}>Item Code</th>
                              <th style={{ fontSize: "12px" }}>
                                Item Description
                              </th>
                              <th style={{ fontSize: "12px" }}>
                                Item Quantity
                              </th>
                              <th style={{ fontSize: "12px" }}>Order No.</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.field6.map((item, index) => (
                              <tr key={item}>
                                <td>{item}</td>
                                <td>{row.field7[index]}</td>
                                <td>{row.field8[index]}</td>
                                <td>{row.field9[index]}</td>
                                <td>{row.field10[index]}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Dispatcher;
