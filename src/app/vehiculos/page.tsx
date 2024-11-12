"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import vehiculos, { Vehiculo } from "../../../public/data/vehiculos";
import Image from "next/image";

const VehiculosPage = () => {
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newVehiculo, setNewVehiculo] = useState<Omit<Vehiculo, "id">>({
    plate: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    img: "",
    lastMaintenance: "",
    nextMaintenance: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [vehiculosList, setVehiculosList] = useState<Vehiculo[]>(vehiculos);

  const filteredVehiculos = vehiculosList.filter(
    (vehiculo) =>
      vehiculo.plate.toLowerCase().includes(search.toLowerCase()) ||
      vehiculo.brand.toLowerCase().includes(search.toLowerCase()) ||
      vehiculo.model.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddVehiculoClick = () => {
    setNewVehiculo({
      plate: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      img: "",
      lastMaintenance: "",
      nextMaintenance: "",
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
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("El archivo debe ser una imagen.");
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setNewVehiculo((prev) => ({
        ...prev,
        img: imageUrl,
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
      return { text: `Hace ${Math.abs(diffDays)} días`, style: { color: 'red', fontWeight: 'bold' } };
    } else if (diffDays === 0) {
      return { text: 'Hoy', style: { color: 'red' } };
    } else if (diffDays < 7) {
      return { text: `en ${diffDays} días`, style: { color: 'orange' } };
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toISOString().split("T")[0];
    if (
      !newVehiculo.plate ||
      !newVehiculo.brand ||
      !newVehiculo.model ||
      !newVehiculo.year ||
      !newVehiculo.img ||
      !newVehiculo.lastMaintenance ||
      !newVehiculo.nextMaintenance
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (newVehiculo.year > currentYear + 1) {
      setError(`El año del vehículo no puede ser mayor a ${currentYear + 1}.`);
      return;
    }
    if (newVehiculo.lastMaintenance >= currentDate) {
      setError(
        "La fecha del último mantenimiento debe ser menor a la fecha actual."
      );
      return;
    }
    if (newVehiculo.nextMaintenance <= currentDate) {
      setError(
        "La fecha del próximo mantenimiento debe ser mayor a la fecha actual."
      );
      return;
    }
    const isDuplicate = vehiculosList.some(
      (vehiculo) =>
        vehiculo.plate.toLowerCase() === newVehiculo.plate.toLowerCase()
    );
    if (isDuplicate) {
      setError("Ya existe un vehículo con la misma placa.");
      return;
    }
    const newId = vehiculosList.length
      ? vehiculosList[vehiculosList.length - 1].id + 1
      : 1;
    const vehiculoToAdd = { ...newVehiculo, id: newId };
    setVehiculosList((prev) => [...prev, vehiculoToAdd]);
    setIsPopupOpen(false);
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
              Placa
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Marca
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Modelo
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Año
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Últ. Mantenimiento
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Próx. Mantenimiento
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
                <Image
                  src={vehiculo.img}
                  width={100}
                  height={100}
                  alt={vehiculo.brand + " " + vehiculo.model}
                />
              </td>
              <td className="py-2 px-4">{vehiculo.plate}</td>
              <td className="py-2 px-4">{vehiculo.brand}</td>
              <td className="py-2 px-4">{vehiculo.model}</td>
              <td className="py-2 px-4">{vehiculo.year}</td>
              <td className="py-2 px-4">{vehiculo.lastMaintenance}</td>
              <td className="py-2 px-4">
                {vehiculo.nextMaintenance}
                <br />
                <span className="text-gray-600 text-sm">
                  (<MaintenanceDate date={vehiculo.nextMaintenance} />)
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Añadir Vehículo</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Imagen</label>
                <input
                  type="file"
                  name="img"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Marca</label>
                <input
                  type="text"
                  name="brand"
                  value={newVehiculo.brand}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Modelo</label>
                <input
                  type="text"
                  name="model"
                  value={newVehiculo.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Placa</label>
                <input
                  type="text"
                  name="plate"
                  value={newVehiculo.plate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Año</label>
                <input
                  type="number"
                  name="year"
                  value={newVehiculo.year}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Último Mantenimiento
                </label>
                <input
                  type="date"
                  name="lastMaintenance"
                  value={newVehiculo.lastMaintenance}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Próximo Mantenimiento
                </label>
                <input
                  type="date"
                  name="nextMaintenance"
                  value={newVehiculo.nextMaintenance}
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
    </div>
  );
};

export default VehiculosPage;
