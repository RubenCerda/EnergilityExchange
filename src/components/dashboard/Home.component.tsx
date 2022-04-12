import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import DashboardSidebar from "./navigationConfig/DashboardSidebar.component";
import DashboardNavbarComponent from "./navigationConfig/DashboardNavbar.component";

// ----------------------------------------------------------------------

const APP_BAR_DESKTOP = 92;

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const [open, setOpen] = useState(false);

  return (
    <RootStyle>
      <DashboardNavbarComponent onOpenSidebar={() => setOpen(true)} />
      <div className="container fm_main_container">
        <Outlet />
      </div>
    </RootStyle>
  );
}
