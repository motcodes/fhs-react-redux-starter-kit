import { collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../firebase-config'

const userCollectionRef = collection(db, 'user')

async function getUsers() {
  const data = await getDocs(userCollectionRef)
  const parsedData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  return parsedData
}

export function useDbUsers() {
  const [response, setResponse] = useState(null)
  useEffect(() => {
    const fetching = async () => {
      const data = await getUsers()
      setResponse(data)
    }
    fetching()
  }, [])

  return response
}
