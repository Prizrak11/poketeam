import PokeTeam from './components/PokeTeam/PokeTeam'
import Attacker from 'components/Attacker/Attacker'
import styles from './App.module.css'

const App = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <PokeTeam />
      <Attacker />
    </div>
  )
}

export default App
