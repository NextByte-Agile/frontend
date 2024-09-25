"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { rutas } from "../../../../public/data/rutas";
import { Viaje, viajes as initialViajes } from "../../../../public/data/viajes";
import vehiculos from "../../../../public/data/vehiculos";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

export default function RutaDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const rutaId = parseInt(params.id, 10);

  const ruta = rutas.find((r) => r.id === rutaId);

  const [viajes, setViajes] = useState<Viaje[]>(
    initialViajes.filter((viaje) => viaje.rutaId === rutaId)
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const initialNewViajeState = {
    fecha: "",
    hora: "",
    precio: 0,
    vehiculoId: vehiculos[0]?.id || 0,
  };
  const [newViaje, setNewViaje] =
    useState<Omit<Viaje, "rutaId">>(initialNewViajeState);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ruta) {
      router.push("/rutas");
    }
  }, [ruta, router]);

  if (!ruta) return null;

  const handleAddViajeClick = () => {
    setNewViaje(initialNewViajeState);
    setError(null);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewViaje((prev) => ({
      ...prev,
      [name]:
        name === "precio" || name === "vehiculoId" ? Number(value) : value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidDateTime(newViaje.fecha, newViaje.hora)) {
      setError("La fecha y hora deben ser posteriores a la actual.");
      return;
    }
    if (newViaje.precio < 0) {
      setError("El precio no puede ser negativo.");
      return;
    }
    const viajeToAdd = { ...newViaje, rutaId };
    setViajes((prev) => {
      const updatedViajes = [...prev, viajeToAdd];
      updatedViajes.sort((a, b) => {
        const dateA = new Date(`${a.fecha}T${a.hora}`);
        const dateB = new Date(`${b.fecha}T${b.hora}`);
        return dateA.getTime() - dateB.getTime();
      });
      return updatedViajes;
    });
    setIsPopupOpen(false);
  };

  const isValidDateTime = (fecha: string, hora: string) => {
    const now = new Date();
    const [year, month, day] = fecha.split("-").map(Number);
    const [hours, minutes] = hora.split(":").map(Number);
    const selectedDate = new Date(year, month - 1, day, hours, minutes);
    return selectedDate > now;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    if (isNaN(hours) || isNaN(minutes)) {
      return "Hora inválida";
    }
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
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
      {viajes.length > 0 ? (
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
            {viajes.map((viaje, index) => {
              const vehiculo = vehiculos.find((v) => v.id === viaje.vehiculoId);
              return (
                <tr
                  key={index}
                  className="border-b text-center bg-white lg:hover:bg-gray-100"
                >
                  <td className="py-2 px-4 border-b">{viaje.fecha}</td>
                  <td className="py-2 px-4 border-b">
                    {formatTime(viaje.hora)}
                  </td>
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
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={newViaje.fecha}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Hora</label>
                <input
                  type="time"
                  name="hora"
                  value={newViaje.hora}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={newViaje.precio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Asignar Vehículo</label>
                <select
                  name="vehiculoId"
                  value={newViaje.vehiculoId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  {vehiculos.map((vehiculo) => (
                    <option key={vehiculo.id} value={vehiculo.id}>
                      {vehiculo.brand} {vehiculo.model} ({vehiculo.plate})
                    </option>
                  ))}
                </select>
              </div>
              {error && <p className="text-red-500">{error}</p>}
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
