import Image from "next/image";
import vehiculos from "../../public/data/vehiculos";

const VehicleTable = () => {
  return (
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
        {vehiculos.map((vehicle, index) => (
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
              ></Image>
            </td>
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
