import PropTypes from "prop-types";
import { alpha, styled } from "@mui/material/styles";
import { Box, Stack, AppBar, Toolbar, Button } from "@mui/material";
import UserAccountComponent from "../../users/UserAccount.component";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

const DRAWER_WIDTH = 280;
const APPBAR_DESKTOP = 92;

DashboardNavbarComponent.propTypes = {
  onOpenSidebar: PropTypes.func,
};

export default function DashboardNavbarComponent(onOpenSidebar: any) {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const profileName =`${cookies.get("firstName")} ${cookies.get("lastName")}`

  const logOut = () => {
    cookies.remove("userId", { path: "/" });
    cookies.remove("userName", { path: "/" });
    cookies.remove("firstName", { path: "/" });
    cookies.remove("lastName", { path: "/" });
    cookies.remove("email", { path: "/" });
    navigate("/", { replace: true });
  };

  return (
    <RootStyle>
      {/* Styled version */}
      <div className="container fm_main_container--topheader ">
        <div className="row h-100 align-items-center justify-content-between">
          <div className="col-auto">
            <div className="fm-logo"></div>
          </div>
          <div className="col-auto">
            <div
              className="d-flex align-items-center fm_th_btn fm-button--link--it"
              onClick={() => logOut()}
            >
              <div className="fa-xl">
                <FontAwesomeIcon icon={faCircleUser} />
              </div>
              <p>{profileName}</p>
            </div>
          </div>
        </div>
      </div>

      {/* <ToolbarStyle>
        <Box sx={{ flexGrow: 1 }} />
        <Stack
          direction="row"
          alignItems="center"
          spacing={{ xs: 0.5, sm: 1.5 }}
        >
          <Button variant="outlined" onClick={() => logOut()}>
            Logout
          </Button>
          <UserAccountComponent />
        </Stack>
      </ToolbarStyle> */}
    </RootStyle>
  );
}

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.paper, 0.72),
}));

/* const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
})); */
