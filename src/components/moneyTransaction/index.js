import React, { useState, useEffect } from 'react'
import styles from '../../styles/moneyTransaction.module.css'
import { Create } from './create'
import { List } from './list'
import { useFormik } from 'formik'
import { addTransaction, useTransaction } from '../../utils/transactions'

export const MoneyTransaction = () => {
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
    validate: ({ amount }) => {
      const errors = {}
      if (amount <= 0) {
        errors.amount = "Amount can't be 0 or less"
      }
      return errors
    },
    validateOnChange: false,
    onSubmit: (transaction) => {
      const newTransaction = {
        id: dbTransactions.length + 1,
        creditorId: parseInt(transaction.creditorId),
        debitorId: parseInt(transaction.debitorId),
        amount: transaction.amount,
        paidAt: null
      }
      addTransaction(newTransaction)
      setTransactions((prev) => [...prev, newTransaction])
    }
  })

  return (
    <div className={styles.container}>
      <Create formik={formik} />
      {transactions && (
        <List transactions={transactions} setTransactions={setTransactions} />
      )}
    </div>
  )
}
