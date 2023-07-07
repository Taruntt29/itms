import PropTypes from "prop-types";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "../../common/Common.css";

const CustomSidebar = (props) => {
  const { collapseSidebar, collapsed } = useProSidebar();

  const onClickHandler = (tab) => {
    props.setActiveTab(tab);
  };

  const menuItems = props.menuItems.map((menu, menuIndex) => {
    if (menu.subMenu) {
      // if(menu.)
      return (
        <SubMenu
          key={menuIndex}
          label={menu.subMenuLabel}
          icon={menu.icon}
          open={menu.subMenuLabel === props.open}
          onClick={props.subMenuOnClick.bind(null, menu.subMenuLabel)}
        >
          {menu.subMenu.map((subMenu, subMenuIndex) => {
            if (subMenu.deepSubMenu) {
              return (
                // <SubMenu label={subMenu.deepSubMenuLabel}>
                //   {subMenu.deepSubMenu.map((itm) => (
                //     <MenuItem>{itm.menuLabel}</MenuItem>
                //   ))}
                // </SubMenu>
                <SubMenu
                  key={subMenuIndex}
                  label={subMenu.deepSubMenuLabel}
                  icon={subMenu.icon}
                  open={subMenu.deepSubMenuLabel === props.open}
                  onClick={props.subMenuOnClick.bind(
                    null,
                    subMenu.deepSubMenuLabel
                  )}
                >
                  {subMenu.deepSubMenu.map((itm) => (
                    <MenuItem key={itm.menuLabel}>{itm.menuLabel}</MenuItem>
                  ))}
                </SubMenu>
              );
            } else {
              return (
                <MenuItem
                  key={menuIndex + subMenuIndex}
                  icon={subMenu.icon}
                  onClick={() => {
                    onClickHandler(subMenu.id);
                  }}
                >
                  {subMenu.menuLabel}
                </MenuItem>
              );
            }
          })}
        </SubMenu>
      );
    } else {
      return (
        <MenuItem
          key={menuIndex}
          icon={menu.icon}
          onClick={() => {
            onClickHandler(menu.id);
          }}
        >
          {menu.menuLabel}
        </MenuItem>
      );
    }
  });

  return (
    <Sidebar className="border border-danger bg-red h-100">
      <Menu defaultOpen={true} className="bg-red h-100">
        <MenuItem
          icon={<MenuOutlinedIcon />}
          onClick={() => {
            collapseSidebar();
            props.setCollapsed(!collapsed);
          }}
        ></MenuItem>
        {menuItems}
      </Menu>
    </Sidebar>
  );
};

CustomSidebar.propTypes = {
  setActiveTab: PropTypes.func.isRequired,
  setCollapsed: PropTypes.func.isRequired,
  menuItems: PropTypes.array.isRequired,
  subMenuOnClick: PropTypes.func,
  open: PropTypes.string,
};

export default CustomSidebar;
