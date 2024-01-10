import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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

interface Session {
	user: User;
	expires: string;
	id: number;
	password: string;
	rol: string;
	nombre: string;
	apellido: string;
	dni: string;
	telefono: string;
	legajo: string;
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
				const session = await res.json();

				if (session.error) {
					throw new Error(session.error);
				}

				return session;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = {
					...user, // Acceder a las propiedades directamente
					rol: user.rol,
				};
			}

			return token;
		},

		async session({ session, token }) {
			session.user = token.user.user;
			session.id = token.user.id;
			session.password = token.user.password;
			session.rol = token.user.rol.name;
			session.nombre = token.user.nombre;
			session.apellido = token.user.apellido;
			session.dni = token.user.dni;
			session.telefono = token.user.telefono;
			session.legajo = token.user.legajo;

			console.log(session);
			return session; // La sesión ya está estructurada correctamente
		},
	},
	pages: {
		signIn: '/login',
	},
});

export { handler as GET, handler as POST };
