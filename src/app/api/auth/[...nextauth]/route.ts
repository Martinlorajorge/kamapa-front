import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import jwt from 'jsonwebtoken';

interface Rol {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
}

interface User {
	id: number;
	legajo: string;
	fecha_ingreso: string;
	fecha_egreso: string | null;
	nombre: string;
	apellido: string;
	dni: string;
	cuil: string;
	fechaNacimiento: string;
	telefono: string;
	is_active: boolean;
	create_for: string;
	update_for: string;
	password: string;
	createdAt: string;
	updatedAt: string;
	domicilioId: number;
	contactoId: number;
	rolId: number;
	rol: Rol;
}

interface AuthResponse {
	user: User;
	rol: Rol;
	error?: string; // Asegúrate de ajustar esto según la estructura real de tu respuesta
}

const handler = NextAuth({
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				dni: { label: 'dni', type: 'text', placeholder: 'Ingresa tu DNI' },
				password: {
					label: 'Password',
					type: 'password',
					autocomplete: 'current-password',
				},
			},
			async authorize(credentials) {
				try {
					const res = await fetch(
						`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
						{
							method: 'POST',
							body: JSON.stringify({
								dni: credentials?.dni,
								password: credentials?.password,
							}),
							headers: { 'Content-Type': 'application/json' },
						},
					);

					if (!res.ok) {
						throw new Error(
							`Error en la solicitud: ${res.status} ${res.statusText}`,
						);
					}

					const data: AuthResponse = await res.json();

					if (data.error) {
						throw new Error(data.error);
					}

					const { user, rol } = data;

					// Modifica el proceso de firma del token según tus necesidades
					const signedToken = customSignToken(
						user,
						rol,
						process.env.NEXTAUTH_SECRET,
					);
					console.log('Signed Token:', signedToken);
					console.log(data);
					return data;
				} catch (error) {
					console.error('Error en la función authorize:', error);
					throw error;
				}
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token.user && token.rol) {
				session.user = {
					...token.data.user,
					rol: token.data.rol.name,
				};
			}
			console.log(session);
			return session;
		},
	},
	async jwt(token, user) {
		if (user) {
			token.user = user;
		}
		return token;
	},
	pages: {
		signIn: '/login',
	},
});

export { handler as GET, handler as POST };

// Función personalizada para firmar el token
function customSignToken(
	user: User,
	rol: Rol,
	secret: string | undefined,
): string {
	if (!secret) {
		throw new Error('NEXTAUTH_SECRET not defined in environment variables.');
	}

	const payload = {
		nombre: user.nombre,
		apellido: user.apellido,
		rol: rol.name,
		password: user.password,
	};

	// Realiza aquí cualquier modificación o personalización necesaria en la firma del token
	const signedToken = jwt.sign(payload, secret);

	return signedToken;
}
