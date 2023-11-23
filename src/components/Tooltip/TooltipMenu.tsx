import Tippy from '@tippyjs/react'
import { FC, MouseEventHandler, useState } from 'react'
import { TfiMenu } from 'react-icons/tfi'
import styles from './tooltip.module.css'

export interface MenuItem {
  label: string
  action: () => void
  icon?: JSX.Element
  error?: boolean
}

interface Props {
  menu: MenuItem[]
  className?: string
}

const TooltipMenu: FC<Props> = ({ menu, className }): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false)

  const show = (): void => setOpen(true)
  const hide = (): void => setOpen(false)

  const renderMenu = (): JSX.Element => {
    return (
      <ul className={styles.menu}>
        {
          menu.map((option, id) => {
            const { action, label, error = false, icon: Icon } = option

            const handler: MouseEventHandler = (event): void => {
              event.preventDefault()
              action()
              hide()
            }

            return (
              <li
                key={id}
                className={`${styles.option} ${error ? styles.error : ''}`}
              >
                <button onClick={handler} aria-expanded='false'>{Icon != null && Icon}{label}</button>
              </li>
            )
          })
        }
      </ul>
    )
  }

  return (
    <Tippy
      content={renderMenu()}
      placement='left'
      interactive
      visible={open}
      zIndex={99}
      onClickOutside={hide}
      className={`${styles.tooltip} ${styles.big}`}
    >
      <button onClick={open ? hide : show} className={`${styles.action} ${className ?? ''}`}>
        <TfiMenu />
      </button>
    </Tippy>
  )
}

export default TooltipMenu
