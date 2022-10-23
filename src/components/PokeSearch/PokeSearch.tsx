import { ChangeEvent, FC, KeyboardEventHandler, useState, useRef } from 'react'
import usePokeSearch from 'hooks/usePokeSearch'
import { pokemonSearchType } from 'services/pokemonSearchList'
import styles from './PokeSearch.module.css'

export type pokeSearchFunc = (pokemon: pokemonSearchType) => void

interface pokeSearchProps {
  onPokemonClick: pokeSearchFunc
  filters?: string[]
}

const PokeSearch: FC<pokeSearchProps> = ({ onPokemonClick, filters }): JSX.Element => {
  const { pokemonList, handleInputChange, isLoading } = usePokeSearch({ filters })
  const [keyFocus, setKeyFocus] = useState<number>(0)
  const buttonArr = useRef<Array<HTMLButtonElement | null>>([])

  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => { handleInputChange(evt.target.value) }

  const handleArrows: KeyboardEventHandler<HTMLInputElement> = evt => {
    if (pokemonList == null) return

    if (evt.key === 'ArrowUp' && keyFocus > 0) setKeyFocus(key => key - 1)
    if (evt.key === 'ArrowDown' && keyFocus < pokemonList.length - 1) setKeyFocus(key => key + 1)
    if (evt.key === 'Enter') onPokemonClick(pokemonList[keyFocus])

    if (keyFocus !== 0) buttonArr.current.at(keyFocus - 1)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  if (isLoading) return <span>Loading</span>
  return (
    <div className={styles.search}>
      <input type='text' onChange={handleChange} placeholder='Search a pokemon' className={styles.input} autoFocus onKeyUp={handleArrows} />
      <div className={styles.suggestions}>
        {
          pokemonList?.map((pokemon, id) => {
            const focus = keyFocus === id
            const fStyles = focus ? styles.focus : undefined

            return (
              <button
                onMouseOver={() => setKeyFocus(id)}
                ref={ref => { buttonArr.current[id] = ref }}
                key={id}
                className={fStyles}
                onClick={() => onPokemonClick(pokemon)}
              >{pokemon.name}
              </button>
            )
          })
        }
      </div>
    </div>
  )
}

export default PokeSearch
