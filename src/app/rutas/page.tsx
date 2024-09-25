"use client";
import { useRouter } from "next/navigation";
import { rutas } from "../../../public/data/rutas";
import { FaSearch } from "react-icons/fa";

export default function RutasPage() {
  const router = useRouter();

  const handleRutaClick = (id: number) => {
    router.push(`/rutas/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Mis Rutas</h1>
      <div className="flex justify-between my-4">
        <button
          className="rounded-lg bg-gray-800 text-white py-3 px-6 text-xs font-bold shadow-md shadow-gray-600/20 transition-all hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-600/40"
          data-ripple-light="true"
        >
          Añadir Ruta
        </button>
        <div
          className="flex items-center bg-white rounded-lg"
          x-data="{ search: '' }"
        >
          <div className="w-full">
            <input
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="search"
              x-model="search"
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex items-center bg-gray-800 justify-center w-12 h-12 text-white rounded-r-lg"
            >
              <FaSearch className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rutas.map((ruta) => (
          <div
            key={ruta.id}
            className="border rounded-lg p-4 bg-white hover:bg-gray-100 cursor-pointer shadow-md hover:shadow-lg"
            onClick={() => handleRutaClick(ruta.id)}
          >
            <h2 className="text-xl font-semibold">
              {ruta.partida} - {ruta.destino}
            </h2>
            <div className="flex space-x-2 mt-2 overflow-hidden whitespace-nowrap">
              {ruta.fotos.map((foto, index) => (
                <img
                  key={index}
                  src={foto}
                  alt={`${ruta.partida} a ${ruta.destino} ${index + 1}`}
                  className="w-20 h-14 object-cover rounded border border-zinc-200"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
