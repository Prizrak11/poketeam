import { FC, createContext, useReducer, useContext } from 'react'
import { initialModalsState, modalsReducer, type ModalAction, type ModalsState } from './modalsReducer'

interface ModalContextType {
  state: ModalsState
  dispatch: React.Dispatch<ModalAction>
}

const AppContext = createContext<ModalContextType>({ state: initialModalsState, dispatch: () => null })

export const useModalContext = (): ModalContextType => {
  const app = useContext(AppContext)
  if (app === null) throw new Error('ModalContext needs a provider')
  return app
}

const ModalContextProvider: FC<{ children: JSX.Element }> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(modalsReducer, initialModalsState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  )
}

export default ModalContextProvider
