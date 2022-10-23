import { ChangeEvent, FC } from 'react'
import usePokeSearch from 'hooks/usePokeSearch'
import { pokemonSearchType } from 'services/pokemonSearchList'
import styles from './PokeSearch.module.css'

interface pokeSearchProps {
  onPokemonClick: (pokemon: pokemonSearchType) => void
  filters?: string[]
}

const PokeSearch: FC<pokeSearchProps> = ({ onPokemonClick, filters }): JSX.Element => {
  const { pokemonList, handleInputChange, isLoading } = usePokeSearch({ filters })

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => { handleInputChange(evt.target.value) }

  if (isLoading) return <span>Loading</span>
  return (
    <div className={styles.search}>
      <input type='text' onChange={handleChange} placeholder='Search a pokemon' className={styles.input} />
      <div className={styles.suggestions}>
        {
          pokemonList?.map((pokemon, id) => <button onClick={() => onPokemonClick(pokemon)} key={id}>{pokemon.name}</button>)
        }
      </div>
    </div>
  )
}

export default PokeSearch
