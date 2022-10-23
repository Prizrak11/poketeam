import { FC, createContext, useReducer, useContext } from 'react'
import { ActionType, AppState, initialState, reducer } from './reducer'

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<ActionType>
}

const AppContext = createContext<AppContextType>({ state: initialState, dispatch: () => null })

export const useAppContext = (): AppContextType => {
  const app = useContext(AppContext)
  if (app === null) throw new Error('AppContext needs a provider')
  return app
}

const AppContextProvider: FC<{ children: JSX.Element }> = ({ children }): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
