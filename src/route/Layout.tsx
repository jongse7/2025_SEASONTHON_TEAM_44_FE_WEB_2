import { OverlayProvider } from 'overlay-kit';
import { Navigate, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="max-w-[768px] mx-auto flex justify-items-center scrollbar-hide">
      <OverlayProvider>
        <Outlet />
      </OverlayProvider>
    </div>
  );
}

export function ProtectedRoute() {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export function PublicRoute() {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return <Navigate to="/main" replace />;
  }
  return <Outlet />;
}

export function NotFoundRoute() {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return <Navigate to="/main" replace />;
  }
  return <Navigate to="/login" replace />;
}
