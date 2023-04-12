import { Box, Drawer, List, Typography } from "@mui/material";
import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
// import LogoutIcon from '@mui/icons-material/Logout';
import { AuthConsumer } from "../../context/AuthContext";
import { useAuthService } from "../../context/AuthenServiceContext";
export default function DrawerSideBar(props) {
  const { token } = AuthConsumer();
  const { handleSetVisible } = useAuthService();
  const { state, toggleDrawer } = props;
  const navigate = useNavigate();
  // const handleLogout = () => {
  //   logout();
  // }

  const handlePersonInfo = () => {};

  return (
    <Drawer
      anchor={"right"}
      open={state}
      onClose={() => {
        toggleDrawer(false);
      }}
    >
      <List
        sx={{ width: "260px", maxWidth: 260, bgcolor: "background.paper" }}
        component="nav"
      >
        <ListItemButton onClick={handlePersonInfo}>
          <ListItemIcon>
            <PersonIcon sx={{ color: "#2596be" }} />
          </ListItemIcon>
          <Box display="block">
            <Typography
              sx={{ fontWeight: 700, fontSize: "14px", letterSpacing: "0.4px" }}
            >
              {token?.customerName?.toUpperCase()}
            </Typography>
            <Typography sx={{ fontWeight: 400, fontSize: "13px" }}>
              {token?.phoneNumber ? "+" + token?.phoneNumber : ""}
            </Typography>
          </Box>
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            if (!token) {
              handleSetVisible(true);
              return;
            }
            navigate("/home");
            toggleDrawer(false);
          }}
        >
          <ListItemIcon>
            <HomeIcon sx={{ color: "#2596be" }} />
          </ListItemIcon>
          <ListItemText primary="Trang chủ" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            if (!token) {
              handleSetVisible(true);
              return;
            }
            navigate("/order-tracking");
            toggleDrawer(false);
          }}
        >
          <ListItemIcon>
            <LocalShippingIcon sx={{ color: "#2596be" }} />
          </ListItemIcon>
          <ListItemText primary="Theo dõi đơn hàng" />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            if (!token) {
              handleSetVisible(true);
              return;
            }
            navigate("/history-transaction");
            toggleDrawer(false);
          }}
        >
          <ListItemIcon>
            <ReceiptLongIcon sx={{ color: "#2596be" }} />
          </ListItemIcon>
          <ListItemText primary="Lịch sử giao dịch" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
