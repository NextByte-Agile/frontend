export interface Vehiculo {
  id: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
  img: string;
}

const vehiculos: Vehiculo[] = [
  {
    id: 1,
    plate: "ABC-123",
    brand: "DFSK",
    model: "K07S",
    year: 2020,
    img: "/images/vehiculos/DFSK_K07S.jpg",
  },
  {
    id: 2,
    plate: "XYZ-456",
    brand: "Changan",
    model: "Grand Supervan",
    year: 2019,
    img: "/images/vehiculos/Changan_Grand_Supervan.jpg",
  },
  {
    id: 3,
    plate: "QWE-789",
    brand: "Nissan",
    model: "Elgrand",
    year: 2018,
    img: "/images/vehiculos/Nissan_Elgrand.jpg",
  },
];

export default vehiculos;
