'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Nav, Navbar, NavDropdown, FormControl, Button, Form } from 'react-bootstrap'

const links = [
  { label: 'Home', router: '/' },
  { label: 'About', router: '/about' }
];

export function Navigation() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!isDropdownOpen)
  }

  return (
    <Navbar className="navbar navbar-expand-sm navbar-dark" style={{ backgroundColor: 'purple' }}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation"></button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <Nav className="navbar-nav mr-auto mt-2 mt-lg-0">
            {links.map(({ label, router }) => (
              <li className="nav-item" key={router}>
                <Link href={router} className="nav-link">
                  {label}
                </Link>
              </li>
            ))}
            <NavDropdown
              title="Dropdown"
              id="basic-nav-dropdown"
              show={isDropdownOpen}
              onToggle={handleDropdownToggle}
            >
              <Link className="dropdown-item" href="/action1">Accion 1
              </Link>
              <Link className="dropdown-item" href="/action2">Accion 2
              </Link>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2 ml-2" />
          </Form>
            <Button variant="outline-success" className="ml-3 float-md-end">Search</Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}
