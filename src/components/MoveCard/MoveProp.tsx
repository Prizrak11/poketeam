import Tooltip from 'components/Tooltip/Tooltip'
import { FC } from 'react'
import styles from './MoveCard.module.css'

interface MovePropI {
  tooltip: string
  icon: JSX.Element
  content: string
  className?: string
}

const MoveProp: FC<MovePropI> = ({ tooltip, icon, content, className = '' }) => {
  return (
    <Tooltip content={tooltip}>
      <div className={`${styles.value} ${className}`}>
        {icon}
        <p>{content}</p>
      </div>
    </Tooltip>
  )
}

export default MoveProp
