import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from './features/auth/authApi';
import { logout } from './features/auth/authSlice';

export default function App() {
  const auth = useSelector((s) => s.auth);
  const [doLogout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = async () => {
    try { await doLogout().unwrap(); } catch {}
    dispatch(logout());
    navigate('/');
  };

  return (
    <div>
      <header className="nav">
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        {auth.user ? (
          <>
            <Link to={`/profile/${auth.user.id}`}>{auth.user.username}</Link>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
