import { FC } from 'react'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import PokeCardContainer, { CardContainerProps } from './PokeCardContainer'
import styles from './PokeCard.module.css'

type FullPokeCardProps = Omit<CardContainerProps, 'children' | 'className'>

const FullPokeCard: FC<FullPokeCardProps> = (props): JSX.Element => {
  const { pokemon } = props

  return (
    <PokeCardContainer {...props} className={styles.fullCard}>
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

export default FullPokeCard
