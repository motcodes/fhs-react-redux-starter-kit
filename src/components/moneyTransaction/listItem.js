import React from 'react'
import { useDb } from '../../context/db'
import styles from '../../styles/moneyTransaction.module.css'
import { Button } from '../button'

export const ListItem = ({ item, togglePay }) => {
  const { dbData } = useDb()

  const getUserName = (id) => dbData.user.find((el) => el.id === id).name

  return (
    <li
      className={`${styles.listItem} ${
        item.paidAt ? styles.strikethrough : ''
      }`}
    >
      <p className={styles.username}>
        <span>{getUserName(item.debitorId)}</span> owns{' '}
        <span>{getUserName(item.creditorId)}</span>
      </p>
      <p>
        {new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR'
        }).format(item.amount)}
      </p>
      <Button onClick={togglePay}>{item.paidAt ? 'Paid' : 'Pay'}</Button>
    </li>
  )
}
