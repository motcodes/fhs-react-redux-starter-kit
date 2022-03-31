import React from 'react'
import { useDb } from '../../context/db'
import styles from '../../styles/moneyTransaction.module.css'
import { ListItem } from './listItem'

export const List = () => {
  const { dbData, setDbData } = useDb()
  const { moneyTransaction } = dbData

  const togglePay = (item, index) => {
    const listItems = [...moneyTransaction]
    const activeItem = listItems.at(index)
    activeItem.isPaid = !item.isPaid
    activeItem.paidAt = activeItem.isPaid ? new Date().toISOString() : null
    listItems[index] = activeItem
    setDbData((prev) => ({
      ...prev,
      moneyTransaction: listItems
    }))
  }

  return (
    <section className={styles.listContainer}>
      {dbData.moneyTransaction && (
        <ul>
          {dbData.moneyTransaction.map((item, index) => (
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
