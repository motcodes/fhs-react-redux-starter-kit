import React from 'react'
import styles from '../../styles/moneyTransaction.module.css'
import { updateTransaction } from '../../utils/transactions'
import { ListItem } from './listItem'

export const List = ({ transactions, setTransactions }) => {
  const togglePay = (item, index) => {
    const listItems = [...transactions]
    const activeItem = listItems.at(index)
    activeItem.isPaid = !item.isPaid
    activeItem.paidAt = activeItem.isPaid ? new Date().toISOString() : null
    console.log('activeItem :', activeItem)
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
