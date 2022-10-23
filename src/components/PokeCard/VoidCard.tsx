import { FC } from 'react'
import { IoMdAdd } from 'react-icons/all'
import styles from './PokeCard.module.css'

interface VoidCardProps {
  action: () => void
}

const VoidCard: FC<VoidCardProps> = ({ action }): JSX.Element => {
  return (
    <div className={`${styles.card} ${styles.void}`} onClick={action}>
      <div style={{ backgroundColor: 'rgba(250,250,250,0.1)' }} className={styles.background} />
      <IoMdAdd />
    </div>
  )
}

export default VoidCard
