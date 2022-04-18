import React from 'react'
import { serverTimestamp } from 'firebase/firestore'
import styles from '../../styles/moneyTransaction.module.css'
import { updateTransaction } from '../../utils/transactions'
import { ListItem } from './listItem'

export const List = ({ transactions, setTransactions }) => {
  const togglePay = (item, index) => {
    const listItems = [...transactions]
    const activeItem = listItems.find((el) => el.id === item.id)
    activeItem.isPaid = !item.isPaid
    activeItem.paidAt = activeItem.isPaid ? serverTimestamp() : null
    listItems[index] = activeItem
    setTransactions(listItems)
    updateTransaction(activeItem)
  }

  return (
    <section className={styles.listContainer}>
      {transactions && (
        <ul>
          {transactions.map((item, index) => (
            <ListItem
              key={`${item.userId}-${index}`}
              item={item}
              togglePay={() => togglePay(item, index)}
            />
          ))}
        </ul>
      )}
    </section>
  )
}
