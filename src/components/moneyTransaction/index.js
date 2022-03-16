import React, { useState } from 'react'
import { Button } from '../button'
import styles from '../../styles/moneyTransaction.module.css'
import { Create } from './create'
import { List } from './list'

export const MoneyTransaction = () => {
  const [formData, setFormData] = useState({
    userId: 0,
    amount: 0,
    isPaid: false
  })
  const [transactionList, setTransactionList] = useState([])

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setTransactionList((prev) => [
      ...prev,
      { ...formData, id: transactionList.length }
    ])
    setFormData({
      userId: 0,
      amount: 0,
      isPaid: false
    })
  }

  return (
    <div className={styles.container}>
      <header>
        <Button>Button</Button>
      </header>
      <Create
        amount={formData.amount}
        selectValue={formData.userId}
        onSubmit={handleOnSubmit}
        onChangeSelect={(e) =>
          setFormData((prev) => ({
            ...prev,
            userId: parseInt(e.target.value)
          }))
        }
        onChangeAmount={(e) => {
          setFormData((prev) => ({
            ...prev,
            amount: e.target.value
          }))
        }}
      />
      <List
        transactionList={transactionList}
        setTransactionList={setTransactionList}
      />
    </div>
  )
}
