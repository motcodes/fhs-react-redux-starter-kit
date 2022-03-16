import React from 'react'
import style from '../styles/input.module.css'

export const Input = ({
  className = '',
  name,
  id,
  value,
  isError,
  onChange,
  ...rest
}) => {
  return (
    <label
      className={`${style.container} ${className} ${
        isError ? style.isError : ''
      }`}
      htmlFor={id}
    >
      {name}
      <input {...rest} id={id} name={name} value={value} onChange={onChange} />
      {isError && (
        <span className={style.errorNotice}>{name} cannot be blank</span>
      )}
    </label>
  )
}
