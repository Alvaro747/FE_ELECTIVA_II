import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
//import AuthLayout from "./layouts/AuthLayout";
import {
  CrearCurso,
  Dashboard,
  Login,
  MatriculaUser,
  NotFound,
  VerCursos,
  VerEstudiantes,
  VerUsuarioRol,
  Welcome,
} from "./pages";
import AuthLayout from "./layout/AuthLayout";
import VerSede from "./pages/sede/VerSede";
import CrearModulo from "./pages/modulo/CrearModulo";
import VerModulo from "./pages/modulo/VerModulo";
import CrearRolModulo from "./pages/rol-modulo/CrearRolModulo";
import VerRolModulo from "./pages/rol-modulo/VerRolModulo";
import CrearEstudiante from "./pages/estudiantes/CrearEstudiante";
import VerAcudiente from "./pages/acudiente/VerAcudiente";
import CrearAcudiente from "./pages/acudiente/CrearAcudiente";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={"/dashboard"} />} />

        <Route element={<AuthLayout />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Welcome />} />
            <Route path="matricular-estudiantes" element={<MatriculaUser />} />
            <Route path="crear-cursos" element={<CrearCurso />} />
            <Route path="ver-cursos" element={<VerCursos />} />
            <Route path="usuarios-roles" element={<VerUsuarioRol />} />
            <Route path="gestionar-estudiantes" element={<VerEstudiantes />} />
            <Route path="crear-estudiante" element={<CrearEstudiante />} />
            <Route path="sede" element={<VerSede />} />
            <Route path="crear-modulo" element={<CrearModulo />} />
            <Route path="modulo" element={<VerModulo />} />
            <Route path="crear-rol-modulo" element={<CrearRolModulo />} />
            <Route path="rol-modulo" element={<VerRolModulo />} />
            <Route path="acudiente" element={<VerAcudiente />} />
            <Route path="crear-acudiente" element={<CrearAcudiente />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
