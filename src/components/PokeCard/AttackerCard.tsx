import { FC, useEffect, useRef, useState } from 'react'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import styles from './PokeCard.module.css'
import PokeCardContainer, { CardContainerProps } from './PokeCardContainer'
import useAttacker from 'hooks/useAttacker'
import Spinner from 'components/Spinner/Spinner'
import PokemonAttackerMoves from 'components/PokemonMoves/PokemonAttackerMoves'
import { MenuItem } from 'components/Tooltip/TooltipMenu'
import { FaTrash } from 'react-icons/fa'
import { Pokemon } from 'types/pokemon'
import { AiOutlineAppstoreAdd, AiOutlineEdit } from 'react-icons/ai'
import useMove from 'hooks/useMove'
import { searchItemAPI } from 'types/searchItem'
import useMoveSearchModal from 'hooks/modals/useMoveSearchModal'

interface AttackerCardProps extends Omit<CardContainerProps, 'children' | 'className' | 'menu'> {
  open?: boolean
  pokemon: Pokemon
}

const AttackerCard: FC<AttackerCardProps> = (props): JSX.Element => {
  const { pokemon, open = false } = props
  const { removePokemonEnemy } = useAttacker()
  const { addMoveToAttacker } = useMove()
  const { openModal: openMoveModal } = useMoveSearchModal()

  const attackerRef = useRef<HTMLDivElement | null>(null)
  const [editable, setEditable] = useState<boolean | undefined>(false)

  useEffect(() => {
    if (editable == null) return

    const handleClickOutside = (evt: MouseEvent): void => {
      const currentRef = attackerRef?.current

      if ((currentRef != null) && !currentRef.contains(evt.target as Node)) setEditable(false)
    }

    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [editable, attackerRef])

  const addMove = (move: searchItemAPI): void => addMoveToAttacker(move)

  const typeColor = pokemon.types[0].color

  const areMovesFull = pokemon.moves.length === 4

  const menu: MenuItem[] = [
    { label: 'Remove', action: removePokemonEnemy, error: true, icon: <FaTrash /> },
    ...(areMovesFull ? [] : [{ label: 'Add Move', action: () => openMoveModal(addMove), icon: <AiOutlineAppstoreAdd /> }]),
    { label: 'Edit', action: () => setEditable(true), icon: <AiOutlineEdit /> }
  ]

  if (pokemon == null) return <Spinner />
  return (
    <div ref={r => { attackerRef.current = r }}>
      <PokeCardContainer {...props} menu={menu} className={`${styles.card} ${open ? styles.open : ''}`}>
        <>
          <p className={styles.number} style={{ color: typeColor }}>{pokemon.number}</p>
          <img src={pokemon.sprite} className={styles.sprite} />
          <section className={styles.content}>
            <h1>{pokemon.name}</h1>
            <div className={styles.types}>
              {pokemon.types.map((type, id) => {
                return (
                  <TypeBadge tooltip={type.name} key={id} type={type} big={open} />
                )
              })}
            </div>
          </section>
          {(pokemon?.moves?.length > 0 || open) && <PokemonAttackerMoves editable={editable} pokemon={pokemon} open={open} />}
        </>
      </PokeCardContainer>
    </div>
  )
}

export default AttackerCard
