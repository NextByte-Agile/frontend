"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { rutas } from "../../../../public/data/rutas";
import { viajes } from "../../../../public/data/viajes";
import vehiculos from "../../../../public/data/vehiculos";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

export default function RutaDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const rutaId = parseInt(params.id, 10);

  const ruta = rutas.find((r) => r.id === rutaId);

  const viajesDeRuta = viajes.filter((viaje) => viaje.rutaId === rutaId);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    if (!ruta) {
      router.push("/rutas");
    }
  }, [ruta, router]);

  if (!ruta) return null;

  const handleAddViajeClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="p-8">
      <button
        onClick={() => router.push("/rutas")}
        className="flex items-center rounded-lg bg-gray-800 text-white py-2 px-4 mb-4 text-xs font-bold shadow-md shadow-gray-600/20 transition-all hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-600/40"
        data-ripple-light="true"
      >
        <FaArrowLeft className="inline-block mr-2" />
        Volver a las rutas
      </button>
      <h1 className="text-2xl font-bold mb-4">
        Ruta: {ruta.partida} - {ruta.destino}
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

      <div className="flex justify-between my-4">
        <h2 className="text-xl font-semibold">Próximos Viajes</h2>
        <button
          className="rounded-lg bg-gray-800 text-white py-3 px-6 text-xs font-bold shadow-md shadow-gray-600/20 transition-all hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-600/40"
          data-ripple-light="true"
          onClick={handleAddViajeClick}
        >
          Añadir Viaje
        </button>
      </div>
      {viajesDeRuta.length > 0 ? (
        <table className="w-full shadow-md rounded-md border-collapse table-auto">
          <thead>
            <tr className="uppercase text-sm">
              <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Fecha
              </th>
              <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Hora
              </th>
              <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Precio
              </th>
              <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Vehículo
              </th>
            </tr>
          </thead>
          <tbody>
            {viajesDeRuta.map((viaje, index) => {
              const vehiculo = vehiculos.find((v) => v.id === viaje.vehiculoId);
              return (
                <tr
                  key={index}
                  className="border-b text-center bg-white lg:hover:bg-gray-100"
                >
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

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Añadir Viaje</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Fecha</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Hora</label>
                <input
                  type="time"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Precio</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Asignar Vehículo</label>
                <select className="w-full px-4 py-2 border rounded-lg">
                  {vehiculos.map((vehiculo) => (
                    <option key={vehiculo.id} value={vehiculo.id}>
                      {vehiculo.brand} {vehiculo.model} ({vehiculo.plate})
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={handleClosePopup}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
