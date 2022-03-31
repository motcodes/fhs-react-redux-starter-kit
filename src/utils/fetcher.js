import { useEffect, useState } from 'react'

export const BaseUrl = 'http://localhost:3001'

export const fetcher = async (url, options = {}) => {
  const res = await fetch(url, options)
  const json = await res.json()
  return json
}

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null)
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(url, options)
      const json = await res.json()
      setResponse(json)
    }
    fetcher()
  }, [])
  return response
}
