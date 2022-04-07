import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useUser } from '../context/userContext'

export const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { currentUser } = useUser()

  if (!Object.keys(currentUser).length) {
    return <Navigate to="/" state={{ from: location }} replace />
  }
  return <>{React.cloneElement(children, { currentUser })}</>
}
