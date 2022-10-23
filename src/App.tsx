import PokeTeam from './components/PokeTeam/PokeTeam'
import styles from './App.module.css'

const App = (): JSX.Element => {
  return (
    <div className={styles.main}>
      <PokeTeam />
    </div>
  )
}

export default App
