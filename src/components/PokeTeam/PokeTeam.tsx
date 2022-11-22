import { FC, useEffect, useRef, useState } from 'react'
import usePokemon from 'hooks/usePokemons'
import PokeCard from '../PokeCard/PokeCard'
import styles from './PokeTeam.module.css'
import VoidCard from 'components/PokeCard/VoidCard'
import Spinner from 'components/Spinner/Spinner'
import { usePokemonSearchModal } from 'hooks/modals'
import 'masonry-rows'
import { MenuItem } from 'components/PokeCard/PokeCardContainer'
import useMoveSearchModal from 'hooks/modals/useMoveSearchModal'
import useMove from 'hooks/useMove'
import { searchItemAPI } from 'types/searchItem'

const PokeTeam: FC = (): JSX.Element => {
  const { pokemonTeam, loading, addPokemonToTeamFromApi, removePokemonFromTeam } = usePokemon()
  const { addMoveToPokemon } = useMove()
  const { openModal: openPokemonModal } = usePokemonSearchModal()
  const { openModal: openMoveModal } = useMoveSearchModal()
  const pokemonRefs = useRef<Array<HTMLDivElement | null>>([])
  const [currentEditable, setCurrentEditable] = useState<number>()

  const openModalToTeam = (): void => openPokemonModal(addPokemonToTeamFromApi)

  useEffect(() => {
    if (currentEditable == null) return

    const handleClickOutside = (evt: MouseEvent): void => {
      const currentRef = pokemonRefs?.current.at(currentEditable)
      if ((currentRef != null) && !currentRef.contains(evt.target as Node)) setCurrentEditable(undefined)
    }

    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [currentEditable])

  if (loading) return <Spinner />
  return (
    <div>
      <h1 className={styles.title}>Your Team</h1>
      {/* @ts-expect-error */}
      <masonry-rows gap='1rem'>
        {
          pokemonTeam.map((pokemon, id) => {
            if (pokemon === undefined) return <VoidCard key={id} action={openModalToTeam} />

            const addMove = (move: searchItemAPI): void => addMoveToPokemon(move, pokemon)

            const menu: MenuItem[] = [
              { label: 'Remove', action: () => removePokemonFromTeam(pokemon), error: true },
              { label: 'Add Move', action: () => openMoveModal(addMove) },
              { label: 'Edit', action: () => setCurrentEditable(id) }
            ]

            return (
              <div
                key={id}
                ref={ref => { pokemonRefs.current[id] = ref }}
              >
                <PokeCard pokemon={pokemon} menu={menu} editable={currentEditable === id} />
              </div>
            )
          })
        }
        {/* @ts-expect-error */}
      </masonry-rows>
    </div>
  )
}

export default PokeTeam
