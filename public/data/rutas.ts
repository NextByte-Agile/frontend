export interface Ruta {
  id: number;
  partida: string;
  destino: string;
  fotos: string[];
}

export const rutas: Ruta[] = [
  {
    id: 1,
    partida: "Tacna",
    destino: "Tarata",
    fotos: [
      "/images/rutas/Tacna-Tarata_1.jpg",
      "/images/rutas/Tacna-Tarata_2.jpg",
      "/images/rutas/Tacna-Tarata_3.jpg",
    ],
  },
  {
    id: 2,
    partida: "Tacna",
    destino: "Challapalca",
    fotos: [
      "/images/rutas/Tacna-Challapalca_1.jpg",
      "/images/rutas/Tacna-Challapalca_2.jpg",
      "/images/rutas/Tacna-Challapalca_3.jpg",
    ],
  },
  {
    id: 3,
    partida: "Tacna",
    destino: "Capazo",
    fotos: [
      "/images/rutas/Tacna-Capazo_1.jpg",
      "/images/rutas/Tacna-Capazo_2.jpg",
      "/images/rutas/Tacna-Capazo_3.jpg",
    ],
  },
  {
    id: 4,
    partida: "Tacna",
    destino: "Ancomarca",
    fotos: [
      "/images/rutas/Tacna-Ancomarca_1.jpg",
      "/images/rutas/Tacna-Ancomarca_2.jpg",
      "/images/rutas/Tacna-Ancomarca_3.jpg",
    ],
  },
  {
    id: 5,
    partida: "Tacna",
    destino: "Pisacoma",
    fotos: [
      "/images/rutas/Tacna-Pisacoma_1.jpg",
      "/images/rutas/Tacna-Pisacoma_2.jpg",
      "/images/rutas/Tacna-Pisacoma_3.jpg",
    ],
  },
  {
    id: 6,
    partida: "Tacna",
    destino: "Kelluyo",
    fotos: [
      "/images/rutas/Tacna-Kelluyo_1.jpg",
      "/images/rutas/Tacna-Kelluyo_2.jpg",
      "/images/rutas/Tacna-Kelluyo_3.jpg",
    ],
  },
  {
    id: 7,
    partida: "Tacna",
    destino: "Desaguadero",
    fotos: [
      "/images/rutas/Tacna-Desaguadero_1.jpg",
      "/images/rutas/Tacna-Desaguadero_2.jpg",
      "/images/rutas/Tacna-Desaguadero_3.jpg",
    ],
  },
  {
    id: 8,
    partida: "Puno",
    destino: "Tacna",
    fotos: [
      "/images/rutas/Puno-Tacna_1.jpg",
      "/images/rutas/Puno-Tacna_2.jpg",
      "/images/rutas/Puno-Tacna_3.jpg",
    ],
  },
];
