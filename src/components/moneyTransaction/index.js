import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik'
import { Create } from './create'
import { List } from './list'
import { addTransaction, useTransaction } from '../../utils/transactions'
import { useDbUsers } from '../../utils/users'
import { ErrorBoundary } from '../errorBoundary'
import styles from '../../styles/moneyTransaction.module.css'

export const MoneyTransaction = () => {
  // moved dbUsers from ListItem and List to parent so it only gets called once
  // instead of calling it in every ListItem
  const dbUsers = useDbUsers()
  const dbTransactions = useTransaction()
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    if (dbTransactions) {
      setTransactions(dbTransactions)
    }
  }, [dbTransactions])

  const formik = useFormik({
    initialValues: {
      creditorId: 1,
      debitorId: 1,
      amount: 0
    },
    validate: ({ amount, creditorId, debitorId }) => {
      const errors = {}
      if (amount <= 0) {
        errors.amount = "Amount can't be 0 or less"
      }
      if (creditorId === 1) {
        errors.creditor = 'Choose a creditor'
      }
      if (debitorId === 1) {
        errors.debitor = 'Choose a creditor'
      }

      return errors
    },
    validateOnChange: false,
    onSubmit: async (transaction) => {
      const newTransaction = {
        creditorId: transaction.creditorId,
        debitorId: transaction.debitorId,
        amount: transaction.amount,
        paidAt: null
      }
      const newTransactionId = await addTransaction(newTransaction)
      newTransaction.id = newTransactionId
      setTransactions((prev) => [...prev, newTransaction])
    }
  })

  return (
    <div className={styles.container}>
      {dbUsers && (
        <ErrorBoundary>
          <Create formik={formik} dbUsers={dbUsers} />
          {transactions && (
            <List
              transactions={transactions}
              setTransactions={setTransactions}
              dbUsers={dbUsers}
            />
          )}
        </ErrorBoundary>
      )}
    </div>
  )
}
