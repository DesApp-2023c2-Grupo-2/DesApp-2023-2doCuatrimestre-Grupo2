import axios from "axios";
import { token } from "./getToken";

export async function getPedidosPorDni(
  dni,
  tipo_pedido,
  fecha_inicio,
  fecha_fin,
  edificio,
  checked,
  page
) {
  var params = {};
  if (tipo_pedido && tipo_pedido !== "TODOS") {
    params.tipo_pedido = tipo_pedido;
  }
  if (edificio && edificio !== "TODOS") {
    params.edificio = edificio;
  }
  if (fecha_inicio && fecha_fin) {
    params.fecha_inicio = fecha_inicio;
    params.fecha_fin = fecha_fin;
  }
  params.dni = dni
  params.validsOnly = checked;
  params.page = page;
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/pedido/getAllByDni/`,
      params,
      {
        headers: {
          Authorization: `Bearer ${token()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}