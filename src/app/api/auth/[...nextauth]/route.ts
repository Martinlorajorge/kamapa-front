import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({

  // Proveedor del servicio
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        dni: { label: 'dni', type: 'text', placeholder: 'Ingresa tu DNI' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
          {
            method: 'POST',
            body: JSON.stringify({
              dni: credentials?.dni,
              password: credentials?.password
            }),
            headers: { 'Content-Type': 'application/json' }
          }
        )
        const user = await res.json()

        if (user.error) {
          throw new Error(user.error) // Mostrar este error en la página de inicio de sesión
        }

        return user

        // if (credentials.email === 'martin@test.com' && credentials.password === '123123') {
        //   // Usuario provisional autenticado
        //   const user = {
        //     id: 1,
        //     name: 'Martin Lora',
        //     email: 'martin@test.com',
        //     password: '123123'
        //   }

        //   return user
        // } else {
        //   // Usuario no autorizado
        //   throw new Error('Credenciales inválidas')
        // }
      }
    })
  ],
  // Nutre de información el usuario y le pasa el token
  callbacks: {
    async jwt ({ token, user }) {
      return ({ ...token, ...user })
    },
    // y aki le da esos datos a la session
    async session ({ session, token, user }) {
      session.user = token
      console.log('session', session)
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }
