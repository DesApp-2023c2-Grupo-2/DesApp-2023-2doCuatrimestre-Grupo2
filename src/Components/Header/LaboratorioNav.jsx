import * as React from 'react';
import Box from '@mui/material/Box';

import {ThemeProvider } from '@mui/material/styles';
import Theme1 from '../Theme/Theme1';

import {useNavigate} from 'react-router-dom';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
const LaboratorioNav = () => {
  const navigate=useNavigate();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  React.useEffect(() => {
    const currentLocation = window.location.pathname;
    const locationToTabIndex = {
      '/Laboratorio/Pedidos': 0,
      '/Laboratorio/Equipos': 1, /*
      '/laboratorio/materiales': 2,
      '/laboratorio/reactivos': 3,
      '/laboratorio/usuarios': 4,*/
    };

    setValue(locationToTabIndex[currentLocation] || 0);
  }, []);
  return (
    <Box sx={{ mt: -1, ml:4, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Pedidos" onClick={() => navigate("/Laboratorio/Pedidos")} />
          <Tab label="Equipos" onClick={() => navigate("/Laboratorio/Equipos")} />
          <Tab label="Materiales" />
          <Tab label="Reactivos" />
          <Tab label="Usuarios" />
      </Tabs>
    </Box>
  )
}
export default LaboratorioNav;
  