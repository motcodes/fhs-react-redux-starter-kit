import React, { createContext, useContext, useState } from 'react'
import { BaseUrl, fetcher, useFetch } from '../utils/fetcher'

const UserContext = createContext()

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
  const dbUsers = useFetch(BaseUrl + '/user')

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
      const addedUser = fetcher(BaseUrl + '/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
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
