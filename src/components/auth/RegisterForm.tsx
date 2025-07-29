import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

type RegisterFormProps = {
  onSwitchToLogin: () => void;
};

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      await register(name, email, password);
      setSuccessMessage('Registro exitoso. Ahora puedes iniciar sesión.');
      // Si quieres automáticamente cambiar al login tras registro exitoso:
      // onSwitchToLogin();
    } catch (err) {
      setError('Error al registrarse. Intenta nuevamente.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="sign-up-form" autoComplete="off">
      <div className="logo">
        <img src="/src/assets/logimg/31logo.png" alt="Logo" />
      </div>

      <div className="heading">
        <h2>Regístrate</h2>
        <h6>¿Ya posees una cuenta?</h6>
        <button
          type="button"
          className="toggle"
          onClick={onSwitchToLogin}
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', padding: 0 }}
        >
          Inicia sesión
        </button>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input
            type="text"
            className="input-field"
            required
            minLength={4}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Nombre</label>
        </div>

        <div className="input-wrap">
          <input
            type="email"
            className="input-field"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Correo</label>
        </div>

        <div className="input-wrap">
          <input
            type="password"
            className="input-field"
            required
            minLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>Contraseña</label>
        </div>

        <input type="submit" value="Registrar" className="sign-btn" />

        {error && <p className="text" style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p className="text" style={{ color: 'green' }}>{successMessage}</p>}

        <p className="text">
          Al registrarte aceptas nuestros <a href="#">Términos y servicio</a> y{' '}
          <a href="#">Políticas de privacidad</a>
        </p>
      </div>
    </form>
  );
}
