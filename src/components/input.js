import React from 'react'
import style from '../styles/input.module.css'

const EMPTY = ''

export const Input = ({
  className = EMPTY,
  name,
  id,
  value,
  error,
  onChange,
  ...rest
}) => {
  return (
    <label
      className={`${style.container} ${className} ${
        error ? style.isError : ''
      }`}
      htmlFor={id}
    >
      {name}
      <input {...rest} id={id} name={name} value={value} onChange={onChange} />
      {error && <span className={style.errorNotice}>{error}</span>}
    </label>
  )
}
