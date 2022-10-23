import { FC } from 'react'
import usePokemon from 'hooks/usePokemons'
import PokeCard from '../PokeCard/PokeCard'
import styles from './PokeTeam.module.css'

const PokeTeam: FC = (): JSX.Element => {
  const { pokemon, loading, error } = usePokemon()

  if (loading) return <span>Loading</span>
  if (error || (pokemon == null)) return <span>Error</span>
  return (
    <section className={styles.team}>
      <PokeCard pokemon={pokemon} />
      <PokeCard pokemon={pokemon} />
      <PokeCard pokemon={pokemon} />
      <PokeCard pokemon={pokemon} />
      <PokeCard pokemon={pokemon} />
      <PokeCard pokemon={pokemon} />
    </section>
  )
}

export default PokeTeam
