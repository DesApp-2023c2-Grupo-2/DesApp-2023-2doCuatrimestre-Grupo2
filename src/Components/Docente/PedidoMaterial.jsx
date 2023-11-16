import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import {
  Button,
  IconButton,
  Autocomplete,
  TextField,
  Box,
  Grid,
  Typography,
  ThemeProvider,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import pipeta from "../Image/pipeta.png";
import { margin } from "@mui/system";
import CartelAlerta from "../Mensajes/CartelAlerta";
const PedidoMaterial = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mensajeAlerta, setMensajeAlerta] = useState("Faltan Cargar Datos");
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // *******************************
  const handleClose = () => {
    setAnchorEl(null);

    setMensajeAlerta("Faltan Cargar Datos");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setAnchorEl(props.anchorEleM);

    return () => {};
  }, [
    props.anchorEleM,
    // props.materialElegido
    props.pedidoMateriales,
  ]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{
        "--Grid-borderWidth": "1px",
        borderTop: "var(--Grid-borderWidth) solid",
        borderLeft: "var(--Grid-borderWidth) solid",
        borderRight: "var(--Grid-borderWidth) solid",
        borderBottom: "var(--Grid-borderWidth) solid",
        borderColor: "divider",
        paddingX: 2,
        borderRadius: 4,
        paddingY: 1,
        marginBottom: 3,
      }}
      spacing={{ xs: 1, md: 1 }}
      columns={{ xs: 12 }}
    >
      {/* TITULO */}
      <Grid
        container
        direction="row"
        justifyContent="start"
        alignItems="center"
      >
        <Grid item xs={1} container justifyContent="center">
          <img width={30} alt="" heigth={30} src={pipeta} />
        </Grid>
        <Grid item xs={3} container justifyContent="start">
          <Typography sx={{ fontSize: 30 }} color="text.secondary">
            Materiales
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 12 }}
      >
        <Grid item xs={1} container justifyContent="center">
          <Typography
            sx={{ fontSize: 14 }}
            aria-label="simple table"
            color="text.secondary"
          >
            Confirmar
          </Typography>
        </Grid>
      </Grid>
      {/* COMIENZA EL FORMULARIO DE MATERIALES */}

      <Grid
        container
        component="form"
        onSubmit={props.cargaMaterial}
        noValidate
        direction="row"
        justifyContent="start"
        alignItems="center"
        spacing={{ xs: 1, md: 1 }}
        columns={{ xs: 12 }}
      >
        <Grid item xs={5} container justifyContent="start">
          <Autocomplete
            disablePortal
            fullWidth
            id="combo-box-demo"
            options={props.listaMateriales}
            getOptionLabel={(option) => option.descripcion}
            onChange={(event, value) => props.set_IdMat(event, value)}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  margin="normal"
                  name="descripcion_material"
                  label={"descripción material"}
                  InputLabelProps={{
                    className: "autocompleteLabel",
                    shrink: true,
                  }}
                  InputProps={{
                    ...params.InputProps,
                  }}
                />
              );
            }}
          />
        </Grid>
        <Grid item xs={2} container justifyContent="center" />
        <Grid item xs={1} container justifyContent="center">
          <TextField
            sx={{ marginTop: 1 }}
            required
            id="cant_material"
            variant="outlined"
            name="cant_material"
            label="cant material"
            type="number"
            defaultValue={0}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              inputProps: {
                max: 100,
                min: 1,
              },
            }}
          />
        </Grid>
        <CartelAlerta
          mensajeAlerta={mensajeAlerta}
          handleClose={handleClose}
          id={id}
          open={Boolean(open)}
          anchorEl={anchorEl}
        />

        <Grid
          item
          xs={3}
          container
          justifyContent="center"
          display={props.materialOk}
        />

        <Grid
          item
          xs={3}
          container
          justifyContent="center"
          display={props.errorMaterial}
        >
          <Button variant="outlined" color="error" fullWidth heigth={40}>
            EL MATERIAL YA FUE CARGADO
          </Button>
        </Grid>
        <Grid item xs={1} container justifyContent="center">
          <Button fullWidth margin="normal" variant="text" type="submit">
            <Avatar>
              <AddCircleIcon bgcolor={"secondary"} color={"primary"} />
            </Avatar>
          </Button>
        </Grid>
      </Grid>

      {props.verMasMateriales.length > 0 ? (
        <Grid
          container
          alignItems="center"
          spacing={{ xs: 1, md: 1 }}
          columns={{ xs: 12 }}
        >
          <Grid item xs={12}>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  MÁS MATERIALES SOLICITADOS
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  presione la flecha hacia abajo para ver
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    spacing={{ xs: 2, md: 2 }}
                    columns={{ xs: 12 }}
                  >
                    <Grid item xs={8} container justifyContent="start">
                      Descripcion
                    </Grid>

                    <Grid item xs={2} container justifyContent="end">
                      Cantidad
                    </Grid>
                    <Grid item xs={1} container justifyContent="center"></Grid>
                    <Grid item xs={1} container justifyContent="center">
                      Desechar
                    </Grid>
                  </Grid>

                  {props.verMasMateriales.map((row, index) => (
                    <Grid
                      container
                      key={index}
                      direction="row"
                      alignItems="center"
                      spacing={{ xs: 2, md: 2 }}
                      columns={{ xs: 12 }}
                    >
                      <Grid item xs={8} container justifyContent="start">
                        {row.material.descripcion}
                      </Grid>

                      <Grid item xs={2} container justifyContent="end">
                        {row.cantidad}
                      </Grid>
                      <Grid
                        item
                        xs={1}
                        container
                        justifyContent="center"
                      ></Grid>
                      <Grid item xs={1} container justifyContent="center">
                        <Button
                          fullWidth
                          margin="normal"
                          variant="text"
                          onClick={() => props.eliminarMaterial(row.material)}
                        >
                          <Avatar>
                            <DeleteForeverIcon color={"rojo"} />
                          </Avatar>
                        </Button>
                      </Grid>
                    </Grid>
                  ))}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      ) : (
        <div></div>
      )}
    </Grid>
  );
};

export default PedidoMaterial;
