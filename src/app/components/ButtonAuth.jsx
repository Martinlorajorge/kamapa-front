'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
import Loading from './Loading'

export default function ButtonAuth () {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Loading />
  }

  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.email}</p>
        <button onClick={() => signOut()} className='btn btn-danger'>
          Sign out
        </button>
      </>
    )
  }

  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()} className='btn btn-primary'>
        Sign in
      </button>
    </>
  )
}
