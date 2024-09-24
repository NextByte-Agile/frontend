const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-2xl font-bold mb-6">Gestión de Flota</h2>
      <nav className="flex flex-col gap-4">
        <a href="/vehicles" className="hover:bg-gray-700 p-2 rounded">
          Vehículos
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
