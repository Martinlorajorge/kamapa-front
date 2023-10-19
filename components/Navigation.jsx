import Link from 'next/link'

const links = [{
  label: 'Home',
  router: '/'
}, {
  label: 'About',
  router: '/about'
}]

export function Navigation () {
  return (
    <header>
      <nav>
        <ul>
          {links.map(({ label, router }) => (
            <li key={router}>
              <Link href={router}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
