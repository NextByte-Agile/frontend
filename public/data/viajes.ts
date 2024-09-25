export interface Viaje {
  rutaId: number;
  fecha: string;
  hora: string;
  precio: number;
  vehiculoId: number;
}

export const viajes: Viaje[] = [
  {
    rutaId: 1,
    fecha: "2024-10-01",
    hora: "08:00 AM",
    precio: 150.0,
    vehiculoId: 1,
  },
  {
    rutaId: 1,
    fecha: "2024-10-03",
    hora: "10:00 AM",
    precio: 140.0,
    vehiculoId: 2,
  },
  {
    rutaId: 2,
    fecha: "2024-10-05",
    hora: "09:00 AM",
    precio: 80.0,
    vehiculoId: 3,
  },
  {
    rutaId: 2,
    fecha: "2024-10-07",
    hora: "11:00 AM",
    precio: 85.0,
    vehiculoId: 1,
  },
];
