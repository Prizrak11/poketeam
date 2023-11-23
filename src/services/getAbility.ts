import { PokemonAbility, AbilityAPI, transformApiToAbility } from '../types/abilities'

export const getAbilityInfo = async (url: string): Promise<PokemonAbility> => {
  return await new Promise((resolve, reject) => {
    fetch(url)
      .then(async data => await data.json())
      .then((ability: AbilityAPI) => resolve(transformApiToAbility(ability)))
      .catch(reject)
  })
}
