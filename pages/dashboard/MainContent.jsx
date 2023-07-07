import { useOutletContext } from "react-router-dom";
import Invoice from "./e-invoice/Invoice";
import User from "./user/User";
import AddUser from "./user/AddUser";
import NewAddUser from "./add-user/NewAddUser";
// import UserRole from "./Super_Admin/UserRole";
import UserLogin from "./Super_Admin/UserLogin";

import CronJob from "./Super_Admin/CronJob";
import Outbound from "./Super_Admin/Outbound";
import MachineDispatch from "./Super_Admin/MachineDispatch";
import Inbound from "./Super_Admin/Inbound";
import Reports from "./Super_Admin/Reports";
import InboundApproval from "./Super_Admin/InboundApproval";
import DomesticMachineO from "./Super_Admin/Outbound/Machine_Outbound/DomesticMachineO";
import DomesticPartsO from "./Super_Admin/Outbound/Parts_Outbound/DomesticPartsO";
import ExportPartsO from "./Super_Admin/Outbound/Parts_Outbound/ExportPartsO";
import ExportMachineO from "./Super_Admin/Outbound/Machine_Outbound/ExportMachineO";
import TransporterCharges from "./Super_Admin/Transporter_Charges/TransporterCharges";
import TransportFill from "./Super_Admin/Outbound/TransportFill";
import Dispatcher from "./Super_Admin/Dispatcher/Dispatcher";
import PartsDispatch from "./Super_Admin/Dispatcher/Dispatch_parts/PartsDispatch";
import PartsDispatch2 from "./Super_Admin/Dispatcher/Dispatch_parts/PartsDispatch2";
import PartsDispatch3 from "./Super_Admin/Dispatcher/Dispatch_parts/PartsDispatch3";
import DummyTable from "./Super_Admin/DummyTable/DummyTable";
import InboundApproved from "./Super_Admin/InboundApproved";
import Delivery from "./Super_Admin/Delivery/Delivery.jsx";
import ExportMachineTable from "./Super_Admin/Outbound/Machine_Outbound/ExportMachineTable";
import DomesticApproval from "./Super_Admin/Outbound/Machine_Outbound/DomesticApproval";
import DomesticApprovalData from "./Super_Admin/Outbound/Machine_Outbound/DomesticApprovalData";
import ExportMachineApproval from "./Super_Admin/Outbound/Machine_Outbound/ExportMachineApproval";
import ExportApprovalTable from "./Super_Admin/Outbound/Machine_Outbound/ExportApprovalTable";
import DomesticPartsTable from "./Super_Admin/Outbound/Parts_Outbound/DomesticPartsTable";
import Dispatch from "./Super_Admin/Dispatcher/Dispatch";
import PartsUpload from "./Super_Admin/Outbound/Parts_Outbound/PartsUpload";
import MergerDisptch from "./Super_Admin/Dispatcher/MergerDisptch";
import DomesticMachineApproved from "./Super_Admin/Outbound/Machine_Outbound/DomesticMachineApproved";
import MachineApprovedData from "./Super_Admin/Outbound/Machine_Outbound/MachineApprovedData";
import ReportsInbound from "./Super_Admin/Reports/ReportsInbound";
import AddMerger from "./Super_Admin/Dispatcher/Dispatch_parts/AddMerger";
import UpdateMerger from "./Super_Admin/Dispatcher/UpdateMerger";
import DeliveryTable from "./Super_Admin/Delivery/DeliveryTable";
import MergerPDF from "./Super_Admin/Dispatcher/Dispatch_parts/MergerPDF";
import UpdateBluedart from "./Super_Admin/Delivery/UpdateBluedart";
import UpdateSafeX from "./Super_Admin/Delivery/UpdateSafeX";
import ExportMachineApproved from "./Super_Admin/Outbound/Machine_Outbound/ExportMachineApproved";
import ExportApprovedTable from "./Super_Admin/Outbound/Machine_Outbound/ExportApprovedTable";
import DPartsApproval from "./Super_Admin/Outbound/Parts_Outbound/DPartsApproval";
import DPartsApproved from "./Super_Admin/Outbound/Parts_Outbound/DPartsApproved";
import DApprovalTable from "./Super_Admin/Outbound/Parts_Outbound/DApprovalTable";
import DApprovedTable from "./Super_Admin/Outbound/Parts_Outbound/DApprovedTable";
import CSBPartsUpload from "./Super_Admin/Outbound/Parts_Outbound/CBSPartsUpload";
import ReportsDomesticMachine from "./Super_Admin/Reports/ReportsDomesticMachine";
import ReportsExportMachine from "./Super_Admin/Reports/ReportsExportMachine";
import ReportsDomesticParts from "./Super_Admin/Reports/ReportsDomesticParts";
import TransporterDetailsList from "./Super_Admin/Outbound/Parts_Outbound/TransporterDetails/TransporterDetailsList";

