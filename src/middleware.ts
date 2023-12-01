export { default } from 'next-auth/middleware';

export const config = {
	matcher: ['/dashboard/:path*'],
};
// import { NextApiResponse, NextApiRequest } from 'next';
// import { getSession } from 'next-auth/react';
// import { NextResponse } from 'next/server';

// // Define los roles y sus permisos
// const roles = {
// 	admin: ['/dashboard/*'], // El admin puede acceder a todas las rutas de /dashboard
// 	director: ['/dashboard/reports', '/dashboard/overview'], // El director puede acceder a /dashboard/reports y /dashboard/overview
// 	secretario: ['/dashboard/attendance'], // El secretario puede acceder a /dashboard/attendance
// 	preceptor: ['/dashboard/students'], // El preceptor puede acceder a /dashboard/students
// 	docente: ['/dashboard/classes'], // El docente puede acceder a /dashboard/classes
// 	alumno: ['/dashboard/profile'], // El alumno puede acceder a /dashboard/profile
// 	// Agrega más roles y permisos según sea necesario
// };

// export default async function handler(
// 	req: NextApiRequest,
// 	res: NextApiResponse,
// 	next,
// ) {
// 	const session = await getSession({ req });

// 	if (session) {
// 		const userRole = session.user.rol;
// 		const userPermissions = roles[userRole];

// 		if (userPermissions && userPermissions.includes(req.url)) {
// 			// Si el usuario tiene permiso para acceder a la ruta, pasa al siguiente middleware
// 			next();
// 		} else {
// 			// Si el usuario no tiene permiso para acceder a la ruta, devuelve un error
// 			return NextResponse.error(403, 'Acceso denegado');
// 		}
// 	} else {
// 		return NextResponse.error(401, 'No autenticado');
// 	}
// }
