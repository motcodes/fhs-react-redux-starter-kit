import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import { Button } from './button'
import { Input } from './input'
import { useUser } from '../context/userContext'
import { useDbUsers } from '../utils/users'
import styles from '../styles/signIn.module.css'

export const SignIn = () => {
  const navigate = useNavigate()
  const { logIn } = useUser()
  const dbUsers = useDbUsers()

  const validate = ({ username, password }) => {
    const errors = {}
    const foundUser = dbUsers.find(
      (user) => user.username === username && user.password === password
    )
    if (!foundUser) {
      errors.username = "doesn't match user"
      errors.password = "doesn't match user"
    }
    return errors
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validate,
    validateOnChange: false,
    onSubmit: (user) => {
      logIn(user)
      navigate('/money-transactions')
    }
  })

  return (
    <>
      <form className={styles.signinContainer} onSubmit={formik.handleSubmit}>
        <Input
          name="username"
          id="username"
          type="text"
          error={formik.errors.username}
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <Input
          name="password"
          id="password"
          type="password"
          error={formik.errors.password}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <div className={styles.buttonGroup}>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/sign-up')}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </>
  )
}
