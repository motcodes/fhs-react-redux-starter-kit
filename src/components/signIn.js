import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'

import { Button } from './button'
import { Input } from './input'
import { useUser } from '../context/userContext'
import styles from '../styles/signIn.module.css'

export const SignIn = () => {
  const navigate = useNavigate()
  const { logIn } = useUser()

  const validate = ({ email, password }) => {
    const errors = {}
    return errors
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate,
    validateOnChange: false,
    onSubmit: (user) => {
      logIn(user)
    }
  })

  return (
    <>
      <form className={styles.signinContainer} onSubmit={formik.handleSubmit}>
        <Input
          name="email"
          id="email"
          type="text"
          error={formik.errors.email}
          onChange={formik.handleChange}
          value={formik.values.email}
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
