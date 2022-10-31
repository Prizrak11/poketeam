import { ModalsTypes } from 'context/reducer'
import useSearchModal, { useSearchModalReturn } from './useSearchModal'

const usePokemonSearchModal = (): useSearchModalReturn => useSearchModal({ type: ModalsTypes.pokemonSearch })

export default usePokemonSearchModal
