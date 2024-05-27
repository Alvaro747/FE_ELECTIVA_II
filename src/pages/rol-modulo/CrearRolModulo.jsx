import {CircularProgress, MenuItem, Select} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function CrearRolModulo() {
  const navigate = useNavigate();
  const {user, login} = useAuth();

  const [rol, setRol] = useState("");
  const [modulo, setModulo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [listModulo, setListModulo] = useState([]);
  const [listRol, setListRol] = useState([]);

  useEffect(() => {
    fetchModulo();
    fetchRol();
  }, []);

  const fetchModulo = async () => {
    try {
      const response = await fetch("http://localhost:3000/modulo");
      const data = await response.json();
      setListModulo(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchRol = async () => {
    try {
      const response = await fetch("http://localhost:3000/rol");
      const data = await response.json();
      setListRol(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const rolModulo = {rol: {id: rol}, modulo: {id: modulo}};

      const response = await fetch("http://localhost:3000/rolmodulo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rolModulo),
      });

      await handleUpdateModulos();
      location.reload();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateModulos = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/modulorol/rol/${rol}`
      );
      const data = await response.json();
      const getModulos = data.data.map((item) => item.modulo);
      user.modulos = getModulos;
      login(user);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancelBtn = (e) => {
    e.preventDefault();
    navigate("/dashboard/modulo");
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
            Registrar Rol Módulo
          </h3>

          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Selecciona el rol y el módulo
          </p>

          <form>
            <div className="w-full mt-4">
              <label htmlFor="rol"> Rol</label>
              <Select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                className="block w-full px-4  mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {listRol?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="w-full mt-4">
              <label htmlFor="modulo"> Módulo</label>
              <Select
                value={modulo}
                onChange={(e) => setModulo(e.target.value)}
                className="block w-full px-4  mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              >
                {listModulo?.map((item, index) => (
                  <MenuItem key={index} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                {isLoading ? (
                  <CircularProgress size={20} color="inherit" />
                ) : (
                  "Registrar Rol Módulo"
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

export default CrearRolModulo;
