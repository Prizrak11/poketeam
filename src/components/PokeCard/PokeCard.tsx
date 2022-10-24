import { FC } from 'react'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import styles from './PokeCard.module.css'
import PokeCardContainer, { CardContainerProps } from './PokeCardContainer'

type PokeCardProps = Omit<CardContainerProps, 'children' | 'className'>

const PokeCard: FC<PokeCardProps> = (props): JSX.Element => {
  const { pokemon } = props

  return (
    <PokeCardContainer {...props} className={styles.card}>
      <>
        <img src={pokemon.sprite} />
        <section className={styles.content}>
          <h1>{pokemon.name}</h1>
          <div className={styles.types}>
            {pokemon.types.map((type, id) => <TypeBadge key={id} type={type} />)}
          </div>
        </section>
      </>
    </PokeCardContainer>
  )
}

export default PokeCard
