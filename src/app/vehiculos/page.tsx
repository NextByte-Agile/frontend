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
  });
  const [error, setError] = useState<string | null>(null);
  const [vehiculosList, setVehiculosList] = useState<Vehiculo[]>(vehiculos);

  const filteredVehiculos = vehiculosList.filter(
    (vehicle) =>
      vehicle.plate.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(search.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddVehicleClick = () => {
    setNewVehiculo({
      plate: "",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      img: "",
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
      setError(null); // Clear any previous error
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentYear = new Date().getFullYear();
    if (
      !newVehiculo.plate ||
      !newVehiculo.brand ||
      !newVehiculo.model ||
      !newVehiculo.year ||
      !newVehiculo.img
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (newVehiculo.year > currentYear + 1) {
      setError(`El año del vehículo no puede ser mayor a ${currentYear + 1}.`);
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
          onClick={handleAddVehicleClick}
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
          </tr>
        </thead>
        <tbody>
          {filteredVehiculos.map((vehicle, index) => (
            <tr
              key={index}
              className="border-b text-center bg-white lg:hover:bg-gray-100"
            >
              <td className="py-2 px-4 flex justify-center">
                <Image
                  src={vehicle.img}
                  width={100}
                  height={100}
                  alt={vehicle.brand + " " + vehicle.model}
                />
              </td>
              <td className="py-2 px-4">{vehicle.plate}</td>
              <td className="py-2 px-4">{vehicle.brand}</td>
              <td className="py-2 px-4">{vehicle.model}</td>
              <td className="py-2 px-4">{vehicle.year}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
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
