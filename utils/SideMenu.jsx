import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import ListIcon from "@mui/icons-material/List";
import Tooltip from '@mui/material/Tooltip';
export const superAdminUserMenuItems = [
  { id: 0, menuLabel: "User", icon: <PeopleAltRoundedIcon /> },
  {
    subMenuLabel: "Dispatcher",
    icon: <ListIcon />,
    // open: false,
    subMenu: [
      { id: 31, menuLabel: "Dispatch", icon: <PeopleAltRoundedIcon /> },
      { id: 19, menuLabel: "Parts Dispatch", icon: <PeopleAltRoundedIcon /> },
      { id: 33, menuLabel: "Merger Dispatch", icon: <PeopleAltRoundedIcon /> },
      // { id: 40, menuLabel: "Merger PDF", icon: <PeopleAltRoundedIcon /> },
    ],
  },
  {
    subMenuLabel: "Inbound",
    icon: <ListIcon />,
    // open: false,
    subMenu: [
      { id: 10, menuLabel: "Inbound", icon: <PeopleAltRoundedIcon /> },
      { id: 11, menuLabel: "Inbound Approval", icon: <PeopleAltRoundedIcon /> },
      { id: 23, menuLabel: "Inbound Approved", icon: <PeopleAltRoundedIcon /> },
    ],
  },
  {
    subMenuLabel: "Machine Outbound",
    icon: <ListIcon />,
    // open: false,
    subMenu: [
      {
        id: 13,
        menuLabel: "Domestic Machine",
        title:"Domestic Machine",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 26,
        menuLabel: "Domestic Approval",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 34,
        menuLabel: "Domestic Approved",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 14,
        menuLabel: "Export Machine",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 28,
        menuLabel: "Export Approval",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 43,
        menuLabel: "Export Approved",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 18,
        menuLabel: "Manual Machine Bill",
        icon: <PeopleAltRoundedIcon />,
      },
    ],
  },
  // {
  //   subMenuLabel: "Machine Outbound",
  //   icon: <ListIcon />,
  //   subMenu: [
  //     {
  //       subMenuLabel: "Domestic Machine",
  //       icon: <PeopleAltRoundedIcon />,
  //       deepSubMenu: [
  //         {
  //           id: 13,
  //           menuLabel: "Domestic Approval",
  //           icon: <PeopleAltRoundedIcon />,
  //           deepSubMenu: [
  //             {
  //               id: 34,
  //               menuLabel: "Domestic Approved",
  //               icon: <PeopleAltRoundedIcon />,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  {
    subMenuLabel: "Parts Outbound",
    icon: <ListIcon />,
    // open: true,
    subMenu: [
      {
        id: 15,
        menuLabel: "Domestic Parts",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 45,
        menuLabel: "Domestic Parts Approval",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 47,
        menuLabel: "Domestic Parts Approved",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 16,
        menuLabel: "Export Parts",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 56,
        menuLabel: "Export Parts For Approval",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 57,
        menuLabel: "Export Parts Approved",
        icon: <PeopleAltRoundedIcon />,
      },
    ],
  },
  {
    subMenuLabel: "Delivery ",
    icon: <ListIcon />,
    // open: true,
    subMenu: [
      {
        id: 39,
        menuLabel: "Delivery Partner",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 53,
        menuLabel: "Transporter Details",
        icon: <PeopleAltRoundedIcon />,
      },
    ],
  },
  {
    subMenuLabel: "File Upload ",
    icon: <ListIcon />,
    // open: true,
    subMenu: [
      {
        id: 32,
        menuLabel: "EXCEL File Upload",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 49,
        menuLabel: "CSV File Upload",
        icon: <PeopleAltRoundedIcon />,
      },
    ],
  },
  {
    subMenuLabel: "Reports",
    icon: <ListIcon />,
    // open: true,
    subMenu: [
      {
        id: 36,
        menuLabel: "Inbound Reports",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 50,
        menuLabel: "Domestic Machine",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 51,
        menuLabel: "Exports Machine",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 52,
        menuLabel: "Domestic Parts",
        icon: <PeopleAltRoundedIcon />,
      },
    ],
  },
];
export const partDispatchUserMenuItems = [
  { id: 19, menuLabel: "Parts Dispatch", icon: <PeopleAltRoundedIcon /> },
];
export const partAdminDispatchUserMenuItems = [
  { id: 31, menuLabel: "Dispatch", icon: <PeopleAltRoundedIcon /> },
  { id: 33, menuLabel: "Merger Dispatch", icon: <PeopleAltRoundedIcon /> },
  {
    id: 32,
    menuLabel: "EXCEL File Upload",
    icon: <PeopleAltRoundedIcon />,
  },
];
export const MachineUserMenuItems = [
  {
    subMenuLabel: "Machine Outbound",
    icon: <ListIcon />,
    // open: false,
    subMenu: [
      {
        id: 13,
        menuLabel: "Domestic Machine",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 26,
        menuLabel: "Domestic Approval",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 34,
        menuLabel: "Domestic Approved",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 14,
        menuLabel: "Export Machine",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 28,
        menuLabel: "Export Approval",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 43,
        menuLabel: "Export Approved",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 18,
        menuLabel: "Manual Machine Bill",
        icon: <PeopleAltRoundedIcon />,
      },
    ],
  },
];
export const MachineAdminMenuItems = [
  {
    subMenuLabel: "Machine Outbound",
    icon: <ListIcon />,
    // open: false,
    subMenu: [
      {
        id: 13,
        menuLabel: "Domestic Machine",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 26,
        menuLabel: "Domestic Approval",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 34,
        menuLabel: "Domestic Approved",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 14,
        menuLabel: "Export Machine",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 28,
        menuLabel: "Export Approval",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 43,
        menuLabel: "Export Approved",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 18,
        menuLabel: "Manual Machine Bill",
        icon: <PeopleAltRoundedIcon />,
      },
    ],
  },
];
export const inboundUserMenuItems = [
  {
    subMenuLabel: "Inbound",
    icon: <ListIcon />,
    // open: false,
    subMenu: [
      { id: 10, menuLabel: "Inbound", icon: <PeopleAltRoundedIcon /> },
      { id: 11, menuLabel: "Inbound Approval", icon: <PeopleAltRoundedIcon /> },
      { id: 23, menuLabel: "Inbound Approved", icon: <PeopleAltRoundedIcon /> },
    ],
  },
];
export const inboundAdminMenuItems = [
  {
    subMenuLabel: "Inbound",
    icon: <ListIcon />,
    // open: false,
    subMenu: [
      { id: 10, menuLabel: "Inbound", icon: <PeopleAltRoundedIcon /> },
      { id: 11, menuLabel: "Inbound Approval", icon: <PeopleAltRoundedIcon /> },
      { id: 23, menuLabel: "Inbound Approved", icon: <PeopleAltRoundedIcon /> },
    ],
  },
];
export const accountsMenuItems = [
  {
    subMenuLabel: "Reports",
    icon: <ListIcon />,
    // open: true,
    subMenu: [
      {
        id: 36,
        menuLabel: "Inbound Reports",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 50,
        menuLabel: "Domestic Machine",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 51,
        menuLabel: "Exports Machine",
        icon: <PeopleAltRoundedIcon />,
      },
      {
        id: 52,
        menuLabel: "Domestic Parts",
        icon: <PeopleAltRoundedIcon />,
      },
    ],
  },
];
