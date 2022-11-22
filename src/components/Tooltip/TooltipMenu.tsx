import Tippy from '@tippyjs/react'
import { FC, MouseEventHandler, useState } from 'react'
import { TfiMenu } from 'react-icons/tfi'
import styles from './tooltip.module.css'

interface Props {
  menu: Array<{ label: string, action: () => void, error?: boolean }>
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
            const { action, label, error = false } = option

            const handler: MouseEventHandler = (event): void => {
              event.preventDefault()
              action()
            }

            return (
              <li
                key={id}
                className={`${styles.option} ${error ? styles.error : ''}`}
              >
                <button onClick={handler}>{label}</button>
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
      className={styles.tooltip}
    >
      <button onClick={open ? hide : show} className={`${styles.action} ${className ?? ''}`}>
        <TfiMenu />
      </button>
    </Tippy>
  )
}

export default TooltipMenu
