import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import { FC } from 'react'
import styles from './tooltip.module.css'

interface Props {
  children: JSX.Element
  content: string | JSX.Element | undefined
}

const Tooltip: FC<Props> = ({ children, content }): JSX.Element => {
  return (
    <Tippy disabled={content === undefined} content={content} className={styles.tooltip}>{children}</Tippy>
  )
}

export default Tooltip
