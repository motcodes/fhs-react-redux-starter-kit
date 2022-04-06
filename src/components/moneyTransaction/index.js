import React, { useState, useEffect } from 'react'
import styles from '../../styles/moneyTransaction.module.css'
import { Create } from './create'
import { List } from './list'
import { useFormik } from 'formik'
import { addTransaction, useTransaction } from '../../utils/transactions'
import { useDbUsers } from '../../utils/users'

export const MoneyTransaction = () => {
  const dbTransactions = useTransaction()
  const dbUsers = useDbUsers()
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
    onSubmit: (transaction) => {
      const newTransaction = {
        creditorId: transaction.creditorId,
        debitorId: transaction.debitorId,
        amount: transaction.amount,
        paidAt: null
      }
      addTransaction(newTransaction)
      setTransactions((prev) => [...prev, newTransaction])
    }
  })

  return (
    <div className={styles.container}>
      {dbUsers && <Create formik={formik} />}
      {transactions && (
        <List transactions={transactions} setTransactions={setTransactions} />
      )}
    </div>
  )
}
