import {useState, useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import useAuth from "../hooks/useAuth"; // Importa tu hook useAuth
import {CircularProgress} from "@mui/material";

const AuthLayout = () => {
  const {user} = useAuth();

  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  useEffect(() => {
    // Una vez que el componente se monta, esperamos un breve tiempo para actualizar el estado de carga
    const timeout = setTimeout(() => setLoading(false), 1300);

    // Limpiamos el timeout cuando el componente se desmonta
    return () => clearTimeout(timeout);
  }, []);

  // Si aún se está cargando, mostramos un estado de carga
  if (loading)
    return (
      <div className="flex justify-center mt-20">
        <CircularProgress size={60} color="inherit" />
      </div>
    );

  // Una vez que la carga haya terminado, verificamos el estado de autenticación
  return user ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AuthLayout;
