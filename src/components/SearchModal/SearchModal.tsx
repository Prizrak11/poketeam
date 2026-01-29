import { FC, MouseEvent, useEffect } from 'react'
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
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, closeModal])

  if (!isOpen) return <></>
  return (
    <div className={styles.modal} onClick={closeModal}>
      <div className={styles.content} onClick={stopClose}>
        <div className={styles.background} />
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
