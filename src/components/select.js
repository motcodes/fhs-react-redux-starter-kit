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
  ...rest
}) => {
  return (
    <label className={`${style.container} ${className}`} htmlFor={id}>
      {label}
      <select {...rest} id={id} name={name} value={value} onChange={onChange}>
        Select
        {options &&
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </label>
  )
}
