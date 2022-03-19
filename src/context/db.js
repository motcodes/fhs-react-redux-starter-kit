import React, { createContext, useContext, useState } from 'react'
import { db } from './data'

const DbContext = createContext()

export function DbProvider({ children }) {
  const [dbData, setDbData] = useState(db)

  const value = { dbData, setDbData }
  return <DbContext.Provider value={value}>{children}</DbContext.Provider>
}

export function useDb() {
  const context = useContext(DbContext)
  if (context === undefined) {
    throw new Error('useDb must be used within a DbProvider')
  }
  function logOut() {
    context.setDbData(({ currentUser, ...rest }) => ({
      ...rest,
      currentUser: null
    }))
  }

  function logIn(user) {
    const currentUser = context.dbData.user.find(
      (item) => item.username === user.username
    )
    context.setDbData((prev) => ({
      ...prev,
      currentUser: {
        id: currentUser.id,
        username: currentUser.username,
        name: currentUser.name
      }
    }))
  }
  return { ...context, logIn, logOut }
}
