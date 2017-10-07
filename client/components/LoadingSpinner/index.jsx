import React from 'react'
import Logo from 'components/Logo';
import styles from './index.css'

export const LoadingSpinner = () => (
  <div className={styles.container}>
    <Logo className={styles.logo} />
  </div>
)

export default LoadingSpinner
