import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import JWT from 'next-auth/jwt';

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

interface AuthUser {
	user: User;
}

interface Session extends User {
	// Interfaz Session declarada una sola vez
	nombre: string;
	rol: Rol;
	password: string;
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
				const user = await res.json();

				if (user.error) {
					throw new Error(user.error);
				}
				console.log(user);

				return user;
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token) {
				const { id, nombre, apellido, rol } = token;

				session.user = {
					id,
					nombre,
					apellido,
					rol,
				};
			}

			return session;
		},
		async JWT({ token, user }: { token: JWT; user: AuthUser }): Promise<any> {
			const userData = user.user;

			const { nombre, apellido, rol } = userData;

			const { password } = userData;

			const payload = {
				nombre,
				apellido,
				rol: rol.name,
				password,
			};

			return JWT.sign(payload);
		},
	},
	pages: {
		signIn: '/login',
	},
});

export { handler as GET, handler as POST };
