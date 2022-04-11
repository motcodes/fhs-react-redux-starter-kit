import React, { useMemo } from 'react'
import { Button } from '../button'
import { Input } from '../input'
import { Select } from '../select'
import styles from '../../styles/moneyTransaction.module.css'

export const Create = ({ formik, dbUsers }) => {
  // dbUsers now gets added as a prop to remove a fetch request
  // and create only renders if dbUsers has a value
  // this means that we don't need a state for userOptions
  // which updates if dbUsers gets a value
  // we cant just map over it and by using Memo it doesn't run on each render
  const userOptions = useMemo(
    () =>
      dbUsers.map((user) => ({
        label: user.name,
        value: user.id
      })),
    [dbUsers]
  )

  return (
    <section className={styles.createContainer}>
      <h1>
        <span>I owe somebody</span>
        <span>Somebody owes me</span>
      </h1>
      {userOptions && (
        <form onSubmit={formik.handleSubmit}>
          <Select
            id="creditor-select"
            name="creditorId"
            label="Creditor"
            options={userOptions}
            value={formik.values.creditorId}
            onChange={formik.handleChange}
            error={formik.errors.creditor}
          />
          <Select
            id="debitor-select"
            name="debitorId"
            label="Debitor"
            options={userOptions}
            value={formik.values.debitorId}
            onChange={formik.handleChange}
            error={formik.errors.debitor}
          />
          <Input
            id="transaction-amount"
            name="amount"
            type="number"
            step="0.01"
            error={formik.errors.amount}
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
          <Button type="submit" className={styles.submitButton}>
            Create
          </Button>
        </form>
      )}
    </section>
  )
}
