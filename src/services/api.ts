import { Vehiculo } from '@/app/vehiculos/vehiculo';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://transporte-y6ct.onrender.com/',
});

export const getVehiculos = async () => {
  const response = await api.get('/vehiculos');
  return response.data;
};

export const addVehiculo = async (newVehiculo: Omit<Vehiculo, "idVehiculo">) => {
  const response = await api.post('/vehiculos', newVehiculo);
  return response.data;
};

export const updateVehiculo = async (updatedVehiculo: Vehiculo) => {
  const response = await api.put(`/vehiculos/${updatedVehiculo.idVehiculo}`, updatedVehiculo);
  return response.data;
};