'use client'
import Link from 'next/link'
export default function vistainstPage () {
  return (
    <Link
      href='/dashboard/admin/vistainstitucion/reginstitucion'
      variant='flat'
      type='submit'
      style={{
        textDecoration: 'none',
        backgroundColor: 'purple',
        color: 'white',
        padding: '0.4rem 1rem',
        fontSize: '1rem',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'white'
        e.currentTarget.style.color = 'black'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'purple'
        e.currentTarget.style.color = 'white'
      }}
    >
      Nueva Institucion
    </Link>
  )
}
