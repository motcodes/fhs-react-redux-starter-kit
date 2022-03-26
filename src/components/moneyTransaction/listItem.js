import React from 'react'
import styles from '../../styles/moneyTransaction.module.css'
import { useDbUsers } from '../../utils/users'
import { Button } from '../button'

export const ListItem = ({ item, togglePay }) => {
  const dbUsers = useDbUsers()

  const getUserName = (id) => dbUsers.find((el) => el.id === id).name

  return (
    dbUsers && (
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
  )
}
