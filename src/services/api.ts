import { Usuario } from "@/app/clientes/cliente";
import { Vehiculo } from "@/app/vehiculos/vehiculo";
import axios from "axios";

const api = axios.create({
  baseURL: "https://transporte-y6ct.onrender.com/",
});

export const getVehiculos = async () => {
  const response = await api.get("/vehiculos");
  return response.data;
};

export const addVehiculo = async (
  newVehiculo: Omit<Vehiculo, "idVehiculo">
) => {
  const response = await api.post("/vehiculos", newVehiculo);
  return response.data;
};

export const updateVehiculo = async (updatedVehiculo: Vehiculo) => {
  const response = await api.put(
    `/vehiculos/${updatedVehiculo.idVehiculo}`,
    updatedVehiculo
  );
  return response.data;
};

export const deleteVehiculo = async (idVehiculo: number) => {
  const response = await api.delete(`/vehiculos/${idVehiculo}`);
  return response.data;
};

export const getClientes = async () => {
  const response = await api.get("/usuarios", {
    params: {
      tipoUsuario: "PASAJERO",
    },
  });
  return response.data;
};

export const addCliente = async (newCliente: Omit<Usuario, "idUsuario">) => {
  const response = await api.post("/usuarios", newCliente);
  return response.data;
};
