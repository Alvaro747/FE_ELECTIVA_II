import React from "react";
const datosSede = [
  {
    nombre: "Neiva",
  },
  {
    nombre: "Campoalegre",
  },
];
function VerSede() {
  return (
    <div>
      {" "}
      <div>
        <button class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
          Registrar Curso
        </button>
        <section className="container px-4 mx-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Nombre
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
                {datosSede?.map((estudiante, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                      {estudiante.nombre}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}

export default VerSede;
