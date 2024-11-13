import Image from "next/image";
import logo from "/public/images/logo.png";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen fixed bg-gray-800 text-white flex flex-col p-4">
      <Image
        priority={true}
        src={logo}
        width={200}
        height={200}
        alt="Logo"
        className="mx-auto rounded-md my-8 h-44 w-52"
      />
      <nav className="flex flex-col gap-4">
        <Link href="/vehiculos" className="hover:bg-gray-600 p-2 rounded">
          Mis Vehículos
        </Link>
        <Link href="/rutas" className="hover:bg-gray-600 p-2 rounded">
          Mis Rutas
        </Link>
        <Link href="/clientes" className="hover:bg-gray-600 p-2 rounded">
          Mis Clientes
        </Link>
      </nav>
      <Link href="/login" className="mt-auto hover:bg-red-700 p-2 rounded ">
        Logout
      </Link>
    </div>
  );
};

export default Sidebar;
