import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from './next';

const checkRoleMiddleware = async (
	req: NextApiRequest,
	res: NextApiResponse,
	next,
) => {
	try {
		const session = await getSession({ req });

		if (!session) {
			return res.redirect('/login'); // Redirige si no hay sesión
		}

		// Aquí puedes acceder al rol del usuario desde session.user.rol
		const userRole = session.user.rol;

		// Definir las rutas permitidas para cada rol
		const allowedRoutes = {
			admin: ['/dashboard/admin', '/dashboard/common'],
			director: ['/dashboard/director', '/dashboard/common'],
			secretario: ['/dashboard/secretario', '/dashboard/common'],
			preceptor: ['/dashboard/preceptor', '/dashboard/common'],
			docente: ['/dashboard/docente', '/dashboard/common'],
			alumno: ['/dashboard/alumno', '/dashboard/common'],
		};

		// Obtener la ruta actual
		const currentPath = req.url;

		// Verificar si el rol del usuario tiene acceso a la ruta actual
		if (!allowedRoutes[userRole].includes(currentPath)) {
			return res.redirect('/unauthorized'); // Redirige a una página de no autorizado si no tiene acceso
		}

		// Si el usuario tiene acceso, continúa con el siguiente middleware o página
		return next();
	} catch (error) {
		console.error('Error en el middleware:', error);
		return res.status(500).end('Error interno del servidor');
	}
};

export default checkRoleMiddleware;
