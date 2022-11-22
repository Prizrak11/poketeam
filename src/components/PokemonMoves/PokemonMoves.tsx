import useMove from 'hooks/useMove'
import { FC } from 'react'
import { Pokemon } from 'types/pokemon'
import { searchItemAPI } from 'types/searchItem'
import styles from './PokemonMoves.module.css'
import useMoveSearchModal from 'hooks/modals/useMoveSearchModal'
import MoveCard from 'components/MoveCard/MoveCard'
import useAttacker from 'hooks/useAttacker'
import { calculatePower } from 'utils/pokemonMoves'

interface PokemonMovesProps {
  pokemon: Pokemon
  editable?: boolean
  open?: boolean
}

const PokemonMoves: FC<PokemonMovesProps> = ({ pokemon, open = false, editable = false }): JSX.Element => {
  const { addMoveToPokemon } = useMove()
  const { openModal } = useMoveSearchModal()
  const { attacker } = useAttacker()

  const isFullMoves = pokemon.moves.length === 4

  const addMove = (move: searchItemAPI): void => addMoveToPokemon(move, pokemon)

  const openAndAddMove = (): void => openModal(addMove)

  return (
    <section className={`${styles.container} ${open ? styles.open : ''}`}>
      <>
        {
          pokemon.moves.map((move, id) => (
            <MoveCard
              key={id}
              move={move}
              open={open}
              power={calculatePower(move, pokemon, attacker)}
            />
          ))
        }
        {open && !isFullMoves && <button className={styles.addBtn} onClick={openAndAddMove}>Add move</button>}
      </>
    </section>
  )
}

export default PokemonMoves
