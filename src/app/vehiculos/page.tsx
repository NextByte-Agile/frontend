"use client";
import { useEffect, useState } from "react";
import { FaPen, FaSearch, FaTrash } from "react-icons/fa";
import { getVehiculos, addVehiculo, updateVehiculo } from "../../services/api";
import { Vehiculo } from "./vehiculo";

const VehiculosPage = () => {
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupEditOpen, setIsPopupEditOpen] = useState(false);
  const [newVehiculo, setNewVehiculo] = useState<Omit<Vehiculo, "idVehiculo">>({
    marca: "",
    anio: new Date().getFullYear(),
    placa: "",
    capacidadAsientos: 0,
    foto: "",
    fechaMantenimiento: "",
    proximoMantenimiento: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [vehiculosList, setVehiculosList] = useState<Vehiculo[]>([]);
  const [currentVehiculo, setCurrentVehiculo] = useState<Vehiculo | null>(null);

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const vehiculos = await getVehiculos();
        setVehiculosList(vehiculos);
      } catch (error) {
        console.error("Error fetching vehiculos:", error);
      }
    };

    fetchVehiculos();
  }, []);

  const filteredVehiculos = vehiculosList.filter(
    (vehiculo) =>
      vehiculo.placa.toLowerCase().includes(search.toLowerCase()) ||
      vehiculo.marca.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddVehiculoClick = () => {
    setNewVehiculo({
      marca: "",
      anio: new Date().getFullYear(),
      placa: "",
      capacidadAsientos: 0,
      foto: "",
      fechaMantenimiento: "",
      proximoMantenimiento: "",
    });
    setError(null);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewVehiculo((prev) => ({
      ...prev,
      [name]: name === "anio" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      if (!url.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
        setError("La URL debe ser una imagen.");
        return;
      }
      setNewVehiculo((prev) => ({
        ...prev,
        foto: url,
      }));
      setError(null);
    }
  };

  const calculateTimeDifference = (date: string) => {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: `Hace ${Math.abs(diffDays)} días`,
        style: { color: "red", fontWeight: "bold" },
      };
    } else if (diffDays === 0) {
      return { text: "Hoy", style: { color: "red" } };
    } else if (diffDays < 7) {
      return { text: `en ${diffDays} días`, style: { color: "orange" } };
    } else if (diffDays < 30) {
      const diffWeeks = Math.ceil(diffDays / 7);
      return { text: `en ${diffWeeks} semanas`, style: {} };
    } else {
      const diffMonths = Math.ceil(diffDays / 30);
      return { text: `en ${diffMonths} meses`, style: {} };
    }
  };

  const MaintenanceDate = ({ date }: { date: string }) => {
    const { text, style } = calculateTimeDifference(date);

    return <span style={style}>{text}</span>;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toISOString().split("T")[0];
    if (
      !newVehiculo.placa ||
      !newVehiculo.marca ||
      !newVehiculo.anio ||
      !newVehiculo.foto ||
      !newVehiculo.capacidadAsientos ||
      !newVehiculo.fechaMantenimiento ||
      !newVehiculo.proximoMantenimiento
    ) {
      setError("Todos los campos son obligatorios.");
      console.log(newVehiculo);
      return;
    }
    if (newVehiculo.anio > currentYear + 1) {
      setError(`El año del vehículo no puede ser mayor a ${currentYear + 1}.`);
      return;
    }
    if (
      newVehiculo.capacidadAsientos < 0 ||
      newVehiculo.capacidadAsientos > 40
    ) {
      setError("El número de asientos debe estar entre 0 y 40.");
      return;
    }
    if (newVehiculo.fechaMantenimiento >= currentDate) {
      setError(
        "La fecha del último mantenimiento debe ser menor a la fecha actual."
      );
      return;
    }
    if (newVehiculo.proximoMantenimiento <= currentDate) {
      setError(
        "La fecha del próximo mantenimiento debe ser mayor a la fecha actual."
      );
      return;
    }
    const isDuplicate = vehiculosList.some(
      (vehiculo) =>
        vehiculo.placa.toLowerCase() === newVehiculo.placa.toLowerCase()
    );
    if (isDuplicate) {
      setError("Ya existe un vehículo con la misma placa.");
      return;
    }

    try {
      const vehiculoToAdd = await addVehiculo(newVehiculo);
      setVehiculosList((prev) => [...prev, vehiculoToAdd]);
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding vehiculo:", error);
      setError("Error al añadir el vehículo.");
    }
  };

  const handleFormEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentVehiculo) {
      if ("idVehiculo" in currentVehiculo) {
        await handleUpdateVehiculo(currentVehiculo);
      } else {
        await addVehiculo(currentVehiculo);
      }
      const data = await getVehiculos();
      setVehiculosList(data);
      setIsPopupEditOpen(false);
      setCurrentVehiculo(null);
    }
  };

  const handleCloseEditPopup = () => {
    setIsPopupEditOpen(false);
  };

  const handleEditClick = (vehiculo: Vehiculo) => {
    setCurrentVehiculo(vehiculo);
    setIsPopupEditOpen(true);
  };

  const handleUpdateVehiculo = async (updatedVehiculo: Vehiculo) => {
    try {
      const updated = await updateVehiculo(updatedVehiculo);
      setVehiculosList((prevList) =>
        prevList.map((vehiculo) =>
          vehiculo.idVehiculo === updated.idVehiculo ? updated : vehiculo
        )
      );
      setIsPopupEditOpen(false);
    } catch (error) {
      console.error("Error updating vehiculo:", error);
      setError("Error updating vehiculo");
    }
  };

  return (
    <div className="xl:p-8">
      <h1 className="text-2xl font-bold mb-4">Mis Vehículos</h1>
      <div className="flex justify-between my-4">
        <button
          className="rounded-lg bg-gray-800 text-white py-3 px-6 text-xs font-bold shadow-md shadow-gray-600/20 transition-all hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-600/40"
          data-ripple-light="true"
          onClick={handleAddVehiculoClick}
        >
          Añadir vehículo
        </button>
        <div className="flex items-center bg-white rounded-lg">
          <div className="w-full">
            <input
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
      <table className="w-full shadow-md rounded-md border-collapse table-auto">
        <thead>
          <tr className="uppercase text-sm">
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Foto
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Marca
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Placa
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Año
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Cap. asientos
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Últ. Mantenimiento
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Próx. Mantenimiento
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredVehiculos.map((vehiculo, index) => (
            <tr
              key={index}
              className="border-b text-center bg-white lg:hover:bg-gray-100"
            >
              <td className="py-2 px-4 flex justify-center">
                <img
                  src={vehiculo.foto || "/car-placeholder.png"}
                  alt={vehiculo.marca}
                  className="h-16 w-24 w-auto object-cover"
                />
              </td>
              <td className="py-2 px-4">{vehiculo.marca}</td>
              <td className="py-2 px-4">{vehiculo.placa}</td>
              <td className="py-2 px-4">{vehiculo.anio}</td>
              <td className="py-2 px-4">{vehiculo.capacidadAsientos}</td>
              <td className="py-2 px-4">{vehiculo.fechaMantenimiento}</td>
              <td className="py-2 px-4">
                {vehiculo.proximoMantenimiento}
                <br />
                <span className="text-gray-600 text-xs">
                  <MaintenanceDate date={vehiculo.proximoMantenimiento} />
                </span>
              </td>
              <td className="py-2 px-4">
                <div className="flex gap-2">
                  <button
                    className="bg-gray-800 text-white px-3 py-2 rounded-lg"
                    onClick={() => handleEditClick(vehiculo)}
                  >
                    <FaPen className="h-4 w-4" />
                  </button>
                  <button className="bg-red-800 text-white px-3 py-2 rounded-lg">
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-h-[90vh] w-96 max-w-[90vw] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Añadir Vehículo</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="foto" className="block text-gray-700">
                  Imagen
                </label>
                <input
                  id="foto"
                  type="text"
                  name="foto"
                  placeholder="Pega la URL de la imagen"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="marca" className="block text-gray-700">
                  Marca
                </label>
                <input
                  type="text"
                  name="marca"
                  value={newVehiculo.marca}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="anio" className="block text-gray-700">
                  Año
                </label>
                <input
                  type="number"
                  name="anio"
                  value={newVehiculo.anio}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="placa" className="block text-gray-700">
                  Placa
                </label>
                <input
                  type="text"
                  name="placa"
                  value={newVehiculo.placa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="capacidadAsientos"
                  className="block text-gray-700"
                >
                  Capacidad Asientos
                </label>
                <input
                  type="number"
                  name="capacidadAsientos"
                  value={newVehiculo.capacidadAsientos}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="fechaMantenimiento"
                  className="block text-gray-700"
                >
                  Último Mantenimiento
                </label>
                <input
                  type="date"
                  name="fechaMantenimiento"
                  value={newVehiculo.fechaMantenimiento}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="proximoMantenimiento"
                  className="block text-gray-700"
                >
                  Próximo Mantenimiento
                </label>
                <input
                  type="date"
                  name="proximoMantenimiento"
                  value={newVehiculo.proximoMantenimiento}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
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

      {isPopupEditOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-h-[90vh] w-96 max-w-[90vw] overflow-auto">
            <h2 className="text-xl font-bold mb-1">Editar Vehículo</h2>
            <p className="text-blue-600 mb-6">
              {currentVehiculo?.marca} - {currentVehiculo?.placa}
            </p>
            <form onSubmit={handleFormEditSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="fechaMantenimiento"
                  className="block text-gray-700"
                >
                  Último Mantenimiento
                </label>
                <input
                  type="date"
                  name="fechaMantenimiento"
                  value={currentVehiculo?.fechaMantenimiento || ""}
                  onChange={(e) =>
                    setCurrentVehiculo(
                      currentVehiculo
                        ? {
                            ...currentVehiculo,
                            fechaMantenimiento: e.target.value,
                          }
                        : null
                    )
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="proximoMantenimiento"
                  className="block text-gray-700"
                >
                  Próximo Mantenimiento
                </label>
                <input
                  id="proximoMantenimiento"
                  type="date"
                  name="proximoMantenimiento"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={currentVehiculo?.proximoMantenimiento || ""}
                  onChange={(e) =>
                    setCurrentVehiculo(
                      currentVehiculo
                        ? {
                            ...currentVehiculo,
                            proximoMantenimiento: e.target.value,
                          }
                        : null
                    )
                  }
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg mr-2"
                  onClick={handleCloseEditPopup}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiculosPage;
