export { default } from 'next-auth/middleware'

export const config = {
  matcher: ['/dashboard/:path*']
 }
// import { getSession } from 'next-auth/react';
// import { NextApiRequest, NextApiResponse } from 'next';

// const checkRoleMiddleware = async (
//   req: NextApiRequest,
//   res: NextApiResponse,
//   next
// ) => {
//   try {
//     const session = await getSession({ req });

//     // Si no hay sesión, redirigir al usuario al inicio de sesión
//     if (!session) {
//       res.writeHead(302, {
//         Location: '/login',
//       });
//       res.end();
//       return;
//     }

//     const userRole = session?.user?.rol?.name;
//     const allowedRoutes = getRoleRoutes(userRole);

//     // Verificar si la ruta actual está permitida para el rol
//     if (isRouteAllowed(req.url, allowedRoutes)) {
//       return next();
//     } else {
//       // Si intenta acceder a una ruta no permitida, redirigirlo a '/unauthorized'
//       res.writeHead(302, {
//         Location: '/unauthorized',
//       });
//       res.end();
//     }
//   } catch (error) {
//     console.error('Error en el middleware:', error);
//     // Puedes manejar otros errores aquí si es necesario

//     // Redirigir al usuario al inicio de sesión en caso de error
//     res.writeHead(302, {
//       Location: '/login',
//     });
//     res.end();
//   }
// };

// const getRoleRoutes = (userRole) => {
//   // Configurar las rutas permitidas para cada rol
//   const roleRoutesConfig = {
//     admin: ['/dashboard/admin', '/dashboard/vistainstitucion', 'reginstitucion', 'vistausuarios', 'regempleado'],
//     director: ['/dashboard/director', '/dashboard/common'],
//     secretario: ['/dashboard/secretario', '/dashboard/common'],
//     preceptor: ['/dashboard/preceptor', '/dashboard/common'],
//     docente: ['/dashboard/docente', '/dashboard/common'],
//     alumno: ['/dashboard/alumno', '/dashboard/common'],
//   };

//   return roleRoutesConfig[userRole] || [];
// };

// const isRouteAllowed = (currentRoute, allowedRoutes) => {
//   return allowedRoutes.some((allowedRoute) => currentRoute.startsWith(allowedRoute));
// };

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default checkRoleMiddleware;
