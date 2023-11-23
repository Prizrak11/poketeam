import FullPokeCard from 'components/PokeCard/FullCard'
import VoidCard from 'components/PokeCard/VoidCard'
import Spinner from 'components/Spinner/Spinner'
import useAttacker from 'hooks/useAttacker'
import { usePokemonSearchModal } from 'hooks/modals'
import { FC } from 'react'
import styles from './Attacker.module.css'
import { MenuItem } from 'components/Tooltip/TooltipMenu'

const Attacker: FC = (): JSX.Element => {
  const { loading, attacker, addPokemonToEnemyFromApi, removePokemonEnemy } = useAttacker()
  const { openModal } = usePokemonSearchModal()

  const openModalToAttacker = (): void => openModal(addPokemonToEnemyFromApi)

  const menu: MenuItem[] = [
    { label: 'Remove', action: removePokemonEnemy, error: true }
  ]

  if (loading) return <Spinner />
  return (
    <div>
      <h1 className={styles.title}>Attack</h1>
      <section>
        {
          (attacker != null)
            ? <FullPokeCard pokemon={attacker} menu={menu} />
            : <VoidCard action={openModalToAttacker} />
        }
      </section>
    </div>
  )
}

export default Attacker
