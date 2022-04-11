import React, { Suspense } from 'react'
import { serverTimestamp } from 'firebase/firestore'
import styles from '../../styles/moneyTransaction.module.css'
import { updateTransaction } from '../../utils/transactions'

const LItem = React.lazy(() => import('./listItem'))

export const List = ({ transactions, setTransactions, dbUsers }) => {
  // don't wrap into a useCallback. It doesn't always update on the server
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
      <Suspense fallback={<Fallback />}>
        {transactions && (
          <ul>
            {transactions.map((item, index) => (
              <LItem
                key={`${item.userId}-${index}`}
                item={item}
                dbUsers={dbUsers}
                togglePay={() => togglePay(item, index)}
              />
            ))}
          </ul>
        )}
      </Suspense>
    </section>
  )
}

const Fallback = () => <p>Loading Transactions...</p>
