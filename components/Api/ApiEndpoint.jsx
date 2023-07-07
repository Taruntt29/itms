export const apiEndpoints = {
  createToken: "/authenticate/createToken",
  saveUser: "/user/saveUser",
  updateUser: "/user/updateUser",
  getAllUser: "/user/getAllUser",
  deleteUserById: "/user/deleteUserById?userid=",
  getUserById: "/user/getUserById?id=28",
  resetPasswordByAdmin: "/user/resetPasswordByAdmin",
  resetPasswordByUser: "/user/resetPasswordByUser",
  getAllRole: "/getAllRole",
  getAllBranches: "/branch/getAllBranch",
  getInbondDetailsByStatus: "/inbond/getInbondDetailsByStatus",
  updateInbondDetailsData: "/inbond/updateInbondDetailsData?userName=",
  getAllInvoiceData: "/outbond/domestic/machine/getAllInvoiceData",
  updateData: "/outbond/domestic/machine/updateData?userName=",
  updateDataE: "/outbond/export/machine/updateData?userName=",
  savedata: "/outbond/domestic/transport/savedata?domesticMachineid=",
  getAlInvoiceData1: "/outbond/export/machine/getAlInvoiceData",
  savedata1: "/outbond/export/transport/savedata?exportMachineid=",
  getAllInvoiceDataParts: "/outbond/domestic/parts/getAllInvoiceData",
  getRolesByUserId: "/user/getRolesByUserId?userId=",
  getByTransportDocNumber:
    "/outbond/domestic/transport/getByTransportDocNumber?transportDocNumber=",
  getReflexParcelDetailsByInvoicebyQrnCode:
    "/outbond/domestic/parts/getReflexParcelDetailsByInvoicebyQrnCode?invoiceQrCode=",
  updateInvPartOfTranModeLrNumAndTranName:
    "/outbond/domestic/parts/updateInvPartOfTranModeLrNumAndTranName?userName=",
  updateInvPartOfStatus:
    "/outbond/domestic/parts/updateInvPartOfStatus?userName=",
  updateParcel: "/dispatch/parcel/updateParcel?userName=",
  getMergerDispatchData: "/dispatch/getMergerDispatchData",
  saveMergerDispatchData: "/dispatch/saveMergerDispatchData",
  getInvoicebyInvoiceNo:
    "/outbond/domestic/parts/getInvoicebyInvoiceNo?invoiceNum=",
  getReflexParcelbyInvoiceNo:
    "/outbond/domestic/parts/getReflexParcelbyInvoiceNo?invoiceNum=",
  updateMerger: "/dispatch/updateMerger?userId=",
  updateInvPartAgainstInvNumOfTranModLrNumTranName:
    "/outbond/domestic/parts/updateInvPartAgainstInvNumOfTranModLrNumTranName?userId=",
  getAllTransporterData: "/outbond/transporter/getAllTransporterData",
  getInvoicesByStatusDomestic:
    "/outbond/domestic/machine/getInvoicesByStatus?status=",
  getInvoicesByStatusExports:
    "/outbond/export/machine/getInvoicesByStatus?status=",
  getInvoicesByStatusParts:
    "/outbond/domestic/parts/getInvoicesByStatus?status=",
  mergerdispatchNo: "/dispatch/getReflexMergerDispNo?mergerdispatchNo=",
  transportDocNumberE:
    "/outbond/export/transport/getByTransportDocNumber?transportDocNumber=",
  saveTransParts:
    "/outbond/transport/domestic/parts/saveTransParts?invPartsPrimeryId=",
  updateDataPD: "/outbond/domestic/parts/updateData?userName=",
  getTrnsPartsByTransDocNum:
    "/outbond/transport/domestic/parts/getTrnsPartsByTransDocNum?transportDocNumber=",
  getUserByUserId: "/user/getUserByUserId?userId=",
  saveDeliveryPartnerData: "/outbond/transporter/savedata",
  UpdateDeliveryPartnerData: "outbond/transporter/updateData?userId=",
  getAllInvoiceDataReportsDM: "/outbond/domestic/machine/getAllInvoiceData",
  getAlInvoiceDataEM: "/outbond/export/machine/getAlInvoiceData", ///////check
  getAllInvoiceDataPD: "/outbond/domestic/parts/getAllInvoiceData",
  getAllInbondDataReports: "/inbond/getAllInbondData",
  getAllTransporterMasterData:
    "/outbond/transporter/master/getAllTransporterData",
  saveTransporterMasterdata: "/outbond/transporter/master/savedata",
  updateTransporterMasterdata: "/outbond/transporter/master/updateData?userId=",
  saveOutBoundManualMachineData: "/outbond/manualMachine/savedata",
  updateTransporterMasterStatus:
    "/outbond/transporter/master/updateStatus?userId=",
  updatePriceCSVFileUpload: "/dispatch/price/upload",
  updateStockCSVFileUpload: "/dispatch/stock/upload",
  updateParcelRemarksAndManuStatus:
    "/dispatch/parcel/updateParcelRemarksAndManuStatus?userName=",
};
