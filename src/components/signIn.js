import React, { useState } from 'react'
import { Button } from './button'
import { Input } from './input'

import styles from '../styles/signIn.module.css'

export const SignIn = () => {
  const [username, setUsername] = useState({ value: '', isError: false })
  const [password, setPassword] = useState({ value: '', isError: false })
  const [isSubmitted, toggleSubmit] = useState(false)
  return (
    <>
      <form
        className={styles.signinContainer}
        onSubmit={(e) => {
          e.preventDefault()
          if (!username.value) {
            setUsername((prev) => ({ ...prev, isError: true }))
          } else {
            setUsername((prev) => ({ ...prev, isError: false }))
          }
          if (!password.value) {
            setPassword((prev) => ({ ...prev, isError: true }))
          } else {
            setPassword((prev) => ({ ...prev, isError: false }))
          }

          toggleSubmit(!isSubmitted)
        }}
      >
        <Input
          name="Username"
          id="username"
          value={username.value}
          isError={username.isError}
          onChange={(e) =>
            setUsername((prev) => ({ ...prev, value: e.target.value }))
          }
        />
        <Input
          name="Password"
          id="password"
          type="password"
          value={password.value}
          isError={password.isError}
          onChange={(e) =>
            setPassword((prev) => ({ ...prev, value: e.target.value }))
          }
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
