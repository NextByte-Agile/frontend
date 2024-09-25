export interface Vehiculo {
  id: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
}

const vehiculos: Vehiculo[] = [
  { id: 1, plate: "ABC-123", brand: "DFSK", model: "K07S", year: 2020 },
  {
    id: 2,
    plate: "XYZ-456",
    brand: "Changan",
    model: "Grand Supervan",
    year: 2019,
  },
  { id: 3, plate: "QWE-789", brand: "Nissan", model: "Elgrand", year: 2018 },
];

export default vehiculos;
