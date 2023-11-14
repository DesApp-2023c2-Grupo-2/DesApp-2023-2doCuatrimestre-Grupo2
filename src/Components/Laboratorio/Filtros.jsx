import * as React from "react";
import FormControl from "@mui/material/FormControl";

import { Button, Grid, Box, Stack } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import enGB from "date-fns/locale/en-GB";
import ClearIcon from '@mui/icons-material/Clear';

export default function Filtros(props) {
  const fechaInicio = props.fecha_inicio;
  const fechaFin = props.fecha_fin;
  const guardar_inicio = (value) => {
    cambiarFechaInicio(value);
  };

  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  }
  const cambiarFechaInicio = (value) => {
    const fecha = formatDate(value["$d"]);
    props.set_fecha_inicio(fecha);
  };

  const cambiarFechaFin = (value) => {
    const fecha = formatDate(value["$d"]);
    fecha !== "NaN-NaN-NaN" && props.set_fecha_fin(fecha);
  };
  const edificio_elegido = (event) => {
    props.set_edificio(event.target.value);
  };

  React.useEffect(() => {
    return () => {};
  }, [props.fecha_inicio]);

  const [value, setValue] = React.useState(dayjs("2022-04-17"));

  return (
    <Box sx={{ flexGrow: 1, mb: 6 }}>
      <Box
        className="filtros-grupo"
        onClose={props.handleClose}
        scroll={props.scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        maxWidth="xl"
        fullWidth
      >
        <Box dividers={props.scroll === "paper"}>
          <Grid
            container
            component="form"
            onSubmit={props.cargaEncabezado}
            noValidate
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            spacing={{ xs: 1, md: 1 }}
          >
            <Box sx={{ display: "flex", pt: 1 }}>
              <Box sx={{ pr: 2 }}>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="edificio" sx={{ fontSize: 14 }}>
                    Edificio
                  </InputLabel>
                  <Select
                    labelId="edificio"
                    id="edificio"
                    value={props.edificio}
                    label="edificio"
                    onChange={edificio_elegido}
                  >
                    <MenuItem sx={{ fontSize: 14 }} value={"TODOS"}>
                      Todos
                    </MenuItem>
                    <MenuItem sx={{ fontSize: 14 }} value={"Malvinas"}>
                      Malvinas
                    </MenuItem>
                    <MenuItem sx={{ fontSize: 14 }} value={"Origone-A"}>
                      Origone - A
                    </MenuItem>
                    <MenuItem sx={{ fontSize: 14 }} value={"Origone-B"}>
                      Origone - B
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel id="estado" sx={{ fontSize: 14 }}>
                    Estado
                  </InputLabel>
                  <Select
                    InputLabelProps={{
                      shrink: true,
                    }}
                    labelId="estado"
                    id="estado"
                    value={props.tipo_pedido}
                    label="estado"
                    onChange={props.cargarEstado}
                  >
                    <MenuItem sx={{ fontSize: 14 }} value={"TODOS"}>
                      {" "}
                      Todos{" "}
                    </MenuItem>
                    <MenuItem sx={{ fontSize: 14 }} value={"ACEPTADO"}>
                      {" "}
                      Aceptado{" "}
                    </MenuItem>
                    <MenuItem sx={{ fontSize: 14 }} value={"PENDIENTE"}>
                      Pendiente
                    </MenuItem>
                    <MenuItem sx={{ fontSize: 14 }} value={"RECHAZADO"}>
                      Rechazado
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Stack
                item
                xs={2}
                sx={{
                  ml: 2,
                  border: 1,
                  borderColor: "gray",
                  borderRadius: 1,
                }}
              >
                <Button
                  sx={{
                    border: "none",
                    width: "100%",
                    height: "100%",
                  }}
                  // variant="outlined"
                  size='large'
                  color="error"
                  startIcon={
                    <ClearIcon
                      sx={{                                                
                        color: "red",
                        justifyContent: "center",
                        alingItem: "center",
                        width: "100%",
                        pl: 1,
                      }}
                    />
                  }
                  onClick={() => {
                    props.set_edificio("");
                    props.setTipoPedido("");
                  }}
                ></Button>
              </Stack>
            </Box>
            <Box sx={{ display: "flex" }}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={enGB}
              >
                <DemoContainer components={["DatePicker", "DatePicker"]}>
                  <DatePicker
                    label="Desde"
                    defaultValue={dayjs(fechaInicio)}
                    format="DD/MM/YYYY"
                    value={value}
                    onChange={(value) => guardar_inicio(value)}
                  />
                  <DatePicker
                    label="Hasta"
                    format="DD/MM/YYYY"
                    value={dayjs(fechaFin)}
                    onChange={(value) => cambiarFechaFin(value)}
                  />
                </DemoContainer>
              </LocalizationProvider>
              <Stack
                item
                xs={2}
                sx={{
                  mt: 0.9,
                  ml: 2,
                  border: 1,
                  borderColor: "gray",
                  borderRadius: 1,
                }}
              >
                <Button
                  sx={{
                    color: "red",
                    border: "none",
                    width: "100%",
                    height: "100%",
                  }}
                  size={'large'}
                  color="error"
                  startIcon={
                    <EventRepeatIcon
                      sx={{                        
                        color: "red",
                        justifyContent: "center",
                        alingItem: "center",
                        width: "100%",
                        pl: 1,
                      }}
                    />
                  }
                  onClick={() => {
                    props.set_fecha_inicio("");
                    props.set_fecha_fin("");
                  }}
                ></Button>
              </Stack>
            </Box>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
