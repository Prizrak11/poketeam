import { FC, MouseEvent, useEffect, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import SearchInput from 'components/SearchInput/SearchInput'
import useSearchModal, { searchFuncType } from 'hooks/modals/useSearchModal'
import styles from './SearchModal.module.css'
import { useSearchReturn } from 'hooks/search/useSearch'
import { ModalActions } from 'context/modals/modalsReducer'

interface searchModalProps {
  type: ModalActions
  placeholder: string
  children: JSX.Element
  searchHook: () => useSearchReturn
}

const SearchModal: FC<searchModalProps> = ({ type, placeholder, searchHook, children }): JSX.Element => {
  const { isOpen, closeModal, searchAction } = useSearchModal({ type })
  const contentRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedElement = useRef<HTMLElement | null>(null)

  const stopClose = (evt: MouseEvent): void => evt.stopPropagation()

  const onSearch: searchFuncType = item => {
    closeModal()
    searchAction(item)
  }

  useEffect(() => {
    const handleEscape = (evt: KeyboardEvent): void => {
      if (evt.key === 'Escape') {
        closeModal()
      }
    }

    const handleTabKey = (evt: KeyboardEvent): void => {
      if (evt.key === 'Tab' && (contentRef.current != null)) {
        const focusableElements = contentRef.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
        const firstElement = focusableElements[0] as HTMLElement
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

        if (document.activeElement === firstElement && evt.shiftKey) {
          lastElement.focus()
          evt.preventDefault()
        } else if (document.activeElement === lastElement && !evt.shiftKey) {
          firstElement.focus()
          evt.preventDefault()
        }
      }
    }

    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('keydown', handleTabKey)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTabKey)
      if (previouslyFocusedElement.current != null) {
        previouslyFocusedElement.current.focus()
      }
    }
  }, [isOpen, closeModal])

  if (!isOpen) return <></>
  return (
    <div className={styles.modal} onClick={closeModal} role='dialog' aria-modal='true' aria-label='Search Modal'>
      <div className={styles.content} onClick={stopClose} ref={contentRef}>
        <div className={styles.background} />
        <button className={styles.closeButton} onClick={closeModal} aria-label='Close modal'>
          <AiOutlineClose />
        </button>
        {children}
        <SearchInput
          onOptionClick={onSearch}
          searchHook={searchHook}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}

export default SearchModal
