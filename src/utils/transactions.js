import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase-config'

const transactionCollectionRef = collection(db, 'transactions')

async function getTransaction() {
  const data = await getDocs(transactionCollectionRef)
  const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  return parsedData
}

export function useTransaction() {
  const [response, setResponse] = useState(null)
  useEffect(() => {
    const fetching = async () => {
      const data = await getTransaction()
      setResponse(data)
    }
    fetching()
  }, [])

  return response
}

export async function addTransaction(transaction) {
  try {
    const addedTransaction = await addDoc(transactionCollectionRef, transaction)

    console.log('addedTransaction :', addedTransaction.id)
    return addedTransaction.id
  } catch (error) {
    console.error(error)
  }
}

export async function updateTransaction(transaction) {
  console.log('transaction :', transaction)
  try {
    const transactionRef = doc(db, 'transactions', transaction.id)
    await updateDoc(transactionRef, {
      paidAt: transaction.paidAt
    })
    console.log('updated transaction: ', transaction.id)
  } catch (error) {
    console.error(error)
  }
}
