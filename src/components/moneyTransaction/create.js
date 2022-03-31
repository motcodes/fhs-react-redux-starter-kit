import React from 'react'
import { Button } from '../button'
import { Input } from '../input'
import { Select } from '../select'
import { useDb } from '../../context/db'
import styles from '../../styles/moneyTransaction.module.css'

export const Create = ({ formik }) => {
  const { dbData } = useDb()
  const userOptions = dbData.user.map((user) => ({
    label: user.name,
    value: user.id
  }))

  return (
    <section className={styles.createContainer}>
      <h1>
        <span>I owe somebody</span>
        <span>Somebody owes me</span>
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <Select
          id="creditor-select"
          name="creditorId"
          label="Creditor"
          options={userOptions}
          value={formik.values.creditorId}
          onChange={formik.handleChange}
        />
        <Select
          id="debitor-select"
          name="debitorId"
          label="Debitor"
          options={userOptions}
          value={formik.values.debitorId}
          onChange={formik.handleChange}
        />
        <Input
          id="transation-amount"
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
    </section>
  )
}
