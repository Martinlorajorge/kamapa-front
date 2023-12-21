import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
	rol: {
		id: number;
		name: string;
		createdAt: string;
		updatedAt: string;
	};
}

interface SessionUser {
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
	rol: {
		id: number;
		name: string;
		createdAt: string;
		updatedAt: string;
	};
}

interface Session {
	user: SessionUser;
	token: string; // Agrega la propiedad token al tipo Session
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
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }) {
			// Nota: token ya se pasa como argumento
			session.user = token.user;
			session.rol = token.rol;
			session.token = token; // Asigna el token al objeto de sesión
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
});

export { handler as GET, handler as POST };
