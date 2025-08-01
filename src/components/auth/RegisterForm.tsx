import React, { useState, useRef, useEffect } from "react";
import { register } from "../../services/authService";
import { fetchTiposUsuario } from "../../services/catalogService";
import type { TipoUsuario } from "../../services/catalogService";
import logo31 from '../../assets/logimg/31logo.png';

interface RegisterFormProps {
  onToggle: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onToggle }) => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");  // <-- reintegrado email
  const [password, setPassword] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState<number | "">("");
  const [tiposUsuario, setTiposUsuario] = useState<TipoUsuario[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const refs = {
    nombreRef: useRef<HTMLInputElement>(null),
    correoRef: useRef<HTMLInputElement>(null),
    passwordRef: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    const loadTiposUsuario = async () => {
      try {
        const data = await fetchTiposUsuario();
        setTiposUsuario(data);
      } catch {
        setError("Error cargando tipos de usuario");
      }
    };
    loadTiposUsuario();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!tipoUsuario) {
      setError("Debe seleccionar un tipo de usuario");
      return;
    }

    try {
      await register(nombre, correo, password, tipoUsuario);
      setSuccess("Registro exitoso, por favor inicia sesión.");
      setNombre("");
      setCorreo("");
      setPassword("");
      setTipoUsuario("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error en registro");
    }
  };

  const handleFocus = (ref: React.RefObject<HTMLInputElement | HTMLSelectElement>) => {
    ref.current?.classList.add("active");
  };
  const handleBlur = (ref: React.RefObject<HTMLInputElement | HTMLSelectElement>) => {
    if (ref.current && ref.current.value === "") {
      ref.current.classList.remove("active");
    }
  };

  // Creamos ref para el select tipoUsuario para animaciones igual
  const tipoUsuarioRef = useRef<HTMLSelectElement>(null);

  return (
    <form className="sign-up-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="logo">
        <img src={logo31} alt="31-minutos" />
      </div>

      <div className="heading">
        <h2>Regístrate</h2>
        <h6>¿Ya posees una cuenta?</h6>
        <a
          href="#"
          className="toggle"
          onClick={(e) => {
            e.preventDefault();
            onToggle();
          }}
        >
          Inicia sesión
        </a>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input
            type="text"
            minLength={4}
            className="input-field"
            autoComplete="off"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            ref={refs.nombreRef}
            onFocus={() => handleFocus(refs.nombreRef)}
            onBlur={() => handleBlur(refs.nombreRef)}
          />
          <label>Nombre</label>
        </div>

    

        <div className="input-wrap">
          <input
            type="email"
            className="input-field"
            autoComplete="off"
            required
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            ref={refs.correoRef}
            onFocus={() => handleFocus(refs.correoRef)}
            onBlur={() => handleBlur(refs.correoRef)}
          />
          <label>Correo</label>
        </div>

        <div className="input-wrap">
          <input
            type="password"
            minLength={4}
            className="input-field"
            autoComplete="off"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={refs.passwordRef}
            onFocus={() => handleFocus(refs.passwordRef)}
            onBlur={() => handleBlur(refs.passwordRef)}
          />
          <label>Contraseña</label>
        </div>

        <div className="input-wrap">
          <select
            className="input-field"
            ref={tipoUsuarioRef}
            required
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(Number(e.target.value))}
            onFocus={() => handleFocus(tipoUsuarioRef)}
            onBlur={() => handleBlur(tipoUsuarioRef)}
          >
            <option value="" disabled>
              Selecciona un tipo de usuario
            </option>
            {tiposUsuario.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.tipo_usuario}
              </option>
            ))}
          </select>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <input type="submit" value="Registrar" className="sign-btn" />

        <p className="text">
          Al registrarte aceptas nuestros{" "}
          <a href="#">Términos y servicio</a> y{" "}
          <a href="#">Políticas de privacidad</a>
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;
