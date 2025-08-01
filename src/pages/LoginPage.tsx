import { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import LoginCarousel from '../components/auth/LoginCarousel';

import "../styles/login.css";
import "../styles/loginback.css";


export default function LoginPage() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <main className={isSignUp ? 'sign-up-mode' : ''}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            {isSignUp ? (
              <RegisterForm onToggle={() => setIsSignUp(false)} />
            ) : (
              <LoginForm onToggle={() => setIsSignUp(true)} />
            )}
          </div>
          <LoginCarousel />
        </div>
      </div>
    </main>
  );
}