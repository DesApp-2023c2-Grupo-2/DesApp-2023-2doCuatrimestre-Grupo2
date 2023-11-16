import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Grid, Box } from "@mui/material";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Header from "../Header/Header";
import Theme1 from "../Theme/Theme1";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { postPedido } from "../../Services/postPedidoService";
import {
  getListaMateriales,
  getListaEquipos,
  getListaReactivos,
} from "../../Services/getService";
import { getCantidadPedidos } from "../../Services/getPedidosService";
import SendIcon from "@mui/icons-material/Send";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import PedidoEquipos from "./PedidoEquipos";
import PedidoCabecera from "./PedidoCabecera";
import PedidoMaterial from "./PedidoMaterial";
import PedidoReactivo from "./PedidoReactivo";
import CartelOk from "../Mensajes/CartelOk";

export default function NuevoPedido() {
  //PRUEBA CODIGO

  const userActual = JSON.parse(localStorage.getItem("usuario"));
  const [pedidoEquipos, setPedidoEquipos] = useState([]);
  const [listaEquipos, setListaEquipos] = useState([]);
  const [equipoElegido, setEquipoElegido] = useState("");
  const [verMasEquip, setverMasEquip] = useState([]);
  const [errorEquipo, setErrorEquipo] = useState("none");
  const [equipoOk, setEquipoOk] = useState("block");

  const [anchorEle, setAnchorEle] = React.useState(null);

  const [cantidadPedidos, setCantPedido] = useState([]);
  const [pedidoEncabezado, setEncabezadoPedido] = useState({});
  const [confirmacionCabecera, setConfirCabecera] = useState("none");
  const [anchorEl, setAnchorEl] = React.useState(null);

  var manana = new Date();
  manana = manana.setTime(manana.getTime() + 2 * 24 * 60 * 60 * 1000);
  const verManiana = moment(manana).format("DD-MM-YYYY").toString();
  const formatManiana = moment(manana).format("YYYY-MM-DD").toString();
  var topeFecha = new Date();
  const nTope = topeFecha.setTime(
    topeFecha.getTime() + 60 * 24 * 60 * 60 * 1000
  );
  const verTope = moment(nTope).format("DD-MM-YYYY").toString();
  const [mensajeAlerta, setMensajeAlerta] = useState(
    "Fecha invalida , debe estar entre " + verManiana + " y " + verTope
  );

  const [pedidoMateriales, setPedidoMateriales] = useState([]);
  const [listaMateriales, setListaMateriales] = useState([]);
  const [materialElegido, setMatElegido] = useState("");
  const [verMasMateriales, setverMasMateriales] = useState([]);
  const [errorMaterial, setErrorMaterial] = useState("none");
  const [materialOk, setMaterialOk] = useState("block");
  const [anchorEleM, setAnchorEleM] = React.useState(null);

  const [pedidoReactivos, setPedidoReactivos] = useState([]);
  const [listaReactivos, setListaReactivos] = useState([]);
  const [reactivoElegido, setReacElegido] = useState({});
  const [verMasReactivos, setverMasReactivos] = useState([]);
  const [errorReactivo, setErrorReactivo] = useState("none");
  const [reactivoOk, setReactivoOk] = useState("block");
  const [anchorEleR, setAnchorEleR] = React.useState(null);

  const [_med_reactivo, setUn_med_reactivo] = useState("");
  const [cal_reactivo, setCalReactivo] = useState("");
  const [_tip_reactivo, setTipReactivo] = useState(""); //tipo_concentracion
  const [_disol_reactivo, setDisolReactivo] = useState("");
  const [ver_disolvente, set_ver_disolvente] = useState("none");
  const [ver_otro_disolvente, set_otro_disolvente] = useState("none");
  const [visible_off, set_visible_off] = useState("block");
  const [visible_off_otro, set_visible_off_otro] = useState("block");

  const [ver_med, set_ver_med] = useState("none");
  const [visible_off_med, set_visible_off_med] = useState("block");

  const navigate = useNavigate();

  //CARGA ENCABEZADO AL PEDIDO
  const cargaEncabezado = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fecha = new Date();
    const fecha_utilizacion = new Date(
      `${data.get("fecha_utilizacion")}T${data.get("hora")}:00.000Z`
    );
    const nro_pedido = cantidadPedidos + 1;

    if (
      fecha_utilizacion !== "" &&
      data.get("cantidad_alumnos").length > 0 &&
      data.get("cantidad_grupos").length > 0
    ) {
      setConfirCabecera("block");
      setEncabezadoPedido({
        descripcion: nro_pedido.toString(),
        fecha_solicitud: fecha,
        fecha_utilizacion: fecha_utilizacion,
        numero_laboratorio: parseInt(0, 10),
        tipo_pedido: "PENDIENTE",
        alumnos: data.get("cantidad_alumnos"),
        cantidad_grupos: data.get("cantidad_grupos"),
        edificio: "Sin asignar",
        materia: data.get("materia"),
        numero_tp: nro_pedido,
      });
    } else {
      setAnchorEl(event.currentTarget);
      setMensajeAlerta("Faltan cargar datos");
    }
  };

  //CARGA EQUIPO A LA LISTA
  const cargaEquipo = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (
      equipoElegido === "" ||
      data.get("cant_equipo").length === 0 ||
      parseInt(data.get("cant_equipo")) === 0
    ) {
      setAnchorEle(event.currentTarget);
    } else {
      const dato = {
        cantidad: parseInt(data.get("cant_equipo"), 10),
        equipo: equipoElegido._id,
      };
      const equipoRepetido = pedidoEquipos.filter(
        (elemento) => elemento.equipo === dato.equipo
      );
      if (equipoRepetido.length > 0) {
        setErrorEquipo("block");
        setEquipoOk("none");
      } else {
        const datoVer = {
          cantidad: parseInt(data.get("cant_equipo"), 10),
          equipo: equipoElegido,
        };
        setErrorEquipo("none");
        setEquipoOk("block");
        setPedidoEquipos([...pedidoEquipos, dato]);
        setverMasEquip([...verMasEquip, datoVer]);
        setEquipoElegido("");
      }
    }
  };
  const eliminarEquipo = (event) => {
    const cargar_Nuevos_EquiposVer = verMasEquip.filter((eq) => eq.equipo._id !== event._id);
    setverMasEquip(cargar_Nuevos_EquiposVer);
    const cargar_Nuevos_Equipos = pedidoEquipos.filter((eq) => eq.equipo !== event._id);
    setPedidoEquipos(cargar_Nuevos_Equipos);
  };

  const set_IdEquip = (event, value) => {
    value ? setEquipoElegido(value) : setAnchorEle(event.currentTarget);
  };

  // CARGA MATERIAL A LA LISTA
  const cargaMaterial = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    if (
      materialElegido === "" ||
      data.get("cant_material").length === 0 ||
      parseInt(data.get("cant_material")) === 0
    ) {
      setAnchorEleM(event.currentTarget);
    } else {
      const dato = {
        cantidad: parseInt(data.get("cant_material"), 10),
        material: materialElegido._id,
      };
      const materialRepetido = pedidoMateriales.filter(
        (elemento) => elemento.material === dato.material
      );
      if (materialRepetido.length > 0) {
        setErrorMaterial("block");
        setMaterialOk("none");
      } else {
        const datoVer = {
          cantidad: parseInt(data.get("cant_material"), 10),
          material: materialElegido,
        };
        setErrorMaterial("none");
        setMaterialOk("block");
        setPedidoMateriales([...pedidoMateriales, dato]);
        setverMasMateriales([...verMasMateriales, datoVer]);
        setMatElegido("");
        setAnchorEleM(null);
      }
    }
  };

  // ELIMINAR MATERIAL DE LA LISTA

  const eliminarMaterial = (event) => {
    const pedido_MaterialesVer = verMasMateriales.filter((mate) => mate.material._id !== event._id);
    setverMasMateriales(pedido_MaterialesVer);

    const pedido_Materiales = pedidoMateriales.filter((mate) => mate.material !== event._id);
    setPedidoMateriales(pedido_Materiales);
  };

  const set_IdMat = (event, value) => {
    value ? setMatElegido(value) : setAnchorEleM(event.currentTarget);
  };

  // CARGA REACTIVOS A LA LISTA

  const disolReactivo = (event) => {
    const disolvente = event.target.value;
    if (disolvente === "otro") {
      set_otro_disolvente("block");
      set_visible_off_otro("none");
    } else {
      set_otro_disolvente("none");
      set_visible_off_otro("block");
    }

    setDisolReactivo(disolvente);
  };

  const tipReactivo = (event) => {
    const tipo_reactivo = event.target.value;
    if (tipo_reactivo === "puro") {
      set_ver_disolvente("none");
      set_otro_disolvente("none");
      set_visible_off("block");
      set_visible_off_med("block");
      set_ver_med("none");
      set_visible_off_otro("block");
    } else {
      set_ver_disolvente("block");
      set_visible_off("none");
      set_visible_off_med("none");
      set_ver_med("block");
      set_visible_off_otro("block");
    }

    setTipReactivo(tipo_reactivo);
  };
  /* borrar datos*/
  const inicializarReact = () => {
    setCalReactivo("");
    setUn_med_reactivo("");
    setTipReactivo("");
    setDisolReactivo("");
    setOtroDisolDesc("");
    set_cant_react(0);
    set_med_concentracion("");
    set_ver_disolvente("none");
    set_otro_disolvente("none");
    set_visible_off("block");
    set_visible_off_med("block");
    set_ver_med("none");
    set_visible_off_otro("block");
  };
  const [med_concentracion, set_med_concentracion] = useState("");
  const setMedidaConcentracion = (event) => {
    set_med_concentracion(event.target.value);
  };

  const [can_react, set_cant_react] = React.useState(0);
  const cargaCantReac = (event) => {
    set_cant_react(event.target.value);
  };

  const [otroDisolDesc, setOtroDisolDesc] = React.useState("");
  const cargaOtroDisol = (event) => {
    setOtroDisolDesc(event.target.value);
  };
  const calReactivo = (event) => {
    setCalReactivo(event.target.value);
  };

  const med_reactivo = (event) => {
    setUn_med_reactivo(event.target.value);
  };
  const cargaReactivos = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (reactivoElegido === null) {
      setAnchorEleR(event.currentTarget);
    } else {
      var dato = {
        cantidad: can_react,
        un_medida: _med_reactivo,
        calidad: cal_reactivo,
        concentracion_tipo: _tip_reactivo,
        disolvente: _disol_reactivo,
        otro_disolvente_descripcion: otroDisolDesc,
        reactivo: reactivoElegido._id,
      };
      if (med_concentracion.length > 0) {
        dato.concentracion_medida = med_concentracion;
      }

      const reactivoRepetido = pedidoReactivos.filter(
        (elemento) =>
          elemento.reactivo === dato.reactivo &&
          elemento.concentracion_tipo === dato.concentracion_tipo &&
          elemento.concentracion_medida === dato.concentracion_medida &&
          elemento.disolvente === dato.disolvente &&
          elemento.otro_disolvente_descripcion ===
            dato.otro_disolvente_descripcion
      );
      if (reactivoRepetido.length > 0) {
        setErrorReactivo("block");
        setReactivoOk("none");
      } else {
        setErrorReactivo("none");
        setReactivoOk("block");
        const cargarNuevosReactivos = (dato) => {
          setPedidoReactivos([...pedidoReactivos, dato]);
        };
        const datoVer = {
          cantidad: can_react,
          un_medida: _med_reactivo,
          calidad: cal_reactivo,
          concentracion_tipo: _tip_reactivo,
          concentracion_medida: med_concentracion,
          disolvente: _disol_reactivo,
          otro_disolvente_descripcion: otroDisolDesc,
          reactivo: reactivoElegido,
        };
        const cargarNuevosReactivosVer = (dato) => {
          setverMasReactivos([...verMasReactivos, dato]);
        };
        cargarNuevosReactivosVer(datoVer);
        cargarNuevosReactivos(dato);
        inicializarReact();
      }
    }
  };

  const eliminarReactivo = (value) => {
    const cargar_reactivos_ver = verMasReactivos.filter((reactivo) => reactivo.reactivo._id !== value._id);
    setverMasReactivos(cargar_reactivos_ver);
    const cargar_reactivos = pedidoReactivos.filter((reactivo) => reactivo.reactivo !== value._id);
    setPedidoReactivos(cargar_reactivos);
  };

  const set_IdReactivo = (event, value) => {
    console.log(value);
    if (value !== null) {
      setReacElegido(value);
    } else {
      console.log(event.currentTarget);
      setAnchorEleR(event.currentTarget);
    }
  };

  const [anchorE2, setAnchorE2] = React.useState(null);
  const [pedidoIncompleto, setPedidoIncompleto] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();    
    if (
      Object.keys(pedidoEncabezado).length != 0 &&
      !Object.keys(pedidoEncabezado).find(e=> pedidoEncabezado[e] == "") &&
      (pedidoMateriales.length > 0 ||
        pedidoEquipos.length > 0 ||
        pedidoReactivos.length > 0)
    ) {      
      const pedido = {
        docente: {
          nombre: userActual.nombre,
          apellido: userActual.apellido,
          dni: userActual.dni,
          matricula: userActual.matricula,
        },
        descripcion: pedidoEncabezado.descripcion,
        fecha_solicitud: pedidoEncabezado.fecha_solicitud,
        fecha_utilizacion: pedidoEncabezado.fecha_utilizacion,
        numero_laboratorio: pedidoEncabezado.numero_laboratorio,
        tipo_pedido: pedidoEncabezado.tipo_pedido,
        cantidad_grupos: pedidoEncabezado.cantidad_grupos,
        alumnos: pedidoEncabezado.alumnos,
        edificio: pedidoEncabezado.edificio,
        materia: pedidoEncabezado.materia,
        numero_tp: pedidoEncabezado.numero_tp,
        lista_equipos: pedidoEquipos,
        lista_reactivos: pedidoReactivos,
        lista_materiales: pedidoMateriales,
      };
      postPedido(pedido);
      setConfirCabecera("none");
      setPedidoIncompleto(false);
      setAnchorE2(event.currentTarget);
    } else {
      setPedidoIncompleto(true)
    };
    setAnchorE2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
    navigate("/Docente/Pedidos");
  };

  const open2 = Boolean(anchorE2);
  const id2 = open2 ? "simple-popover" : undefined;

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      const equipos = await getListaEquipos();
      const materiales = await getListaMateriales();
      const reactivos = await getListaReactivos();
      const cantidadPedidos = await getCantidadPedidos();

      if (mounted) {
        setListaEquipos(equipos);
        setListaMateriales(materiales);
        setListaReactivos(reactivos);
        setCantPedido(cantidadPedidos);
      }
    };
    fetchData();
    return () => (mounted = false);
  }, []);

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <Header></Header>
      </Box>
      {/* COMIENZA EL CONTENEDOR DE LA PAGINA    */}
      <Container component="main" color="primary">
        {/* COMIENZA EL CONTENEDOR DEL BLOQUE SUPERIOR    */}

        <Box>
          <Box sx={{ flexGrow: 1, md: 2 }}>
            <PedidoCabecera
              cargaEncabezado={cargaEncabezado}
              cantidadPedidos={cantidadPedidos}
              confirmacionCabecera={confirmacionCabecera}
              setConfirCabecera={setConfirCabecera}
              setAnchorEl={setAnchorEl}
              anchorEl={anchorEl}
              mensajeAlerta={mensajeAlerta}
              setMensajeAlerta={setMensajeAlerta}
              formatManiana={formatManiana}
            />

            {/* COMIENZA CONTENEDOR DE EQUIPOS */}

            <PedidoEquipos
              cargaEquipo={cargaEquipo}
              listaEquipos={listaEquipos}
              set_IdEquip={set_IdEquip}
              pedidoEquipos={pedidoEquipos}
              equipoElegido={equipoElegido}
              verMasEquip={verMasEquip}
              eliminarEquipo={eliminarEquipo}
              errorEquipo={errorEquipo}
              equipoOk={equipoOk}
              setAnchorEle={setAnchorEle}
              anchorEle={anchorEle}
            />

            {/* COMIENZA CONTENEDOR DE MATERIALES */}

            <PedidoMaterial
              cargaMaterial={cargaMaterial}
              listaMateriales={listaMateriales}
              set_IdMat={set_IdMat}
              pedidoMateriales={pedidoMateriales}
              materialElegido={materialElegido}
              verMasMateriales={verMasMateriales}
              eliminarMaterial={eliminarMaterial}
              errorMaterial={errorMaterial}
              materialOk={materialOk}
              setAnchorEleM={setAnchorEleM}
              anchorEleM={anchorEleM}
            />

            <PedidoReactivo
              cargaReactivos={cargaReactivos}
              listaReactivos={listaReactivos}
              set_IdReactivo={set_IdReactivo}
              reactivoElegido={reactivoElegido}
              cal_reactivo={cal_reactivo}
              calReactivo={calReactivo}
              _tip_reactivo={_tip_reactivo}
              tipReactivo={tipReactivo}
              _disol_reactivo={_disol_reactivo}
              disolReactivo={disolReactivo}
              _med_reactivo={_med_reactivo}
              med_reactivo={med_reactivo}
              verMasReactivos={verMasReactivos}
              eliminarReactivo={eliminarReactivo}
              ver_disolvente={ver_disolvente}
              ver_otro_disolvente={ver_otro_disolvente}
              visible_off={visible_off}
              visible_off_otro={visible_off_otro}
              ver_med={ver_med}
              visible_off_med={visible_off_med}
              errorReactivo={errorReactivo}
              reactivoOk={reactivoOk}
              setAnchorEleR={setAnchorEleR}
              anchorEleR={anchorEleR}
              cargaOtroDisol={cargaOtroDisol}
              otroDisolDesc={otroDisolDesc}
              cargaCantReac={cargaCantReac}
              can_react={can_react}
              med_concentracion={med_concentracion}
              setMedidaConcentracion={setMedidaConcentracion}
            />
          </Box>

          {/* EMPIEZAN BOTONES */}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container justifyContent="flex-end" spacing={2}>
              <CartelOk
                handleClose2={handleClose2}
                id2={id2}
                open2={open2}
                anchorE2={anchorE2}
                setAnchorE2={setAnchorE2}
                pedidoIncompleto={pedidoIncompleto}
              />

              <Grid item xs={2}>
                <Button
                  fullWidth
                  color="error"
                  // style={{ borderRadius: 8 }}
                  margin="normal"
                  variant="contained"
                  startIcon={<ReplyAllIcon />}
                  onClick={() => {
                    navigate("/Docente/Pedidos");
                  }}
                  sx={{
                    borderRadius: 2,
                    height: 50,
                    border: 1,
                    boxShadow: 3,
                    mb: 2,
                  }}
                >
                  {" "}
                  CANCELAR
                </Button>
              </Grid>
              <Grid item xs={2} display={"none"}>
                <input type="hidden" name="color" value={"verde"} />
              </Grid>

              <Grid item xs={2}>
                <Button
                  fullWidth
                  margin="normal"
                  variant="contained"
                  endIcon={<SendIcon />}
                  type="onSubmit"
                  sx={{
                    borderRadius: 2,
                    height: 50,
                    border: 1,
                    boxShadow: 3,
                    mb: 2,
                  }}
                >
                  {" "}
                  CONFIRMAR PEDIDO
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
