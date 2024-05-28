import {CircularProgress, MenuItem, Select, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {config} from "../../config/config";

function CrearMatricula() {
  const navigate = useNavigate();

  const [curso, setCurso] = useState("");
  const [estudiante, setEstudiante] = useState("");
  const [fechaMatricula, setFechaMatricula] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listCurso, setListCurso] = useState([]);
  const [listEstudiante, setListEstudiante] = useState([]);

  useEffect(() => {
    fetchCurso();
    fetchEstudiante();
  }, []);

  const fetchCurso = async () => {
    try {
      const response = await fetch(`${config.baseUrl}/curso`);
      const data = await response.json();
      setListCurso(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchEstudiante = async () => {
    try {
      const response = await fetch(`${config.baseUrl}/estudiante`);
      const data = await response.json();
      setListEstudiante(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const matricula = {
        curso: {id: curso},
        estudiante: {id: estudiante},
        fechaMatricula: fechaMatricula,
      };

      const response = await fetch(`${config.baseUrl}/matricula`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(matricula),
      });

      if (response.ok) {
        location.reload();
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    navigate("/dashboard/matricula");
  };

  const handleNavCreate = (e) => {
    e.preventDefault();
    navigate("/dashboard/matriculas");
  };

  return (
    <div>
      <button
        onClick={handleNavCreate}
        className="px-6 py-2 mb-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
      >
        Ver Matriculas
      </button>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="Logo"
            />
          </div>

          <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Registrar Matrícula
          </h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Selecciona el curso, el estudiante y la fecha de matrícula
          </p>

          <form>
            <div className="w-full mt-4">
              <label htmlFor="curso">Curso</label>
              <Select
                value={curso}
                onChange={(e) => setCurso(e.target.value)}
                className="block w-full  mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {listCurso?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="w-full mt-4">
              <label htmlFor="estudiante">Estudiante</label>
              <Select
                value={estudiante}
                onChange={(e) => setEstudiante(e.target.value)}
                className="block w-full  mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {listEstudiante?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.nombres}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="w-full mt-4">
              <label htmlFor="fechaMatricula">Fecha de Matrícula</label>
              <TextField
                type="date"
                value={fechaMatricula}
                onChange={(e) => setFechaMatricula(e.target.value)}
                className="block w-full px-4 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Registrar Matrícula"
                )}
              </button>
              <button
                onClick={handleCancelBtn}
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CrearMatricula;
