import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fakeAuth } from '../auth/authService';
import Input from '../components/Input';
import Button from '../components/Button';
import styles from '../styles/App.module.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [darkMode] = useState(localStorage.getItem('darkMode') === 'true'); // for dark mode

  const handleLogin = () => {
    const success = fakeAuth.login(credentials.username, credentials.password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className={darkMode ? styles.darkLoginContainer : styles.loginContainer}>
      <h2>Login</h2>
      {error && <p className={styles.loginError}>{error}</p>}
      <Input
        placeholder="Username"
        value={credentials.username}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <Input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default Login;
