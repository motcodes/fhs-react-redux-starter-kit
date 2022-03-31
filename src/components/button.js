import React from 'react'
import styles from '../styles/button.module.css'

export const Button = ({
  variant = 'primary' || 'secondary',
  className = '',
  onClick,
  children,
  ...rest
}) => {
  // console.log(onClick)
  return (
    <button
      {...rest}
      onClick={onClick}
      className={`${styles.button} ${
        variant === 'primary' ? styles.primary : styles.secondary
      } ${className}`}
    >
      {children}
    </button>
  )
}
