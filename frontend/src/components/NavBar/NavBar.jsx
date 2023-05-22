import React from "react";
import styles from "./NavBar.module.css";
import Drawer from "@mui/material/Drawer";
import { List, ListItem, ListItemIcon } from "@mui/material";
import { NavLink } from "react-router-dom";
import TheatersIcon from "@mui/icons-material/Theaters";
import VideocamIcon from "@mui/icons-material/Videocam";
import HdIcon from "@mui/icons-material/Hd";

const NavBar = (props) => {
  const menuItems = [
    { icon: <TheatersIcon sx={{ color: "white" }} />, label: "Фільми" },
    { icon: <VideocamIcon sx={{ color: "white" }} />, label: "Серіали" },
    { icon: <HdIcon sx={{ color: "white" }} />, label: "Новинки" },
  ];

  const { menuOpen, closeMenu = Function.prototype } = props;

  return (
    <Drawer
      anchor="left"
      open={menuOpen}
      onClose={closeMenu}
      PaperProps={{
        sx: {
          backgroundColor: "black",
        },
      }}
    >
      <List
        sx={{
          width: "250px",
        }}
      >
        {menuItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <div className={styles.menuItem}>
              <NavLink
                to={"/" + item.label.toLowerCase()}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : null
                }
              >
                {item.label}
              </NavLink>
            </div>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default NavBar;
