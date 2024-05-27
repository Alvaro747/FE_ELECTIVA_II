import {CircularProgress, MenuItem, Select} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function CrearAcudiente() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Estados para los campos del acudiente
  const [nombres, setNombres] = useState("");
  const [telefono, setTelefono] = useState("");
  const [celular, setCelular] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [parentesco, setParentesco] = useState("");

  const [idEstudiante, setIdEstudiante] = useState("");
  const [listEstudiante, setListEstudiante] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const acudiente = {nombres, telefono, celular, ocupacion, parentesco};

    try {
      const response = await fetch("http://localhost:3000/acudiente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(acudiente),
      });

      const data = await response.json();
      const idAcudiente = data.data.id;
      await createRelacion(idAcudiente);
    } catch (error) {}
  };

  const createRelacion = async (idAcudiente) => {
    const relacion = {
      acudiente: {id: idAcudiente},
      estudiante: {id: idEstudiante},
    };

    try {
      const response = await fetch(
        "http://localhost:3000/estudianteacudiente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(relacion),
        }
      );

      const data = await response.json();
    } catch (error) {
    } finally {
      setIsLoading(false);
      navigate("/dashboard/acudiente");
    }
  };

  const fetchEstudiante = async () => {
    try {
      const response = await fetch("http://localhost:3000/estudiante");
      const data = await response.json();
      setListEstudiante(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchEstudiante();
  }, []);

  const handleCancelBtn = (e) => {
    e.preventDefault();
    navigate("/dashboard/acudiente");
  };

  return (
    <div>
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
            Registrar Acudiente
          </h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Llena los campos para registrar un nuevo acudiente
          </p>

          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Nombres"
                aria-label="Nombres"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Teléfono"
                aria-label="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Celular"
                aria-label="Celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Ocupación"
                aria-label="Ocupación"
                value={ocupacion}
                onChange={(e) => setOcupacion(e.target.value)}
                required
              />
            </div>

            <div className="w-full mt-4">
              <input
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                placeholder="Parentesco"
                aria-label="Parentesco"
                value={parentesco}
                onChange={(e) => setParentesco(e.target.value)}
                required
              />
            </div>

            <div className="w-full mt-4">
              <label htmlFor="estudiante">Estudiante</label>
              <Select
                value={idEstudiante}
                onChange={(e) => setIdEstudiante(e.target.value)}
                className="block w-full   mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {listEstudiante?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.nombres}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Registrar Acudiente"
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

export default CrearAcudiente;
