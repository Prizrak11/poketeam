import { FC } from 'react'
import styles from './Spinner.module.css'

const Spinner: FC = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner} />
      <p>Loading...</p>
    </div>
  )
}

export default Spinner
