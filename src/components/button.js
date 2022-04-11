import React from 'react'
import styles from '../styles/button.module.css'

// put default values outside so it doesn't create e.g. VARIANTS
// on each Button use
const VARIANTS = 'primary' || 'secondary'
const EMPTY = ''

export const Button = ({
  variant = VARIANTS,
  className = EMPTY,
  onClick,
  children,
  ...rest
}) => {
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
