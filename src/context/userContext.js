import React, { createContext, useContext, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})

  const value = { currentUser, setCurrentUser }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  const navigate = useNavigate()
  if (context === undefined) {
    throw new Error('useDb must be used within a UserProvider')
  }

  const logOut = () => {
    context.setCurrentUser(null)
    // somehow react routers navigate rendered a blank page
    window.location.href = '/'
  }

  async function logIn(user) {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )

    const loggedInUser = await getDoc(doc(db, 'user', userCredentials.user.uid))
    const { name } = loggedInUser.data()
    context.setCurrentUser({
      id: loggedInUser.id,
      email: loggedInUser.email,
      name: name
    })
    navigate('/money-transactions')
  }

  async function sessionLogin(user) {
    const loggedInUser = await getDoc(doc(db, 'user', user.uid))
    const { name } = loggedInUser.data()
    context.setCurrentUser({
      id: loggedInUser.id,
      email: loggedInUser.email,
      name: name
    })
    navigate('/money-transactions')
  }

  async function addUser(user) {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      )

      const uid = userCredentials.user.uid

      const addedUser = await setDoc(doc(db, 'user', uid), { name: user.name })
      console.log('addedUser :', addedUser)
      context.setCurrentUser({
        id: user.id,
        username: user.email,
        name: user.name
      })
      navigate('/money-transactions')
    } catch (error) {
      console.log('Could not sign you in.')
      console.error(error)
    }
  }

  return {
    ...context,
    logIn,
    logOut,
    addUser,
    sessionLogin
  }
}
