import React, {useState} from "react";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {config} from "../../config/config";

const fieldData = [
  {name: "nombres", type: "text", placeholder: "Nombres"},
  {name: "identificacion", type: "text", placeholder: "Identificación"},
  {
    name: "tipoIdentificacion",
    type: "text",
    placeholder: "Tipo de Identificación",
  },
  {name: "fechaNacimiento", type: "date", placeholder: "Fecha de Nacimiento"},
  {name: "edad", type: "number", placeholder: "Edad"},
  {name: "estrato", type: "number", placeholder: "Estrato"},
  {name: "direccion", type: "text", placeholder: "Dirección"},
  {name: "barrio", type: "text", placeholder: "Barrio"},
  {name: "telefono", type: "text", placeholder: "Teléfono"},
  {name: "celular", type: "text", placeholder: "Celular"},
  {
    name: "institucionEducativa",
    type: "text",
    placeholder: "Institución Educativa",
  },
  {name: "grado", type: "text", placeholder: "Grado"},
  {name: "jornada", type: "text", placeholder: "Jornada"},
  {name: "email", type: "text", placeholder: "Email"},
  {name: "rh", type: "text", placeholder: "RH"},
  {name: "eps", type: "text", placeholder: "EPS"},
  {name: "fechaIngreso", type: "date", placeholder: "Fecha de Ingreso"},
  {name: "fechaRenovacion", type: "date", placeholder: "Fecha de Renovación"},
  {name: "programa", type: "text", placeholder: "Programa"},
  {name: "proceso", type: "text", placeholder: "Proceso"},
];

function CrearEstudiante() {
  const navigate = useNavigate();
  const initialState = {
    nombres: "",
    identificacion: "",
    tipoIdentificacion: "",
    fechaNacimiento: "",
    edad: 0,
    estrato: 0,
    direccion: "",
    barrio: "",
    telefono: "",
    celular: "",
    institucionEducativa: "",
    grado: "",
    jornada: "",
    email: "",
    rh: "",
    eps: "",
    fechaIngreso: "",
    fechaRenovacion: "",
    programa: "",
    processo: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const estudiante = formData;
    try {
      fetch(`${config.baseUrl}/estudiante`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(estudiante),
      })
        .then((response) => response.json())
        .then((data) => {
          navigate("/dashboard/gestionar-estudiantes");
        })
        .catch((error) => {
          console.error("Error:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {} // Lógica de envío del formulario
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    navigate("/dashboard/gestionar-estudiantes");
  };

  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <img
            className="w-auto h-7 sm:h-8"
            src="https://merakiui.com/images/logo.svg"
            alt="Logo"
          />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
          Registrar Estudiante
        </h3>

        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
          Llena los campos para registrar un Estudiante
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3"
        >
          {fieldData.map((field) => (
            <div key={field.name}>
              <label className="block mt-2 text-gray-600 dark:text-gray-400">
                {field.placeholder}
              </label>
              <input
                className="block w-full px-4 py-2 mt-1 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="flex items-center justify-between mt-4">
            <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Registrar Módulo"
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
  );
}

export default CrearEstudiante;
