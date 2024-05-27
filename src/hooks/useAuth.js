import {useState, useEffect} from "react";

// perfil: authUser, AuthClient

const useAuth = () => {
  // Estado para almacenar la información del usuario
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  // Comprobamos si el usuario está autenticado al cargar el componente
  useEffect(() => {
    const checkAuthentication = () => {
      // Comprobamos si hay un usuario autenticado en el localStorage
      const agenteJSON = localStorage.getItem("usuario");

      //parseamos la info del usuario
      const agente = JSON.parse(agenteJSON);

      // Si hay un usuario, establecemos el estado del usuario con esa información
      setUser(agente ? agente : null);

      setTimeout(() => setLoading(false), 1000);
    };

    checkAuthentication();
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    localStorage.setItem("usuario", JSON.stringify(userData));
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('usuario');
    setUser(null);
  };

  // Devolvemos la información del usuario y las funciones de inicio y cierre de sesión
  return {
    user,
    loading,
    login,
    logout,
  };
};

export default useAuth;
