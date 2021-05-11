import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Menu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            BLOGS
          </Nav.Link>
          <Nav.Link as={Link} to="/users">
            USERS
          </Nav.Link>
        </Nav>
        <div className="d-flex justify-content-end">
          <Nav.Link href="#" disabled>
            logged in as {user.name}
          </Nav.Link>
          <Button variant="outline-danger" onClick={() => dispatch(logout())}>logout</Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Menu