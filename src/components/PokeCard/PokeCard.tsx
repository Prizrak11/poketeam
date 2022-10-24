import { FC } from 'react'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import styles from './PokeCard.module.css'
import PokeCardContainer, { CardContainerProps } from './PokeCardContainer'
import useAttacker from 'hooks/useAttacker'
import Spinner from 'components/Spinner/Spinner'

type PokeCardProps = Omit<CardContainerProps, 'children' | 'className'>

const PokeCard: FC<PokeCardProps> = (props): JSX.Element => {
  const { attacker, loading } = useAttacker()
  const { pokemon } = props

  if (loading) return <Spinner />
  return (
    <PokeCardContainer {...props} className={styles.card}>
      <>
        <img src={pokemon.sprite} className={styles.sprite} />
        <section className={styles.content}>
          <h1>{pokemon.name}</h1>
          <div className={styles.types}>
            {pokemon.types.map((type, id) => {
              const from = attacker?.weaknessByType[type].to
              return <TypeBadge key={id} type={type} weak={{ from }} />
            })}
          </div>
        </section>
      </>
    </PokeCardContainer>
  )
}

export default PokeCard
