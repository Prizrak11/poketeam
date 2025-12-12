import VoidCard from 'components/PokeCard/VoidCard'
import Spinner from 'components/Spinner/Spinner'
import useAttacker from 'hooks/useAttacker'
import { usePokemonSearchModal } from 'hooks/modals'
import { FC } from 'react'
import styles from './Attacker.module.css'
import { CardContainerProps } from 'components/PokeCard/PokeCardContainer'
import AttackerCard from 'components/PokeCard/AttackerCard'

interface AttackerProps extends Omit<CardContainerProps, 'children' | 'className'> {
  open?: boolean
}

const Attacker: FC<AttackerProps> = (props): JSX.Element => {
  const { open } = props
  const { loading, attacker, addPokemonToEnemyFromApi } = useAttacker()
  const { openModal } = usePokemonSearchModal()

  const openModalToAttacker = (): void => openModal(addPokemonToEnemyFromApi)

  if (loading) return <Spinner />
  return (
    <div>
      <h1 className={styles.title}>Attack</h1>
      <section>
        {
          (attacker != null)
            ? <AttackerCard pokemon={attacker} open={open} />
            : <VoidCard action={openModalToAttacker} />
        }
      </section>
    </div>
  )
}

export default Attacker
