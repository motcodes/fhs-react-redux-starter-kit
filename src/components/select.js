import React from 'react'
import style from '../styles/input.module.css'

const DEFAULT_OPTIONS = [{ value: 0, label: 'Value' }]
const EMPTY = ''
const ZERO = 0

export const Select = ({
  className,
  id,
  name,
  label = EMPTY,
  value = ZERO,
  options = DEFAULT_OPTIONS,
  onChange,
  error,
  ...rest
}) => {
  return (
    <label
      className={`${style.container} ${className} ${
        error ? style.isError : ''
      }`}
      htmlFor={id}
    >
      {label}
      <select {...rest} id={id} name={name} value={value} onChange={onChange}>
        Select
        <option selected default>
          select
        </option>
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
      {error && <span className={style.errorNotice}>{error}</span>}
    </label>
  )
}
