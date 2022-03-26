import { BaseUrl, fetcher, useFetch } from './fetcher'

export const fetchUsers = fetcher(BaseUrl + '/user')

export function useDbUsers() {
  const users = useFetch(BaseUrl + '/user')
  return users
}
