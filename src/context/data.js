export const db = {
  moneyTransaction: [
    {
      id: 1,
      creditorId: 1,
      debitorId: 2,
      amount: 10.0,
      paidAt: null
    },
    {
      id: 2,
      creditorId: 3,
      debitorId: 1,
      amount: 11.2,
      paidAt: '2000-01-01T00:00:00+01+00'
    }
  ],
  user: [
    { id: 1, username: 'sepp', password: 'sepp', name: 'Sepp' },
    { id: 2, username: 'mike42', password: 'mike42', name: 'Mike' },
    { id: 3, username: 'fabs', password: 'fabs', name: 'Fabian' }
  ]
}
