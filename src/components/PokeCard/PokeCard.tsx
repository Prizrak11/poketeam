import { FC } from 'react'
import { pokemonTypes } from 'types/pokemonTypes'
import { Pokemon } from 'types/pokemon'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import styles from './PokeCard.module.css'

interface PokeCardProps {
  pokemon: Pokemon
  remove?: (pokemon: Pokemon) => void
}

const PokeCard: FC<PokeCardProps> = ({ pokemon, remove }): JSX.Element => {
  const typeColor = pokemonTypes.get(pokemon.types[0]).color

  return (
    <div className={styles.card}>
      {(remove != null) && <div onClick={() => remove(pokemon)} className={styles.removeBtn}>X</div>}
      <div style={{ backgroundColor: typeColor }} className={styles.background} />
      <img src={pokemon.sprite} />
      <section className={styles.content}>
        <h1>{pokemon.name}</h1>
        <div className={styles.types}>
          {pokemon.types.map((type, id) => <TypeBadge key={id} type={type} />)}
        </div>
      </section>
    </div>
  )
}

export default PokeCard
