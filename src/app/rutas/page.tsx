"use client";
import { useRouter } from "next/navigation";
import { rutas } from "../../../public/data/rutas";

export default function RutasPage() {
  const router = useRouter();

  const handleRutaClick = (id: number) => {
    router.push(`/rutas/${id}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Rutas Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rutas.map((ruta) => (
          <div
            key={ruta.id}
            className="border rounded-lg p-4 shadow cursor-pointer hover:shadow-lg"
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
