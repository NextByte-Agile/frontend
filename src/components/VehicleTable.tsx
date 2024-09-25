import vehiculos from "../public/data/vehiculos";

const VehicleTable = () => {
  return (
    <table className="w-full bg-white text-gray-600 shadow-md rounded-md">
      <thead>
        <tr className="bg-gray-200 uppercase text-sm">
          <th className="py-2 px-4">Placa</th>
          <th className="py-2 px-4">Marca</th>
          <th className="py-2 px-4">Modelo</th>
          <th className="py-2 px-4">Año</th>
        </tr>
      </thead>
      <tbody>
        {vehiculos.map((vehicle, index) => (
          <tr key={index} className="border-b text-center">
            <td className="py-2 px-4">{vehicle.plate}</td>
            <td className="py-2 px-4">{vehicle.brand}</td>
            <td className="py-2 px-4">{vehicle.model}</td>
            <td className="py-2 px-4">{vehicle.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VehicleTable;
