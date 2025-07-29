import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

type LoginFormProps = {
  onSwitchToRegister: () => void;
};

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      await login(email, password);
      setSuccessMessage('Has iniciado sesión correctamente.');
      // Aquí puedes redirigir o lo que necesites hacer tras login exitoso
    } catch (err) {
      setError('Error al iniciar sesión. Verifica tus datos.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sign-in-form" autoComplete="off">
      <div className="logo">
        <img src="/src/assets/logimg/31logo.png" alt="Logo" />
      </div>

      <div className="heading">
        <h2>Bienvenido</h2>
        <h6>¿Aun no tienes cuenta?</h6>
        <button
          type="button"
          className="toggle"
          onClick={onSwitchToRegister}
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', padding: 0 }}
        >
          Regístrate
        </button>
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
          />
          <label>Email</label>
        </div>

        <div className="input-wrap">
          <input
            type="password"
            className="input-field"
            autoComplete="off"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Contraseña</label>
        </div>

        <input type="submit" value="Iniciar" className="sign-btn" />

        {error && <p className="text" style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p className="text" style={{ color: 'green' }}>{successMessage}</p>}

        <p className="text">
          ¿Olvidaste tu Contraseña? <a href="#">Te ayudamos</a> a recuperarla.
        </p>
      </div>
    </form>
  );
}
