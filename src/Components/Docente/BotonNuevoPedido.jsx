import React from "react";
import { Button } from "@mui/material";

import Theme1 from "../Theme/Theme1";
import { ThemeProvider } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";

const BotonNPedido = ({ setNuevoPedido }) => {
  const navigate = useNavigate();
  return (
    <>
      <Fab
        color="primary"
        aria-label="add"
        className="boton-nuevo"
        onClick={() => {
          navigate("/Docente/NuevoPedido");
          setNuevoPedido(true);
        }}
      >
        <AddIcon className="boton-add" />
      </Fab>
    </>
  );
};

export default BotonNPedido;
