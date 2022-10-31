import useMove from 'hooks/useMove'
import { FC } from 'react'
import { Pokemon } from 'types/pokemon'
import { searchItemAPI } from 'types/searchItem'
import styles from './PokemonMoves.module.css'
import useMoveSearchModal from 'hooks/modals/useMoveSearchModal'
import MoveCard from 'components/MoveCard/MoveCard'

interface PokemonMovesProps {
  pokemon: Pokemon
  open?: boolean
}

const PokemonMoves: FC<PokemonMovesProps> = ({ pokemon, open = false }): JSX.Element => {
  const { addMoveToPokemon } = useMove()
  const { openModal } = useMoveSearchModal()

  const isFullMoves = pokemon.moves.length === 4

  const addMove = (move: searchItemAPI): void => addMoveToPokemon(move, pokemon)

  const openAndAddMove = (): void => openModal(addMove)

  return (
    <section className={`${styles.container} ${open ? styles.open : ''}`}>
      <>
        {
          pokemon.moves.map((move, id) => <MoveCard key={id} move={move} open={open} />)
        }
        {open && !isFullMoves && <button className={styles.addBtn} onClick={openAndAddMove}>Add move</button>}
      </>
    </section>
  )
}

export default PokemonMoves
