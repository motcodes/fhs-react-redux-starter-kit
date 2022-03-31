import React from 'react'
import { Button } from './button'
import { Input } from './input'

import styles from '../styles/signIn.module.css'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useDb } from '../context/db'

export const SignIn = () => {
  const navigate = useNavigate()
  const { dbData, logIn } = useDb()

  const validate = ({ username, password }) => {
    const errors = {}
    const foundUser = dbData.user.find(
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
