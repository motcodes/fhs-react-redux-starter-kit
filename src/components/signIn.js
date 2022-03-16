import React, { useState } from 'react'
import { Button } from './button'
import { Input } from './input'

import styles from '../styles/signIn.module.css'

export const SignIn = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, toggleSubmit] = useState(false)
  return (
    <>
      <form
        className={styles.signinContainer}
        onSubmit={(e) => {
          e.preventDefault()
          toggleSubmit(!isSubmitted)
        }}
      >
        <Input
          name="Username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          name="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <div className={styles.buttonGroup}>
          <Button type="submit">Sign In</Button>
          <Button type="submit" variant="secondary">
            Sign Up
          </Button>
        </div>
      </form>
      <div className={styles.signinContainer}>
        <p>Data:</p>
        <small>(for showing purposes)</small>
        <pre>
          {JSON.stringify(
            {
              username,
              password,
              isSubmitted
            },
            null,
            2
          )}
        </pre>
      </div>
    </>
  )
}
