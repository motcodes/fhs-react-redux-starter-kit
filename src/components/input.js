import React from 'react'
import style from '../styles/input.module.css'

export const Input = ({ className, name, id, value, onChange, ...rest }) => {
  return (
    <label className={`${style.container} ${className}`} htmlFor={id}>
      {name}
      <input {...rest} id={id} name={name} value={value} onChange={onChange} />
    </label>
  )
}