import UpdateTransporter from "./Super_Admin/Outbound/Parts_Outbound/TransporterDetails/UpdateTransporter";
import AddTransporter from "./Super_Admin/Outbound/Parts_Outbound/TransporterDetails/AddTransporter";
import ExportPartsForApproval from "./Super_Admin/Outbound/Parts_Outbound/ExportPartsForApproval";
import ExportPartsApproval from "./Super_Admin/Outbound/Parts_Outbound/ExportPartsApproval";

const MainContent = () => {
  const [outletContext] = useOutletContext();
  return (
    <div className="ms-5 me-4">
      {outletContext.activeTab === 0 && <User />}
      {outletContext.activeTab === 1 && <Invoice />}
      {outletContext.activeTab === 2 && <AddUser />}
      {outletContext.activeTab === 3 && <NewAddUser />}
      {outletContext.activeTab === 4 && <UserRole />}
      {outletContext.activeTab === 5 && <UserLogin />}
      {outletContext.activeTab === 6 && <CronJob />}
      {outletContext.activeTab === 7 && <Dispatcher />}
      {outletContext.activeTab === 8 && <Outbound />}
      {outletContext.activeTab === 9 && <MachineDispatch />}
      {outletContext.activeTab === 10 && <Inbound />}
      {outletContext.activeTab === 11 && <Reports />}
      {outletContext.activeTab === 12 && <InboundApproval />}
      {outletContext.activeTab === 13 && <DomesticMachineO />}
      {outletContext.activeTab === 14 && <ExportMachineO />}
      {outletContext.activeTab === 15 && <DomesticPartsO />}
      {outletContext.activeTab === 16 && <ExportPartsO />}
      {outletContext.activeTab === 17 && <TransporterCharges />}
      {outletContext.activeTab === 18 && <TransportFill />}
      {outletContext.activeTab === 19 && <PartsDispatch />}
      {outletContext.activeTab === 20 && <PartsDispatch2 />}
      {outletContext.activeTab === 21 && <PartsDispatch3 />}
      {outletContext.activeTab === 22 && <DummyTable />}
      {outletContext.activeTab === 23 && <InboundApproved />}
      {outletContext.activeTab === 24 && <Delivery />}
      {outletContext.activeTab === 25 && <ExportMachineTable />}
      {outletContext.activeTab === 26 && <DomesticApproval />}
      {outletContext.activeTab === 27 && <DomesticApprovalData />}
      {outletContext.activeTab === 28 && <ExportMachineApproval />}
      {outletContext.activeTab === 29 && <ExportApprovalTable />}
      {outletContext.activeTab === 30 && <DomesticPartsTable />}
      {outletContext.activeTab === 31 && <Dispatch />}
      {outletContext.activeTab === 32 && <PartsUpload />}
      {outletContext.activeTab === 33 && <MergerDisptch />}
      {outletContext.activeTab === 34 && <DomesticMachineApproved />}
      {outletContext.activeTab === 35 && <MachineApprovedData />}
      {outletContext.activeTab === 36 && <ReportsInbound />}
      {outletContext.activeTab === 37 && <AddMerger />}
      {outletContext.activeTab === 38 && <UpdateMerger />}
      {outletContext.activeTab === 39 && <DeliveryTable />}
      {outletContext.activeTab === 40 && <MergerPDF />}
      {outletContext.activeTab === 41 && <UpdateBluedart />}
      {outletContext.activeTab === 42 && <UpdateSafeX />}
      {outletContext.activeTab === 43 && <ExportMachineApproved />}
      {outletContext.activeTab === 44 && <ExportApprovedTable />}
      {outletContext.activeTab === 45 && <DPartsApproval />}
      {outletContext.activeTab === 46 && <DApprovalTable />}
      {outletContext.activeTab === 47 && <DPartsApproved />}
      {outletContext.activeTab === 48 && <DApprovedTable />}
      {outletContext.activeTab === 49 && <CSBPartsUpload />}
      {outletContext.activeTab === 50 && <ReportsDomesticMachine />}
      {outletContext.activeTab === 51 && <ReportsExportMachine />}
      {outletContext.activeTab === 52 && <ReportsDomesticParts />}
      {outletContext.activeTab === 53 && <TransporterDetailsList />}
      {outletContext.activeTab === 54 && <AddTransporter />}
      {outletContext.activeTab === 55 && <UpdateTransporter />}
      {outletContext.activeTab === 56 && <ExportPartsForApproval />}
      {outletContext.activeTab === 57 && <ExportPartsApproval />}
    </div>
  );
};

export default MainContent;
