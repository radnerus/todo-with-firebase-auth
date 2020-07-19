import React, { FormEvent, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { signUpUser, signIn } from '../firebase/firestore/auth';

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const url = useRouteMatch();
  const isLogin = url.path === '/login';
  const pageAction = isLogin ? 'Login' : 'SignUp';
  console.log(url.path);
  const authenticate = async (event: FormEvent) => {
    event.preventDefault();

    console.log('submit');
    try {
      if (!isLogin) {
        const user = await signUpUser(displayName, email, password);
        console.log(user);
        // reset();
      } else {
        const user = await signIn(email, password);
        console.log(user);
        reset();
      }
    } catch (error) {}
  };

  const reset = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="login">
      <h1>{pageAction} Page</h1>
      <form className="login-form" onSubmit={authenticate}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{pageAction}</button>
        <Link to={isLogin ? '/signup' : '/login'}>
          {isLogin ? 'New User? SignUp.' : 'Already registered? Login.'}
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
