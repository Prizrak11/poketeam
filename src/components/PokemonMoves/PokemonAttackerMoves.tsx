import useMove from 'hooks/useMove'
import { FC } from 'react'
import { Pokemon } from 'types/pokemon'
import { searchItemAPI } from 'types/searchItem'
import styles from './PokemonMoves.module.css'
import useMoveSearchModal from 'hooks/modals/useMoveSearchModal'
import useAttacker from 'hooks/useAttacker'
import { calculatePower } from 'utils/pokemonMoves'
import { PokemonMove } from 'types/moves'
import AttackerMoveCard from 'components/MoveCard/AttackerMoveCard'
import Spinner from 'components/Spinner/Spinner'

interface PokemonAttacketMovesProps {
  pokemon: Pokemon
  editable?: boolean
  open?: boolean
}

const PokemonAttackerMoves: FC<PokemonAttacketMovesProps> = ({ pokemon, open = false, editable = false }): JSX.Element => {
  const { addMoveToAttacker, removeMoveFromAttacker } = useMove()
  const { openModal } = useMoveSearchModal()
  const { attacker } = useAttacker()

  const isFullMoves = pokemon.moves.length === 4

  const addMove = (move: searchItemAPI): void => {
    if (isFullMoves) return
    addMoveToAttacker(move)
  }

  const remove = (move: PokemonMove): void => removeMoveFromAttacker(move)

  const openAndAddMove = (): void => openModal(addMove)

  if (attacker == null) return <Spinner />
  return (
    <section className={`${styles.container} ${styles.open}`}>
      <>
        {
          pokemon.moves.map((move, id) => (
            <AttackerMoveCard
              key={id}
              move={move}
              open={open}
              power={calculatePower(move, pokemon, attacker)}
              remove={editable ? remove : undefined}
              attacker={attacker}
            />
          ))
        }
        {open && !isFullMoves && <button className={styles.addBtn} onClick={openAndAddMove}>Add move</button>}
      </>
    </section>
  )
}

export default PokemonAttackerMoves
