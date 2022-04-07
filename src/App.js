import React, { useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Button } from './components/button'
import { MoneyTransaction } from './components/moneyTransaction'
import { SignIn } from './components/signIn'
import { SignUp } from './components/signUp'
import { useUser } from './context/userContext'
import { auth } from './firebase-config'
import './styles/global.css'
import { ProtectedRoute } from './utils/protectedRoute'

function App() {
  const { currentUser, logOut, sessionLogin } = useUser()

  useEffect(() => {
    auth.onAuthStateChanged((user) => sessionLogin(user))
  }, [])

  return (
    <div>
      <header className="header">
        {Object.keys(currentUser).length !== 0 ? (
          <>
            <p>{currentUser.name}</p>
            <Button variant="secondary" onClick={logOut}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Link to="sign-in">Sign In</Link>
            <Link to="sign-up">Sign Up</Link>
          </>
        )}
      </header>
      <Routes>
        <Route index element={<SignIn />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route
          path="money-transactions"
          element={
            <ProtectedRoute>
              <MoneyTransaction />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}
export default App
