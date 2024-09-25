// src/data/rutas.ts
export interface Ruta {
  id: number;
  partida: string;
  destino: string;
  fotos: string[];
  proximosViajes: { fecha: string; hora: string }[];
}

export const rutas: Ruta[] = [
  {
    id: 1,
    partida: "Lima",
    destino: "Cusco",
    fotos: ["/images/cusco1.jpg", "/images/cusco2.jpg"],
    proximosViajes: [
      { fecha: "2024-10-01", hora: "08:00 AM" },
      { fecha: "2024-10-03", hora: "10:00 AM" },
    ],
  },
  {
    id: 2,
    partida: "Arequipa",
    destino: "Puno",
    fotos: ["/images/puno1.jpg", "/images/puno2.jpg"],
    proximosViajes: [
      { fecha: "2024-10-05", hora: "09:00 AM" },
      { fecha: "2024-10-07", hora: "11:00 AM" },
    ],
  },
];
