// src/app/rutas/page.tsx
"use client";
import { useState } from "react";
import { rutas } from "../../public/data/rutas";
import { viajes } from "../../public/data/viajes";
import vehicles from "../../public/data/vehiculos";

export default function RutasPage() {
  const [selectedRuta, setSelectedRuta] = useState<number | null>(null);

  const handleRutaClick = (id: number) => {
    setSelectedRuta(id === selectedRuta ? null : id);
  };

  const viajesDeRutaSeleccionada = viajes.filter(
    (viaje) => viaje.rutaId === selectedRuta
  );

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
            <div className="flex space-x-2 mt-2">
              {ruta.fotos.map((foto, index) => (
                <img
                  key={index}
                  src={foto}
                  alt={`${ruta.partida} a ${ruta.destino} ${index + 1}`}
                  className="w-24 h-16 object-cover rounded"
                />
              ))}
            </div>
            {/* Mostrar la lista de próximos viajes si la ruta está seleccionada */}
            {selectedRuta === ruta.id && (
              <div className="mt-4">
                <h3 className="font-semibold">Próximos Viajes:</h3>
                <ul className="list-disc list-inside">
                  {viajesDeRutaSeleccionada.length > 0 ? (
                    viajesDeRutaSeleccionada.map((viaje, idx) => {
                      // Encontrar el vehículo correspondiente al viaje
                      const vehiculo = vehicles.find(
                        (v) => v.id === viaje.vehiculoId
                      );

                      return (
                        <li key={idx} className="mt-2">
                          <div>
                            <strong>Fecha:</strong> {viaje.fecha} -{" "}
                            <strong>Hora:</strong> {viaje.hora}
                          </div>
                          <div>
                            <strong>Precio:</strong> S/{" "}
                            {viaje.precio.toFixed(2)}
                          </div>
                          {vehiculo && (
                            <div>
                              <strong>Vehículo:</strong> {vehiculo.brand}{" "}
                              {vehiculo.model} ({vehiculo.plate})
                            </div>
                          )}
                        </li>
                      );
                    })
                  ) : (
                    <li>No hay viajes programados para esta ruta.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
