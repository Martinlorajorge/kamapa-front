import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const withRoleRedirect = (WrappedComponent, allowedRoutes) => {
  return (props) => {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (session) {
        const userRole = session.user?.rol?.name;
        const currentPath = window.location.pathname;
        if (!allowedRoutes[userRole].includes(currentPath)) {
          window.location.replace('/dashboard');
        }
      }
    }, [session]);

    // Si el estado de la página está cargando, muestra un componente de carga
    // if (status === 'loading') {
    //   return <Loading />;
    // }

    // Si no hay sesión, redirige a la página de inicio de sesión
    if (!session) {
      window.location.replace('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withRoleRedirect;
