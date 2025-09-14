import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

export default function ErrorPage() {
  const err = useRouteError();
  if (isRouteErrorResponse(err)) return <div><h2>Error</h2><p>{err.status} {err.statusText}</p></div>;
  return <div><h2>Something went wrong</h2></div>;
}
