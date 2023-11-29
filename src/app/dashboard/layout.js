'use client';
import React, { Suspense, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Navigation } from '../components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loading from '../components/Loading'; // Importa el componente de carga

export default function RootLayout({ children }) {
  const { data: session } = useSession();

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
      const currentPath = window.location.pathname;
      if (!allowedRoutes[userRole].includes(currentPath)) {
        window.location.replace('/dashboard');
      }
    }
  }, [session]);

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Navigation />
        {children}
      </Suspense>
    </>
  );
}
