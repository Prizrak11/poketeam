import { FC } from 'react'
import { IoMdAdd } from 'react-icons/all'
import styles from './PokeCard.module.css'

const VoidCard: FC = (): JSX.Element => {
  return (
    <div className={`${styles.card} ${styles.void}`}>
      <div style={{ backgroundColor: 'rgba(250,250,250,0.1)' }} className={styles.background} />
      <IoMdAdd />
    </div>
  )
}

export default VoidCard
