import { FC } from 'react'
import usePokemon from 'hooks/usePokemons'
import PokeCard from '../PokeCard/PokeCard'
import styles from './PokeTeam.module.css'
import PokeSearch from 'components/PokeSearch/PokeSearch'
import VoidCard from 'components/PokeCard/VoidCard'

const PokeTeam: FC = (): JSX.Element => {
  const { pokemonTeam, loading, error, addPokemonToTeam } = usePokemon()

  if (loading) return <span>Loading</span>
  if (error) return <span>Error</span>
  return (
    <div>
      <PokeSearch onPokemonClick={addPokemonToTeam} />
      <section className={styles.team}>
        {
        pokemonTeam.map(pokemon => {
          if (pokemon === undefined) return <VoidCard />
          return <PokeCard key={pokemon.number} pokemon={pokemon} />
        })
      }
      </section>
    </div>
  )
}

export default PokeTeam
