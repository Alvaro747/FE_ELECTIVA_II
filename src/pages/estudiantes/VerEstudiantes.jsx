import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {config} from "../../config/config";

function VerEstudiantes() {
  const navigate = useNavigate();
  const [estudiantes, setEstudiantes] = useState([]);
  const fetchEstudiantes = async () => {
    try {
      const response = await fetch(`${config.baseUrl}/estudiante`);
      const data = await response.json();
      setEstudiantes(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleNavCreate = (e) => {
    e.preventDefault();
    navigate("/dashboard/crear-estudiante");
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  return (
    <div>
      <button
        onClick={handleNavCreate}
        className="px-6 py-2 mb-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      >
        Crear Estudiante
      </button>
      <section className="container px-4 mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Nombre
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Identificación
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Edad
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Dirección
                </th>
                <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
              {estudiantes.map((estudiante) => (
                <tr key={estudiante.id}>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {estudiante.nombres}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {estudiante.identificacion}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {estudiante.edad}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {estudiante.direccion}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                    {estudiante.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default VerEstudiantes;
