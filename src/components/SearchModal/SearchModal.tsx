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

    if (isOpen) {
      previouslyFocusedElement.current = document.activeElement as HTMLElement
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
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
        <button className={styles.closeButton} onClick={closeModal} aria-label='Close modal' data-close-modal>
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
