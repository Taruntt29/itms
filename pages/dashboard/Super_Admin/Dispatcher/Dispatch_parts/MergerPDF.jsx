import React from "react";
import "./MergePDF.css";
import InvoiceLogoImage from "../../../../../assets/images/ManitouGroup_Logo_Transp.png";
const ref = React.createRef();
const MergerPDF = ({ parcelData }) => {
  return (
    <div className="Invoice">
      <div ref={ref}>
        <div className="printpage">
          <div className="header">
            <div className="logo">
              <img src={InvoiceLogoImage}></img>
            </div>
            <div className="dateDiv">
              <span className=""> Despatch Note/Packing List</span>
            </div>
          </div>
          <div className="HeaderTitle">
            <span>{parcelData?.companyName}</span>
          </div>
          <div className="reportcontent">
            <div className="headerDetail">
              <div className="DocPatientDetail">
                <div className="">
                  <div className="detailContainer">
                    <span className="labelData ">
                      {parcelData?.companyAddress2},
                      {parcelData?.companyAddress1}
                    </span>
                  </div>
                  <div className="detailContainer">
                    <span className="labelData ">
                      {parcelData?.companyPincode} {parcelData?.companyCity}{" "}
                      {parcelData?.companyState}
                    </span>
                  </div>
                  <div className="detailContainer">
                    <span className="labelData ">
                      {parcelData?.consigneCountrycode}
                    </span>
                  </div>
                </div>
                <div className="userDetailiconleft">
                  <div className="">
                    <p className="labelDataleft">Consignee</p>
                    <p className="consigneedescleft">
                      {parcelData?.consigneeName} <br />{" "}
                      {parcelData?.consigneeAddress1}, <br />{" "}
                      {parcelData?.consigneePlace},{parcelData?.consigneeState},{" "}
                      <br />
                      {parcelData?.consigneePincode}{" "}
                      {parcelData?.consigneeState} <br />{" "}
                      {parcelData?.consigneCountrycode}
                    </p>
                  </div>
                </div>
                <div className="userDetailiconright">
                  <div className="">
                    <p className="labelDataright">Place of Destination</p>
                    <p className="consigneedescright">
                      {parcelData?.shippingtoName} <br />{" "}
                      {parcelData?.shippingtoAddress1},
                      {parcelData?.shippingtoAddress2} <br />{" "}
                      {parcelData?.shippingtoPlace},
                      {parcelData?.shippingtoState}, <br />
                      {parcelData?.shippingtoPincode}{" "}
                      {parcelData?.shippingtoState} <br />{" "}
                      {parcelData?.shippingtoCountrycode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="Delivery-info">
              <div className="">
                <div className="deliveryContainer">
                  <span className="Delivery-lable">Delivery</span>
                  <div className="deliveryDescription">
                    <div className="delivery-form-left">
                      <table style={{ width: "83%" }}>
                        <tr>
                          <th></th>
                          <th></th>
                        </tr>
                        <tr>
                          <td>Reason for transport : </td>
                          <td>{parcelData?.deliveryDate}</td>
                        </tr>
                        <tr>
                          <td>Delivery Date : </td>
                          <td>{parcelData?.deliveryDate}</td>
                        </tr>
                        <tr>
                          <td>Preparation Nr : </td>
                          <td>{parcelData?.preparationNr}</td>
                        </tr>
                      </table>
                    </div>
                    <div className="delivery-form-right">
                      <table style={{ width: "125%" }}>
                        <tr>
                          <th></th>
                          <th></th>
                        </tr>
                        <tr>
                          <td>Transporation by the : </td>
                          <td>{parcelData?.transportationBy}</td>
                        </tr>
                        <tr>
                          <td>Carrier : </td>
                          <td>{parcelData?.shipmentNo}</td>
                        </tr>
                        <tr>
                          <td>N Delivery : </td>
                          <td>{parcelData?.deliveryNo}</td>
                        </tr>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="dataTableContainer">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Item Code</th>
                    <th scope="col">Description</th>
                    <th scope="col">Qty</th>
                    <th scope="col">Order Number</th>
                    <th scope="col">Customer Order Nr</th>
                    <th scope="col">Parcel</th>
                    <th scope="col">Hazardous Material</th>
                    <th scope="col">Net Weight Kg.</th>
                  </tr>
                </thead>
                <tbody>
                  {parcelData?.parcelDetails?.map((_el, _ind) => {
                    return (
                      <>
                        {_el?.items?.map((parcelDetailsInfo, ind) => {
                          return (
                            <tr key={ind + _ind}>
                              <td>{parcelDetailsInfo.itemCode}</td>
                              <td>{parcelDetailsInfo.itemDescription}</td>
                              <td>{parcelDetailsInfo.itemQty}</td>
                              <td>{parcelDetailsInfo.orderNo}</td>
                              <td>{parcelDetailsInfo.customerOrderNr}</td>
                              <td>{_el.parcelNo}</td>
                              <td>{parcelDetailsInfo.hazardousMaterial}</td>
                              <td>{parcelDetailsInfo.itemNetWeight}</td>
                            </tr>
                          );
                        })}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="dataTableContainerTwo">
              <div className="tableHead">
                <span>Parcel Summary</span>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Gross Weight Kg.</th>
                    <th scope="col">Net Weight Kg.</th>
                    <th scope="col">L * W * H (mm)</th>
                    {/* <th scope="col">Parcel Number</th> */}
                    <th scope="col">Pac</th>
                    <th scope="col">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {parcelData?.parcelDetails?.map((parcelSummryInfo, index) => (
                    <tr key={index}>
                      <td>
                        {parcelSummryInfo.parcelNo
                          ? parcelSummryInfo.parcelNo
                          : ""}
                      </td>
                      <td>
                        {parcelSummryInfo.parcelGrossWeight
                          ? parcelSummryInfo.parcelGrossWeight
                          : ""}
                      </td>
                      <td>
                        {parcelSummryInfo.parcelBarCode
                          ? parcelSummryInfo.parcelBarCode
                          : ""}
                      </td>
                      <td>
                        {parcelSummryInfo.parcelLength
                          ? parcelSummryInfo.parcelLength
                          : ""}
                        *
                        {parcelSummryInfo.parcelWidth
                          ? parcelSummryInfo.parcelWidth
                          : ""}
                        *
                        {parcelSummryInfo.parcelHeight
                          ? parcelSummryInfo.parcelHeight
                          : ""}
                      </td>
                      <td>
                        {parcelSummryInfo.parcelPac
                          ? parcelSummryInfo.parcelPac
                          : ""}
                      </td>
                      <td>
                        {parcelSummryInfo.location
                          ? parcelSummryInfo.location
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="Delivery-info">
              <div className="detailContainer">
                <div className="deliveryDescription">
                  <span className="external-appearance-lable">
                    External appearance of goods :
                  </span>
                </div>
              </div>
            </div>
            <div className="deliveryDescription">
              <div className="detailContainer">
                <table style={{ width: "100%" }}>
                  <div className="Delivery-info-signature">
                    <tr>
                      <th style={{ float: "left", marginLeft: "37px" }}>
                        Carrier Signature
                      </th>
                      <th style={{ float: "right", marginLeft: "390px" }}>
                        Authoried Signature
                      </th>
                    </tr>
                  </div>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};
export default MergerPDF;
