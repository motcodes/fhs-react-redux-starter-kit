import React, { createContext, useContext, useState, useEffect } from 'react'
// import { db } from './data'

const dbBaseUrl = 'http://localhost:3001'

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null)
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(url, options)
      const json = await res.json()
      setResponse(json)
    }
    fetcher()
  }, [])
  return response
}

const DbContext = createContext()

export function DbProvider({ children }) {
  const [dbData, setDbData] = useState([])

  const fetchUser = useFetch(dbBaseUrl + '/user')
  const fetchMoney = useFetch(dbBaseUrl + '/moneyTransaction')

  useEffect(() => {
    if (fetchUser && fetchMoney) {
      setDbData({ user: fetchUser, moneyTransaction: fetchMoney })
    }
  }, [fetchUser, fetchMoney])

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
