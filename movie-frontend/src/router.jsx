import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './routes/HomePage';
import MoviesPage from './routes/MoviesPage';
import MovieDetailPage from './routes/MovieDetailPage';
import ProfilePage from './routes/ProfilePage';
import LoginPage from './routes/LoginPage';
import RegisterPage from './routes/RegisterPage';
import ErrorPage from './routes/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'movies', element: <MoviesPage /> },
      { path: 'movies/:id', element: <MovieDetailPage /> },
      { path: 'profile/:id', element: <ProfilePage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
    ],
  },
]);
