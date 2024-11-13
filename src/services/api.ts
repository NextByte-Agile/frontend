import { Vehiculo } from '@/app/vehiculos/vehiculo';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/',
});

export const getVehiculos = async () => {
  const response = await api.get('/vehiculos');
  return response.data;
};

export const addVehiculo = async (newVehiculo: Omit<Vehiculo, "idVehiculo">) => {
  const response = await api.post('/vehiculos', newVehiculo);
  return response.data;
};