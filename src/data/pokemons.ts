import { searchItemAPI } from 'types/searchItem'
import { useLocalData } from './useLocalData'

const { getData: getPokemons, setData: setPokemons } = useLocalData<searchItemAPI[]>('pokemonList')

export {
  getPokemons,
  setPokemons
}
