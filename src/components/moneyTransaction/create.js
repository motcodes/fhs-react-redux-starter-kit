import React from 'react'
import { Button } from '../button'
import { Input } from '../input'
import { Select } from '../select'
import styles from '../../styles/moneyTransaction.module.css'
import { transactionOptions } from './data'

export const Create = ({
  onSubmit,
  onChangeSelect,
  onChangeAmount,
  amount,
  selectValue
}) => {
  return (
    <section className={styles.createContainer}>
      <h1>
        <span>I owe somebody</span>
        <span>Somebody owes me</span>
      </h1>
      <form onSubmit={onSubmit}>
        <Select
          id="transation-select"
          name="User"
          options={transactionOptions}
          value={selectValue}
          onChange={onChangeSelect}
        />
        <Input
          id="transation-amount"
          name="Amount"
          type="number"
          step="0.01"
          value={amount}
          onChange={onChangeAmount}
        />
        <Button>Create</Button>
      </form>
    </section>
  )
}
