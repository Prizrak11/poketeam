import { FC } from 'react'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import PokeCardContainer, { CardContainerProps } from './PokeCardContainer'
import styles from './PokeCard.module.css'
import { pokemonTypes, pokemonTypesNames } from 'types/pokemonTypes'

type FullPokeCardProps = Omit<CardContainerProps, 'children' | 'className'>

const FullPokeCard: FC<FullPokeCardProps> = (props): JSX.Element => {
  const { pokemon } = props

  return (
    <PokeCardContainer {...props} className={styles.fullCard}>
      <div className={styles.container}>
        <div className={styles.info}>
          <img src={pokemon.sprite} className={styles.sprite} />
          <section className={styles.content}>
            <h1>{pokemon.name}</h1>
            <div className={styles.types}>
              {pokemon.types.map((type, id) => <TypeBadge key={id} type={type} />)}
            </div>
          </section>
        </div>
        <div className={styles.weakness}>
          {Object.entries(pokemon.weaknessByType)
            .filter(([_, { from, to }]) => from !== 1 || to !== 1)
            .map(([type, values], id) => {
              const pokeType = pokemonTypes.get(type as pokemonTypesNames)
              return <TypeBadge key={id} type={pokeType} weak={{ ...values }} />
            }
            )}
        </div>
      </div>
    </PokeCardContainer>
  )
}

export default FullPokeCard
