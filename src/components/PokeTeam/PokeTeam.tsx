import { FC } from 'react'
import usePokemon from 'hooks/usePokemons'
import PokeCard from '../PokeCard/PokeCard'
import styles from './PokeTeam.module.css'
import VoidCard from 'components/PokeCard/VoidCard'
import useSearchModal from 'hooks/useSearchModal'
import Spinner from 'components/Spinner/Spinner'

const PokeTeam: FC = (): JSX.Element => {
  const { pokemonTeam, loading, addPokemonToTeamFromApi, removePokemonFromTeam } = usePokemon()
  const { openModal } = useSearchModal()

  const openModalToTeam = (): void => openModal(addPokemonToTeamFromApi)

  if (loading) return <Spinner />
  return (
    <div>
      <h1 className={styles.title}>Your Team</h1>
      <section className={styles.team}>
        {
        pokemonTeam.map((pokemon, id) => {
          if (pokemon === undefined) return <VoidCard key={id} action={openModalToTeam} />
          return <PokeCard key={id} pokemon={pokemon} remove={removePokemonFromTeam} />
        })
      }
      </section>
    </div>
  )
}

export default PokeTeam
