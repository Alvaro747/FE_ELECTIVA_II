import {CircularProgress, MenuItem, Select} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function CrearCursos() {
  const navigate = useNavigate();
  const [cursoData, setCursoData] = useState({
    nombre: "",
    cupo: "",
    horarioInicio: "",
    horarioFin: "",
    dias: "",
    sede: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [listSede, setListSede] = useState([]);

  useEffect(() => {
    fetchSede();
  }, []);

  const fetchSede = async () => {
    try {
      const response = await fetch("http://localhost:3000/sede");
      const data = await response.json();
      setListSede(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setCursoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      cursoData.sede = {id: cursoData.sede};
      const response = await fetch("http://localhost:3000/curso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cursoData),
      });
      const data = await response.json();
      navigate("/dashboard/ver-cursos");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="px-6 py-4">
          <div class="flex justify-center mx-auto">
            <img
              class="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />
          </div>

          <h3 class="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Registrar Curso
          </h3>

          <p class="mt-1 text-center text-gray-500 dark:text-gray-400">
            Llena los campos para registrar un nuevo curso
          </p>

          <form>
            <div class="w-full mt-4">
              <input
                onChange={handleInputChange}
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Nombre del Curso"
                name="nombre"
                aria-label="Nombre del Curso"
              />
            </div>

            <div class="w-full mt-4">
              <input
                onChange={handleInputChange}
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="number"
                name="cupo"
                placeholder="Cupo"
                aria-label="Cupo"
              />
            </div>

            <div class="w-full mt-4">
              <input
                onChange={handleInputChange}
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="datetime-local"
                name="horarioInicio"
                placeholder="Horario de Inicio"
                aria-label="Horario de Inicio"
              />
            </div>

            <div class="w-full mt-4">
              <input
                onChange={handleInputChange}
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="datetime-local"
                name="horarioFin"
                placeholder="Horario de Fin"
                aria-label="Horario de Fin"
              />
            </div>

            <div class="w-full mt-4">
              <input
                onChange={handleInputChange}
                class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                name="dias"
                placeholder="Días (Ej: Lunes, Miércoles)"
                aria-label="Días"
              />
            </div>

            <div className="w-full mt-4">
              <label htmlFor="rol"> Sede</label>
              <Select
                value={cursoData?.sede}
                name="sede"
                onChange={handleInputChange}
                className="block w-full mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {listSede?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div class="flex items-center justify-between mt-4">
              <button
                onClick={handleSubmit}
                class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Registrar Curso"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearCursos;
