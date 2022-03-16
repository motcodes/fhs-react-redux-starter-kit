import React from 'react'
import styles from '../../styles/moneyTransaction.module.css'
import { ListItem } from './listItem'

export const List = ({ transactionList, setTransactionList }) => {
  const togglePay = (item, index) => {
    const listItems = [...transactionList]
    const activeItem = listItems.at(index)
    activeItem.isPaid = !item.isPaid
    activeItem.paidAt = activeItem.isPaid ? new Date().toISOString() : null
    listItems[index] = activeItem
    setTransactionList(listItems)
    console.log('listItems :', listItems)
  }

  return (
    <section className={styles.listContainer}>
      {transactionList && (
        <ul>
          {transactionList.map((item, index) => (
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
