import React from 'react'
import styles from '../../styles/moneyTransaction.module.css'
import { Create } from './create'
import { List } from './list'
import { useDb } from '../../context/db'
import { useFormik } from 'formik'

export const MoneyTransaction = () => {
  const { dbData, setDbData } = useDb()

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
      const newId = dbData.moneyTransaction.length
      setDbData(({ moneyTransaction, ...rest }) => ({
        ...rest,
        moneyTransaction: [
          ...moneyTransaction,
          {
            id: newId,
            creditorId: parseInt(transaction.creditorId),
            debitorId: parseInt(transaction.debitorId),
            amount: transaction.amount,
            paidAt: null
          }
        ]
      }))
    }
  })

  return (
    <div className={styles.container}>
      <Create formik={formik} />
      <List />
    </div>
  )
}
