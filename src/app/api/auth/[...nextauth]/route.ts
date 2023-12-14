import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
	// Proveedor del servicio
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
				// Aquí viene el usuario del servidor
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
					throw new Error(user.error); // Mostrar este error en la página de inicio de sesión
				}

				console.log(user);
				return user;
			},
		}),
	],
	// Nutre de información el usuario y le pasa el token
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		// y aki le da esos datos a la session
		async session({ session, token, user }) {
			session.user = {
				...token,
				...user,
			};
			console.log('session', session);
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
});

export { handler as GET, handler as POST };
