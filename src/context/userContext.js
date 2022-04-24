import React, { createContext, useContext, useState } from 'react'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const UserContext = createContext()

// outsourced reoccurring function
const getUserRef = (uid) => doc(db, 'user', uid)
const getUserDoc = (uid) => getDoc(getUserRef(uid))

// User Provider
export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})

  const value = { currentUser, setCurrentUser }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// User Hook
export function useUser() {
  const context = useContext(UserContext)

  if (context === undefined) {
    throw new Error('useDb must be used within a UserProvider')
  }

  const navigate = useNavigate()

  const logOut = () => {
    try {
      signOut(auth)
      context.setCurrentUser(null)
      // somehow react routers navigate rendered a blank page
      window.location.href = '/'
    } catch {
      console.error('could not sign you out')
    }
  }

  async function logIn(user) {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    )

    const loggedInUser = await getUserDoc(userCredentials.user.uid)
    const { name } = loggedInUser.data()

    context.setCurrentUser({
      id: loggedInUser.id,
      email: userCredentials.user.email,
      name: name
    })
    navigate('/money-transactions')
  }

  async function sessionLogin(user) {
    try {
      const loggedInUser = await getUserDoc(user.uid)
      const { name } = loggedInUser.data()
      context.setCurrentUser({
        id: loggedInUser.id,
        email: loggedInUser.email,
        name: name
      })
      navigate('/money-transactions')
    } catch {
      console.log("couldn't auto login in")
      navigate('/sign-in')
    }
  }

  async function addUser(user) {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      )

      const addedUser = await setDoc(getUserRef(userCredentials.user.uid), {
        name: user.name
      })
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
