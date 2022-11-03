import { FC, useEffect, useRef, useState } from 'react'
import usePokemon from 'hooks/usePokemons'
import PokeCard from '../PokeCard/PokeCard'
import styles from './PokeTeam.module.css'
import VoidCard from 'components/PokeCard/VoidCard'
import Spinner from 'components/Spinner/Spinner'
import { usePokemonSearchModal } from 'hooks/modals'
import 'masonry-rows'

const PokeTeam: FC = (): JSX.Element => {
  const { pokemonTeam, loading, addPokemonToTeamFromApi, removePokemonFromTeam } = usePokemon()
  const { openModal } = usePokemonSearchModal()
  const pokemonRefs = useRef<Array<HTMLDivElement | null>>([])
  const [currentOpen, setCurrentOpen] = useState<number>()

  const openModalToTeam = (): void => openModal(addPokemonToTeamFromApi)

  useEffect(() => {
    if (currentOpen == null) return

    const handleClickOutside = (evt: MouseEvent): void => {
      const currentRef = pokemonRefs?.current.at(currentOpen)
      if ((currentRef != null) && !currentRef.contains(evt.target as Node)) setCurrentOpen(undefined)
    }

    document.addEventListener('click', handleClickOutside)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [currentOpen])

  if (loading) return <Spinner />
  return (
    <div>
      <h1 className={styles.title}>Your Team</h1>
      {/* @ts-expect-error */}
      <masonry-rows gap='1rem'>
        {
          pokemonTeam.map((pokemon, id) => {
            if (pokemon === undefined) return <VoidCard key={id} action={openModalToTeam} />
            return (
              <div
                key={id}
                ref={ref => { pokemonRefs.current[id] = ref }}
                onClick={() => setCurrentOpen(id)}
              >
                <PokeCard pokemon={pokemon} remove={removePokemonFromTeam} open={currentOpen === id} />
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
