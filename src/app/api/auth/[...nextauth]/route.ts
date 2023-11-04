import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({

  // Proveedor del servicio
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize (credentials) {
        // const res = await fetch(
        //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
        //   {
        //     method: 'POST',
        //     body: JSON.stringify({
        //       email: credentials?.email,
        //       password: credentials?.password
        //     }),
        //     headers: { 'Content-Type': 'application/json' }
        //   }
        // )
        // const user = await res.json()

        // if (user.error) throw user

        // return user

        if (credentials.email === 'martin@test.com' && credentials.password === '123123') {
          // Usuario provisional autenticado
          const user = {
            id: 1,
            name: 'Martin Lora',
            email: 'martin@test.com',
            password: '123123'
          }

          return user
        } else {
          // Usuario no autorizado
          throw new Error('Credenciales inválidas')
        }
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
      return session
    }
  },
  pages: {
    signIn: '/login'
  }
})

export { handler as GET, handler as POST }
