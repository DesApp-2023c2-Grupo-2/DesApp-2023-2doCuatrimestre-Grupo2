import React, { useState } from "react";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
import SendIcon from "@mui/icons-material/Send";
// import TableContainer from '@mui/material/TableContainer';

import Typography from "@mui/material/Typography";
// import Paper from '@mui/material/Paper';
// import moment from 'moment'
import Grid from "@mui/material/Grid";
// import laboratorio from '../Image/biologia.png';
import { Checkbox, FormControlLabel, TextField, ThemeProvider } from "@mui/material";
import Button from "@mui/material/Button";
import Theme1 from "../Theme/Theme1";

import { useEffect } from "react";
// import FormControl from '@mui/material/FormControl';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
import PopUp from "./PopUp";

import updateReactivo from "../../Services/updateReactivos";
import deleteReactivo from "../../Services/deleteReactivo";

function ModReactivo({
  setVerEdicion = { setVerEdicion },
  elegido = { elegido },
  setElegido = { setElegido },
}) {
  const [nuevaDescripcion, setNuevaDescripcion] = useState("");
  const [nuevoCAS, setNuevoCAS] = useState("");
  const [nuevoStock, setNuevoStock] = useState("");
  const [openMensaje, setOpenMensaje] = useState(false);
  const [mensajeSalida, setMensajeSalida] = useState("");
  const [titulo, setTitulo] = useState("");
  const [scroll, setScroll] = React.useState("paper");
  const [enough, setEnough] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);

  const modDescripcion = (event) => {
    if (event.target.value !== null) {
      setNuevaDescripcion(event.target.value);
    }
  };
  const modCAS = (event) => {
    if (event.target.value !== null) {
      setNuevoCAS(event.target.value);
    }
  };
  const modStock = (event) => {
    if (event.target.value !== null) {
      setNuevoStock(event.target.value);
    }
  };
  const modifReactivo = (event) => {
    event.preventDefault();
    const dato = {
      cas: nuevoCAS.toUpperCase(),
      descripcion: nuevaDescripcion,
      stock: !enough ? parseInt(nuevoStock) : -1,
    };

    updateReactivo(elegido._id, dato);
    setVerEdicion("none");

    setOpenMensaje(true);
    setMensajeSalida(dato);
    setTitulo("Reactivo modificado");
  };
  const eliminarReactivo = (event) => {
    event.preventDefault();
    const datosReactivo = {
      cas: elegido.cas,
      descripcion: elegido.descripcion,
      stock: elegido.stock,
    };
    deleteReactivo(elegido._id);
    setVerEdicion("none");

    setOpenMensaje(true);
    setMensajeSalida(datosReactivo);
    setTitulo("Reactivo eliminado");
  };
  useEffect(() => {
    elegido.stock == -1 && setEnough(true);
    setNuevaDescripcion(elegido.descripcion);
    setNuevoCAS(elegido.cas);
    !enough && setNuevoStock(elegido.stock);
  }, [elegido]);

  return (
    <>
      <Grid
        container
        direction="row"
        component="form"
        onSubmit={modifReactivo}
        sx={{ marginTop: 1 }}
        columns={{ xs: 12 }}
      >
        <Grid
          container
          noValidate
          direction="row"
          justifyContent="start"
          alignItems="start"
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 12 }}
        >
          <Grid item xs={4} container justifyContent="start">
            <Typography
              sx={{ fontSize: 30 }}
              color="text.primary"
              // color="text.secondary"
            >
              Edición activada
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          noValidate
          direction="row"
          justifyContent="start"
          alignItems="start"
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 12 }}
        >
          <Grid item xs={10} alignItems="center" justifyContent="start">
            <TextField
              sx={{ marginTop: 1, marginBottom: 1, marginLeft: 0 }}
              fullWidth
              id="descripcion"
              label="Descripcion"
              name="descripcion"
              value={nuevaDescripcion}
              InputLabelProps={{ shrink: true }}
              autoComplete="descripcion"
              autoFocus
              onChange={modDescripcion}
              inputProps={{ minLength: 5 }}
              //inputProps={{ minLength: 5, maxLength: 50 }}
              required
            />
          </Grid>

          <Grid
            container
            noValidate
            direction="row"
            justifyContent="start"
            alignItems="center"
            spacing={{ xs: 1, md: 1 }}
            columns={{ xs: 12 }}
          >
            <Grid
              item
              xs={8}
              container
              justifyContent="center"
              marginTop={1}
              marginLeft={1}
            >
              <TextField
                sx={{ marginTop: 1, marginBottom: 1, marginLeft: 0 }}
                fullWidth
                id="cas"
                label="CAS"
                name="cas"
                value={nuevoCAS}
                InputLabelProps={{ shrink: true }}
                // autoComplete="descripcion"
                autoFocus
                onChange={modCAS}
              />
            </Grid>

            <Grid item xs={3} container justifyContent="center">
              <TextField
                sx={{ marginTop: 1 }}
                disabled={enough}
                id="stock"
                variant="outlined"
                name="stock"
                label="stock"
                type="number"
                value={enough ? undefined : nuevoStock}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  inputProps: { min: 0 },
                }}
                onChange={modStock}
                required
              />
            </Grid>
            <FormControlLabel
              checked={enough}
              control={<Checkbox />}
              onChange={(e) => {
                setEnough(e.target.checked);
              }}
              label="Cantidad Suficiente"
            />
            <FormControlLabel
              checked={notAvailable}
              control={<Checkbox />}
              onChange={(e) => {
                setNotAvailable(e.target.checked);
              }}
              label="No disponible"
            />
          </Grid>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="end"
          columns={{ xs: 12 }}
        >
          <Grid
            item
            xs={2}
            height={30}
            bgcolor={"error"}
            borderRadius={2}
            sx={{ mt: 3, mb: 2, mr: 2 }}
          >
            <Button
              fullWidth
              margin="normal"
              variant="contained"
              color="error"
              startIcon={<DeleteForeverIcon />}
              style={{ borderRadius: 8 }}
              styled={{ textTransform: "none" }}
              sx={{ height: 50 }}
              onClick={eliminarReactivo}
            >
              {" "}
              ELIMINAR
            </Button>
          </Grid>
          <Grid
            item
            xs={2}
            height={30}
            bgcolor={"error"}
            borderRadius={2}
            sx={{ mt: 3, mb: 2 }}
          >
            <Button
              fullWidth
              margin="normal"
              variant="outlined"
              color="error"
              startIcon={<ReplyAllIcon />}
              onClick={() => {
                setVerEdicion("none");
              }}
              style={{ borderRadius: 8 }}
              styled={{ textTransform: "none" }}
              sx={{ height: 50 }}
            >
              {" "}
              CANCELAR
            </Button>
          </Grid>

          <Grid
            item
            xs={2}
            height={30}
            bgcolor={"primary.main"}
            borderRadius={2}
            sx={{ mt: 3, mb: 2, marginLeft: 2 }}
          >
            <Button
              fullWidth
              style={{ height: 50, borderRadius: 8 }}
              margin="normal"
              variant="contained"
              endIcon={<SendIcon />}
              color="primary"
              borderRadius={4}
              type="submit"
            >
              Modificar
            </Button>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Grid>

      {/* </DialogContent>
            </Dialog> */}

      <PopUp
        open={openMensaje}
        setOpen={setOpenMensaje}
        handleClose={() => setOpenMensaje(false)}
        scroll={scroll}
        titulo={titulo}
        children={<ReactivoModificado reactivo={mensajeSalida} />}
      ></PopUp>
    </>
  );
}

export default ModReactivo;

const ReactivoModificado = ({ reactivo }) => {
  return (
    <div>
      <p>
        <strong>Reactivo: </strong> {reactivo.descripcion}
      </p>
      <p>
        <strong>CAS: </strong> {reactivo.cas}
      </p>
      <p>
        <strong>Stock: </strong> {reactivo.stock == -1 ? 'Suficiente' : reactivo.stock}
      </p>
    </div>
  );
};
