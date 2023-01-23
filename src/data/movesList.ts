import { searchItemAPI } from 'types/searchItem'
import { useLocalData } from './useLocalData'

const { getData: getMoveList, setData: setMoveList } = useLocalData<searchItemAPI[]>('moveList')

export {
  getMoveList,
  setMoveList
}
