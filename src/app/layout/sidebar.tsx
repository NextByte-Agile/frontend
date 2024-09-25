import Image from "next/image";
import logo from "/public/images/logo.jpg";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <Image
        src={logo}
        width={200}
        height={200}
        alt="Logo"
        className="mx-auto rounded-md my-8"
      />
      <nav className="flex flex-col gap-4">
        <Link href="/vehiculos" className="hover:bg-gray-700 p-2 rounded">
          Vehículos
        </Link>
        <Link href="/rutas" className="hover:bg-gray-700 p-2 rounded">
          Rutas
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
