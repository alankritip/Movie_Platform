import { useState } from 'react';
import { useLoginMutation, useMeQuery } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const { refetch } = useMeQuery(undefined, { skip: true });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res.data));
      await refetch();
      navigate('/');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Login</h2>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button disabled={isLoading}>{isLoading ? 'Signing in...' : 'Login'}</button>
    </form>
  );
}
