import React from 'react'
import styles from '../../styles/moneyTransaction.module.css'
import { Button } from '../button'
import { transactionOptions } from './data'

export const ListItem = ({ item, togglePay }) => {
  const getUserName = (item) =>
    transactionOptions.find((el) => el.value === item.userId).label

  return (
    <li
      className={`${styles.listItem} ${
        item.isPaid ? styles.strikethrough : ''
      }`}
    >
      <p className={styles.username}>{getUserName(item)}</p>
      <p>
        {new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR'
        }).format(item.amount)}
      </p>
      <Button onClick={togglePay}>{item.isPaid ? 'Paid' : 'Pay'}</Button>
    </li>
  )
}
