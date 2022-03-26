import { BaseUrl, fetcher, useFetch } from './fetcher'

export const fetchTransactions = () => fetcher(BaseUrl + '/moneyTransaction')

export function useTransaction() {
  const transactions = useFetch(BaseUrl + '/moneyTransaction')
  return transactions
}

export async function addTransaction(transaction) {
  try {
    const addedTransaction = fetcher(BaseUrl + '/moneyTransaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transaction)
    })

    console.log('addedTransaction :', addedTransaction)
  } catch (error) {
    console.error(error)
  }
}

export async function updateTransaction(transaction) {
  console.log('transaction :', transaction)
  try {
    const updatedTransaction = fetcher(
      `${BaseUrl}/moneyTransaction/${parseInt(transaction.id)}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
      }
    )
    console.log('updated :', updatedTransaction)
  } catch (error) {
    console.error(error)
  }
}
