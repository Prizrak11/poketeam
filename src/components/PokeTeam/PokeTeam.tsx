import { FC } from 'react'
import usePokemon from 'hooks/usePokemons'
import PokeCard from '../PokeCard/PokeCard'
import styles from './PokeTeam.module.css'
import VoidCard from 'components/PokeCard/VoidCard'
import useSearchModal from 'hooks/useSearchModal'

const PokeTeam: FC = (): JSX.Element => {
  const { pokemonTeam, loading, error, addPokemonToTeam } = usePokemon()
  const { openModal } = useSearchModal()

  const openModalToTeam = (): void => openModal(addPokemonToTeam)

  if (loading) return <span>Loading</span>
  if (error) return <span>Error</span>
  return (
    <div>
      <section className={styles.team}>
        {
        pokemonTeam.map((pokemon, id) => {
          if (pokemon === undefined) return <VoidCard key={id} action={openModalToTeam} />
          return <PokeCard key={pokemon.number} pokemon={pokemon} />
        })
      }
      </section>
    </div>
  )
}

export default PokeTeam
