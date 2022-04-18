import React from 'react'
import style from '../styles/input.module.css'

export const Select = ({
  className,
  id,
  name,
  label = '',
  value = 0,
  options = [{ value: 0, label: 'Value' }],
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
