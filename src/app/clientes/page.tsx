"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import clientes, { Cliente } from "../../../public/data/clientes";

const ClientesPage = () => {
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newCliente, setNewCliente] = useState<Omit<Cliente, "id" | "trips">>({
    name: "",
    lastname: "",
    dni: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [clientesList, setClientesList] = useState<Cliente[]>(clientes);

  const filteredClientes = clientesList.filter(
    (cliente) =>
      cliente.name.toLowerCase().includes(search.toLowerCase()) ||
      cliente.lastname.toLowerCase().includes(search.toLowerCase()) ||
      cliente.dni.toLowerCase().includes(search.toLowerCase()) ||
      cliente.phone.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddClienteClick = () => {
    setNewCliente({
      name: "",
      lastname: "",
      dni: "",
      phone: "",
    });
    setError(null);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCliente((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !newCliente.name ||
      !newCliente.lastname ||
      !newCliente.dni ||
      !newCliente.phone
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!/^\d{8}$/.test(newCliente.dni)) {
      setError("El DNI debe tener 8 dígitos.");
      return;
    }
    if (!/^\d{9}$/.test(newCliente.phone)) {
      setError("El teléfono debe tener 9 dígitos.");
      return;
    }
    const isDuplicate = clientesList.some(
      (cliente) => cliente.dni === newCliente.dni
    );
    if (isDuplicate) {
      setError("Ya existe un cliente con el mismo DNI.");
      return;
    }
    const newId = clientesList.length
      ? clientesList[clientesList.length - 1].id + 1
      : 1;
    const clienteToAdd = { ...newCliente, id: newId, trips: 0 }; // Initialize trips to 0
    setClientesList((prev) => [...prev, clienteToAdd]);
    setIsPopupOpen(false);
  };

  return (
    <div className="xl:p-8">
      <h1 className="text-2xl font-bold mb-4">Mis Clientes</h1>
      <div className="flex justify-between my-4">
        <button
          className="rounded-lg bg-gray-800 text-white py-3 px-6 text-xs font-bold shadow-md shadow-gray-600/20 transition-all hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-600/40"
          data-ripple-light="true"
          onClick={handleAddClienteClick}
        >
          Añadir Cliente
        </button>
        <div className="flex items-center bg-white rounded-lg">
          <div className="w-full">
            <input
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="Buscar por nombre, apellido, DNI o teléfono"
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
              Nombre
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Apellido(s)
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              DNI
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Teléfono
            </th>
            <th className="py-2 px-4 font-bold uppercase bg-gray-300 text-gray-600 border border-gray-300 hidden lg:table-cell">
              Viajes Realizados
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredClientes.map((cliente, index) => (
            <tr
              key={index}
              className="border-b text-center bg-white lg:hover:bg-gray-100"
            >
              <td className="py-2 px-4">{cliente.name}</td>
              <td className="py-2 px-4">{cliente.lastname}</td>
              <td className="py-2 px-4">{cliente.dni}</td>
              <td className="py-2 px-4">{cliente.phone}</td>
              <td className="py-2 px-4">{cliente.trips}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Añadir Cliente</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={newCliente.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Apellido(s)</label>
                <input
                  type="text"
                  name="lastname"
                  value={newCliente.lastname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">DNI</label>
                <input
                  type="text"
                  name="dni"
                  value={newCliente.dni}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Teléfono</label>
                <input
                  type="text"
                  name="phone"
                  value={newCliente.phone}
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

export default ClientesPage;
