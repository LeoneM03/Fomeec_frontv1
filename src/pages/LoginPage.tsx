import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

import '../styles/login.css';
import '../styles/loginback.css';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSwitchToRegister = () => setIsLogin(false);
  const handleSwitchToLogin = () => setIsLogin(true);

  return (
    <main className={`login ${isLogin ? '' : 'sign-up-mode'}`}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            {isLogin ? (
              <LoginForm onSwitchToRegister={handleSwitchToRegister} />
            ) : (
              <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
            )}
          </div>

      
        </div>
      </div>
    </main>
  );
}
