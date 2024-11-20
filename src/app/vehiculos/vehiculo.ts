export interface Vehiculo {
  idVehiculo: number;
  marca: string;
  anio: number;
  placa: string;
  capacidadAsientos: number;
  foto: string | null;
  fechaMantenimiento: string;
  proximoMantenimiento: string;
}