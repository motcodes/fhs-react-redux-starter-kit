import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Button } from './components/button'
import { MoneyTransaction } from './components/moneyTransaction'
import { SignIn } from './components/signIn'
import { SignUp } from './components/signUp'
import { useDb } from './context/db'
import './styles/global.css'

function App() {
  const { dbData, logOut } = useDb()
  const { currentUser } = dbData

  return (
    <div>
      <header className="header">
        {currentUser && (
          <>
            <p>{currentUser.name}</p>
            <Button variant="secondary" onClick={logOut}>
              Log Out
            </Button>
          </>
        )}
        {!currentUser && (
          <>
            <Link to="sign-in">Sign In</Link>
            <Link to="sign-up">Sign Up</Link>
          </>
        )}
      </header>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/money-transactions" element={<MoneyTransaction />} />
      </Routes>
    </div>
  )
}
export default App
