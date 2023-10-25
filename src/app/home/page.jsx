'use client'
import { useSession } from 'next-auth/react'
import Loading from '../components/Loading'

const Dashboard = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <Loading />
  }
  console.log(session)

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>
        <code>{JSON.stringify(session, null, 2)}</code>
      </pre>
    </div>
  )
}
export default Dashboard
