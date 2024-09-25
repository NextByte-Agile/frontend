// src/app/rutas/[id]/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { rutas } from "../../../../public/data/rutas";
import { viajes } from "../../../../public/data/viajes";
import vehicles from "../../../../public/data/vehiculos";
import Image from "next/image";

export default function RutaDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const rutaId = parseInt(params.id, 10);

  const ruta = rutas.find((r) => r.id === rutaId);

  const viajesDeRuta = viajes.filter((viaje) => viaje.rutaId === rutaId);

  useEffect(() => {
    if (!ruta) {
      router.push("/rutas");
    }
  }, [ruta, router]);

  if (!ruta) return null;

  return (
    <div className="p-8">
      <button
        onClick={() => router.push("/rutas")}
        className="text-blue-500 underline mb-4"
      >
        Volver a las rutas
      </button>
      <h1 className="text-2xl font-bold mb-4">
        {ruta.partida} - {ruta.destino}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {ruta.fotos.map((foto, index) => (
          <Image
            key={index}
            src={foto}
            width={400}
            height={300}
            alt={`${ruta.partida} a ${ruta.destino} ${index + 1}`}
            className="w-full h-48 object-cover rounded"
          />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Próximos Viajes</h2>
      {viajesDeRuta.length > 0 ? (
        <table className="min-w-full bg-white text-black border border-zinc-300">
          <thead>
            <tr className="bg-zinc-200">
              <th className="py-2 px-4 border-b">Fecha</th>
              <th className="py-2 px-4 border-b">Hora</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Vehículo</th>
            </tr>
          </thead>
          <tbody>
            {viajesDeRuta.map((viaje, index) => {
              const vehiculo = vehicles.find((v) => v.id === viaje.vehiculoId);

              return (
                <tr key={index} className="text-center border-t">
                  <td className="py-2 px-4 border-b">{viaje.fecha}</td>
                  <td className="py-2 px-4 border-b">{viaje.hora}</td>
                  <td className="py-2 px-4 border-b">
                    S/ {viaje.precio.toFixed(2)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {vehiculo
                      ? `${vehiculo.brand} ${vehiculo.model} (${vehiculo.plate})`
                      : "No asignado"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No hay viajes programados para esta ruta.</p>
      )}
    </div>
  );
}
