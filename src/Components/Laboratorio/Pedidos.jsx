import { Card, CardActionArea, makeStyles } from "@material-ui/core";
import PedidoV1 from "../Docente/PedidoV1";
import { getListaPedidos } from "../../Services/getPedidosService";
import React, { useContext, useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Header from "../Header/Header";
import Grid from "@mui/material/Grid";
import NoEncontrados from "../Mensajes/NoEncontrados";
import Filtros from "./Filtros";
import { axiosGetPedido } from "../../Services/getPedidosService";
import FilterListIcon from "@mui/icons-material/FilterList";
import { userContext } from "../../Context/LabProvider";
import { correctionDate, dateFormat } from "./utils/formatDate";

const useStyles = makeStyles(() => ({
  marginTop: {
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
}));

function Pedidos() {
  // const { marginTop } = useStyles();
  const [listaPedidos, setListaPedidos] = useState([]);
  const [texto, setEncabezado] = useState("Laboratorio");
  const [esAdmin, setEsAdmin] = useState("");
  const { update,  user } = useContext(userContext);
  const [edicionActiva, setEdicionActiva] = useState(false);

  /********************************************** */
  const now = correctionDate(new Date())
  const [tipo_pedido, setTipoPedido] = React.useState("TODOS");
  const [fecha_utilizacion, set_fecha_utilizacion] = React.useState("");
  const [fecha_inicio, set_fecha_inicio] = React.useState("");
  const [fecha_fin, set_fecha_fin] = React.useState(now);
  const [edificio, set_edificio] = React.useState("TODOS");
  const [checked, setChecked] = React.useState("TODOS");

  // *******************************
  const [open, setOpen] = React.useState("");
  const [scroll, setScroll] = React.useState("paper");
  const [alert, setAlert] = useState(false)
 

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const cargarEstado = (event) => {
    event.preventDefault();
    console.log(event.target.value);

    guardarEstadoPedido(event.target.value);
  };
  const guardarEstadoPedido = (event) => {
    setTipoPedido(event);
  };

 function cargarNuevosPedidos() {
    // if(tipo_pedido==="TODOS"){ guardarEstadoPedido("")}
    // if(edificio==="TODOS"){set_edificio("")}
    console.log(dateFormat(fecha_fin))
    if (new Date(fecha_inicio) > new Date(dateFormat(fecha_fin))){
      return setAlert(true)
    }
    setAlert(false)
    axiosGetPedido(
      tipo_pedido,
      fecha_inicio,
      fecha_fin,
      edificio,
      checked
    ).then((item) => {
      setListaPedidos(item.data);
    });
  }
  const count = useMemo(()=>{
    return listaPedidos.length
  }, [listaPedidos])
  useEffect(() => {
    cargarNuevosPedidos();
  }, [count, tipo_pedido, fecha_fin, fecha_inicio, edificio, checked]);
  
  useEffect(() => {
    setEsAdmin(user.rol);
  }, [open, update]);
  
  return (
    <Box>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Header texto={texto} isUserAdmin={esAdmin}></Header>
      </Box>

      <Box sx={{ flexGrow: 1, m: 0 }}>
        <Grid
          container
          columns={12}
          justifyContent="flex-end"
          direction="row"
          alignItems="flex-start"
        >
          <Grid item xs={1} align="center">
            <Card

            // style={{ color: "#b4e0bc", borderRadius: 15 }}
            >
              {/* <CardActionArea onClick={handleClickOpen('body')}>
                <FilterListIcon fontSize="large" style={{ color: "#b4e0bc" }} />
              </CardActionArea> */}
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Filtros
        cargarEstado={cargarEstado}
        setTipoPedido={setTipoPedido}
        checked={checked}
        setChecked={setChecked}
        fecha_fin={fecha_fin}
        set_fecha_fin={set_fecha_fin}
        set_fecha_inicio={set_fecha_inicio}
        fecha_inicio={fecha_inicio}
        edificio={edificio}
        set_edificio={set_edificio}
        tipo_pedido={tipo_pedido}
        open={Boolean(open)}
        setOpen={setOpen}
        handleClose={handleClose}
        scroll={scroll}
        alert={alert}
        setAlert={setAlert}
      />

      {listaPedidos && listaPedidos.length < 1 ? (
        <Box sx={{ flexGrow: 1, md: 2 }}>
          <NoEncontrados />
        </Box>
      ) : (
        <Box className="main-wrap" sx={{ flexGrow: 1, md: 2 }}>
          <Grid
            container
            direction="row"
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 0,
              m: 0,
            }}
            alignItems="space-between"
            spacing={{ xs: 2, md: 3 }}
            columns={{ sm: 6, lg: 12 }}
          >
            {listaPedidos?.map((pedido) => (
              <Grid item xs={3} key={pedido._id}>
                <PedidoV1
                  key={pedido._id}
                  pedido={pedido}
                  esAdmin={"lab"}
                  edicionActiva={edicionActiva}
                  setEdicionActiva={setEdicionActiva}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default Pedidos;


