import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>No autorizado</p>;

  return (
    <div
      style={{
        backgroundColor: user.tipo_usuario === 1 ? "blue" : "white",
        color: user.tipo_usuario === 1 ? "white" : "black",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <h1>Hola {user.name}</h1>
      <p>Tipo de usuario: {user.tipo_usuario}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Home;
