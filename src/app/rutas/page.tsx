"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { rutas as initialRutas, Ruta } from "../../../public/data/rutas";
import { FaSearch } from "react-icons/fa";

export default function RutasPage() {
  const [search, setSearch] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newRuta, setNewRuta] = useState<Omit<Ruta, "id">>({
    partida: "",
    destino: "",
    fotos: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [rutas, setRutas] = useState<Ruta[]>(initialRutas);
  const router = useRouter();

  const handleRutaClick = (id: number) => {
    router.push(`/rutas/${id}`);
  };

  const handleAddRutaClick = () => {
    setNewRuta({
      partida: "",
      destino: "",
      fotos: [],
    });
    setError(null);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewRuta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const imageUrls = Array.from(files).map((file) => {
        if (!file.type.startsWith("image/")) {
          setError("Todos los archivos deben ser imágenes.");
          return "";
        }
        return URL.createObjectURL(file);
      });
      setNewRuta((prev) => ({
        ...prev,
        fotos: imageUrls.filter((url) => url !== ""),
      }));
      setError(null);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuta.partida || !newRuta.destino || newRuta.fotos.length === 0) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    const isDuplicate = rutas.some(
      (ruta) =>
        ruta.partida.toLowerCase() === newRuta.partida.toLowerCase() &&
        ruta.destino.toLowerCase() === newRuta.destino.toLowerCase()
    );
    if (isDuplicate) {
      setError("Ya existe una ruta con la misma partida y destino.");
      return;
    }
    const newId = rutas.length ? rutas[rutas.length - 1].id + 1 : 1;
    const rutaToAdd = { ...newRuta, id: newId };
    setRutas((prev) => [...prev, rutaToAdd]);
    setIsPopupOpen(false);
  };

  const filteredRutas = rutas.filter(
    (ruta) =>
      ruta.partida.toLowerCase().includes(search.toLowerCase()) ||
      ruta.destino.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Mis Rutas</h1>
      <div className="flex justify-between my-4">
        <button
          className="rounded-lg bg-gray-800 text-white py-3 px-6 text-xs font-bold shadow-md shadow-gray-600/20 transition-all hover:bg-gray-600 hover:shadow-lg hover:shadow-gray-600/40"
          data-ripple-light="true"
          onClick={handleAddRutaClick}
        >
          Añadir Ruta
        </button>
        <div className="flex items-center bg-white rounded-lg">
          <div className="w-full">
            <input
              type="search"
              className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
              placeholder="Buscar por partida o destino"
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRutas.map((ruta) => (
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

      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-h-[90vh] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Añadir Ruta</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Imágenes</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Partida</label>
                <input
                  type="text"
                  name="partida"
                  value={newRuta.partida}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Destino</label>
                <input
                  type="text"
                  name="destino"
                  value={newRuta.destino}
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
}
