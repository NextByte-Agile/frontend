// src/data/rutas.ts
export interface Ruta {
  id: number;
  partida: string;
  destino: string;
  fotos: string[];
}

export const rutas: Ruta[] = [
  {
    id: 1,
    partida: "Lima",
    destino: "Cusco",
    fotos: [
      "/images/rutas/Lima-Cusco_1.jpg",
      "/images/rutas/Lima-Cusco_2.jpg",
      "/images/rutas/Lima-Cusco_3.jpg",
      "/images/rutas/Lima-Cusco_4.jpg",
    ],
  },
  {
    id: 2,
    partida: "Lima",
    destino: "Trujillo",
    fotos: [
      "/images/rutas/Lima-La_Libertad_1.jpg",
      "/images/rutas/Lima-La_Libertad_2.jpg",
      "/images/rutas/Lima-La_Libertad_3.jpg",
      "/images/rutas/Lima-La_Libertad_4.jpg",
    ],
  },
  {
    id: 3,
    partida: "Ica",
    destino: "Tacna",
    fotos: [
      "/images/rutas/Ica-Tacna_1.jpg",
      "/images/rutas/Ica-Tacna_2.jpg",
      "/images/rutas/Ica-Tacna_3.jpg",
      "/images/rutas/Ica-Tacna_4.jpg",
    ],
  },
];
