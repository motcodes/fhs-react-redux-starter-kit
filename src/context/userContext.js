import React, { createContext, useContext, useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase-config'
import { useDbUsers } from '../utils/users'

const UserContext = createContext()

const userCollectionRef = collection(db, 'user')

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({})

  const value = { currentUser, setCurrentUser }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useDb must be used within a UserProvider')
  }
  const dbUsers = useDbUsers()

  const logOut = () => {
    context.setCurrentUser(null)
    // somehow react routers navigate rendered a blank page
    window.location.href = '/'
  }

  function logIn(user) {
    const currentUser = dbUsers.find((item) => item.username === user.username)
    context.setCurrentUser({
      id: currentUser.id,
      username: currentUser.username,
      name: currentUser.name
    })
  }

  async function addUser(user) {
    try {
      const addedUser = await addDoc(userCollectionRef, user)
      console.log('addedUser :', addedUser)
      context.setCurrentUser({
        id: user.id,
        username: user.username,
        name: user.name
      })
    } catch (error) {
      console.log('Could not sign you in.')
      console.error(error)
    }
  }

  return {
    ...context,
    logIn,
    logOut,
    addUser
  }
}
