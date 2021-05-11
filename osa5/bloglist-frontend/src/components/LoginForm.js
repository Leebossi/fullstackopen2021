import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username,
      password,
    }

    setUsername('')
    setPassword('')
    dispatch(login(credentials))

  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="username"
            onChange={({ target }) => setUsername(target.value)}
          />

          <Form.Label>password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="password"
            onChange={({ target }) => setPassword(target.value)}
          />

          <Button variant="primary" id="login-button" type="submit">login</Button>
        </Form.Group>
      </form>
    </div>
  )
}

export default LoginForm