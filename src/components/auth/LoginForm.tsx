import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import logo31 from '../../assets/logimg/31logo.png';

interface LoginFormProps {
  onToggle: () => void;
  onLoginSuccess: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggle, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem("token", data.token);
      onLoginSuccess(data.token);
      navigate("/home"); // 👉 Redirección al home
    } catch (err: any) {
      setError(err.response?.data?.message || "Error en login");
    }
  };

  const handleFocus = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.classList.add("active");
  };
  const handleBlur = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current && ref.current.value === "") {
      ref.current.classList.remove("active");
    }
  };

  return (
    <form className="sign-in-form" onSubmit={handleSubmit} autoComplete="off">
      <div className="logo">
        <img src={logo31} alt="31-minutos" />
      </div>

      <div className="heading">
        <h2>Bienvenido</h2>
        <h6>¿Aún no tienes cuenta?</h6>
        <a href="#" className="toggle" onClick={(e) => { e.preventDefault(); onToggle(); }}>
          Regístrate
        </a>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input
            type="email"
            className="input-field"
            autoComplete="off"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            ref={emailRef}
            onFocus={() => handleFocus(emailRef)}
            onBlur={() => handleBlur(emailRef)}
          />
          <label>Email</label>
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
            ref={passwordRef}
            onFocus={() => handleFocus(passwordRef)}
            onBlur={() => handleBlur(passwordRef)}
          />
          <label>Contraseña</label>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input type="submit" value="Iniciar" className="sign-btn" />

        <p className="text">
          ¿Olvidaste tu Contraseña? <a href="#">Te ayudamos</a> a recuperarla.
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
