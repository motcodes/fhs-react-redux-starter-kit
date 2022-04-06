import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { Button } from './button'
import { Input } from './input'
import styles from '../styles/signIn.module.css'
import { useDbUsers } from '../utils/users'
import { useUser } from '../context/userContext'

export const SignUp = () => {
  const navigate = useNavigate()
  const { addUser } = useUser()
  const dbUsers = useDbUsers()

  const validate = ({ name, username, password }) => {
    const errors = {}
    if (!name) {
      errors.name = 'Required'
    }
    if (!username) {
      errors.username = 'Required'
    }
    if (dbUsers.some((user) => user.username === username)) {
      errors.username = 'Username already taken'
    }
    if (!password) {
      errors.password = 'Required'
    }
    return errors
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: ''
    },
    validate,
    validateOnChange: false,
    onSubmit: (formData) => {
      addUser(formData)
      navigate('/money-transactions')
    }
  })

  return (
    <>
      <form className={styles.signinContainer} onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          id="name"
          type="text"
          error={formik.errors.name}
          onChange={formik.handleChange}
          value={formik.values.name}
        />
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
          <Button type="submit">Sign Up</Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
        </div>
      </form>
      <div className={styles.signinContainer}>
        <p>Data:</p>
        <small>(for showing purposes)</small>
        <pre>
          {JSON.stringify(
            {
              name: formik.values.name,
              username: formik.values.username,
              password: formik.values.password
            },
            null,
            2
          )}
        </pre>
      </div>
    </>
  )
}
