'use client'
import React, { Suspense, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation'; // Importa useRouter
import { Navigation } from '../components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '../components/Loading'; // Importa el componente de carga

export default function RootLayout({ children }) {
  const { data: session } = useSession();
  const router = useRouter(); // Agrega esta línea

  useEffect(() => {
    if (session) {
      // Aquí debes definir las rutas permitidas para cada rol
      const allowedRoutes = {
        'admin': ['/dashboard', 
        '/dashboard/admin',
        '/dashboard/admin/vistainstitucion',
        '/dashboard/admin/vistainstitucion/reginstitucion',
        '/dashboard/admin/vistausuario',
        '/dashboard/admin/vistausuario/regempleado'
      ],
        'director': ['/dashboard', '/dashboard/director'],
        'secretario': ['/dashboard', '/dashboard/secretario'],
        'preceptor': ['/dashboard', '/dashboard/preceptor'],
        'docente': ['/dashboard', '/dashboard/docente'],
        'alumno': ['/dashboard', '/dashboard/alumno'],
        // Agrega todos los roles y sus rutas permitidas
      };

      const userRole = session.user?.rol?.name;
      const currentPath = router.pathname; // Usa router.pathname en lugar de window.location.pathname
      if (!allowedRoutes[userRole].includes(currentPath)) {
        router.replace('/dashboard'); // Usa router.replace en lugar de window.location.replace
      }
    }
  }, [session, router]); // Agrega router a la lista de dependencias

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navigation />
        {children}
      </Suspense>
    </>
  );
}
