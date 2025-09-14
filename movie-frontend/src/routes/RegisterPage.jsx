import { useState } from 'react';
import { useRegisterMutation } from '../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [username, setUsername] = useState(''); const [email, setEmail] = useState(''); const [password, setPassword] = useState('');
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials(res.data));
      navigate('/');
    } catch {
      alert('Registration failed');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Create account</h2>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <button disabled={isLoading}>{isLoading ? 'Creating...' : 'Register'}</button>
    </form>
  );
}
