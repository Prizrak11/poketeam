import Tooltip from 'components/Tooltip/Tooltip'
import TypeBadge from 'components/TypeBadge/TypeBadge'
import { FC } from 'react'
import { FiTarget } from 'react-icons/fi'
import { IoIosClose } from 'react-icons/io'
import { TbArrowBigUpLine } from 'react-icons/tb'
import { PokemonMove } from 'types/moves'
import styles from './MoveCard.module.css'
import MoveProp from './MoveProp'
import usePokemon from 'hooks/usePokemons'
import Spinner from 'components/Spinner/Spinner'
import { getWeak } from 'utils/pokemon'
import { PokemonType } from 'types/pokemonTypes'
import { getMoveTip } from 'utils/tooltip'
import { Pokemon } from 'types/pokemon'
import { calculatePower } from 'utils/pokemonMoves'

interface AttackerMoveCardProps {
  move: PokemonMove
  open?: boolean
  power: number
  remove?: (move: PokemonMove) => void
  attacker: Pokemon
}

const AttackerMoveCard: FC<AttackerMoveCardProps> = ({ move, open = false, power, remove, attacker }): JSX.Element => {
  const { pokemonTeam: rawPokemonTeam, loading } = usePokemon()

  const sectionClass = `
    ${styles.container}
    ${styles.attacker}
    ${open ? styles.open : ''}
    `

  const pokemonTeam = rawPokemonTeam.filter(Boolean)

  if (loading) return <Spinner />
  return (
    <section className={sectionClass}>
      <div className={styles.background} />
      <div className={styles.badge}>
        <TypeBadge
          type={move.type}
          big={open}
          tooltip={move.type.name}
          stab={Boolean(move.stab > 1)}
        />
      </div>
      <section className={styles.attack}>
        {remove != null && <button className={styles.removeBtn} onClick={() => remove(move)}><IoIosClose /></button>}
        <Tooltip content={!open ? move?.effect : undefined}>
          <p className={styles.title}>{move.name}</p>
        </Tooltip>
        <section className={styles.info}>
          {
          move.accuracy != null && (
            <MoveProp content={`${move.accuracy}`} tooltip='Accuracy' icon={<FiTarget />} />
          )
        }
          {
          move.priority != null && move.priority !== 0 && (
            <MoveProp content={`${move.priority}`} tooltip='Priority' icon={<TbArrowBigUpLine />} />
          )
        }
        </section>
        {open && <p className={styles.description}>{move.effect}</p>}
      </section>
      <section className={styles.poketeam}>
        {
            pokemonTeam.map((pokemon, i) => {
              const weak = getWeak(pokemon, move.type) * move.stab
              const overpower = calculatePower(move, attacker, pokemon) > 100 || weak >= 2
              const type = {
                name: pokemon.name,
                color: 'transparent',
                icon: pokemon.miniSprite
              } as any as PokemonType

              return (
                <div key={i} className={`${styles.pokemon} ${overpower ? styles.overpower : ''}`}>
                  <TypeBadge
                    type={type} weak={{ to: weak }}
                    big={open}
                    tooltip={getMoveTip(move, pokemon)}
                  />
                  <p key={i} className={styles.pokemonTitle}>{pokemon.name}</p>
                </div>
              )
            })
          }
      </section>
    </section>
  )
}

export default AttackerMoveCard
