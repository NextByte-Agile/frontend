export interface Vehiculo {
  id: number;
  plate: string;
  brand: string;
  model: string;
  year: number;
  img: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

const vehiculos: Vehiculo[] = [
  {
    id: 1,
    plate: "ABC-123",
    brand: "DFSK",
    model: "K07S",
    year: 2020,
    img: "/images/vehiculos/DFSK_K07S.jpg",
    lastMaintenance: "2024-09-15",
    nextMaintenance: "2024-12-15",
  },
  {
    id: 2,
    plate: "XYZ-456",
    brand: "Changan",
    model: "Grand Supervan",
    year: 2019,
    img: "/images/vehiculos/Changan_Grand_Supervan.jpg",
    lastMaintenance: "2024-06-10",
    nextMaintenance: "2024-11-10",
  },
  {
    id: 3,
    plate: "QWE-789",
    brand: "Nissan",
    model: "Elgrand",
    year: 2018,
    img: "/images/vehiculos/Nissan_Elgrand.jpg",
    lastMaintenance: "2024-08-20",
    nextMaintenance: "2025-02-20",
  },
  {
    id: 4,
    plate: "ASD-159",
    brand: "JAC",
    model: "Refine",
    year: 2022,
    img: "/images/vehiculos/JAC_Refine.jpg",
    lastMaintenance: "2024-07-30",
    nextMaintenance: "2025-01-30",
  },
];

export default vehiculos;
