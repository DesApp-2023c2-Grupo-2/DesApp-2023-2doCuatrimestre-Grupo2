import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Theme1 from "../Theme/Theme1";
import logo from "../Image/logo uni-01.png";
import { useNavigate } from "react-router-dom";
import LaboratorioNav from "./LaboratorioNav";
import { Button } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getFullname } from '../../Services/getFullname'

Header.defaultProps = {
  isNotLogin: true,
  isUserAdmin: false,
};
export default function Header(props) {
  let userActual;
  React.useEffect(async () => {
    try {
      userActual = await getFullname();
    } catch (e) {
      console.log(e)
    }
  }, [])
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          style={{ backgroundColor: "#1D2F58" }}
          position="static"
          maxwidth="lg"
        >
          <Toolbar>
            <img
              className="logo"
              width={450}
              heigth={90}
              src={logo}
              alt="logo"
            />
            {props.isNotLogin && userActual && (
              <div>
                <Button onClick={handleMenu} className={`user_name ${Boolean(anchorEl) ? 'flipped' : ''}`}  >
                  {userActual.nombre} {userActual.apellido}
                </Button>
                  
                <Menu
                  id="menu-appbar"
                  sx={{ml:1.2, mt:1}}
                  size="small"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}> Cerrar sesión </MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
          {props.isUserAdmin && <LaboratorioNav />}
        </AppBar>
      </Box>
    </>
  );
}
