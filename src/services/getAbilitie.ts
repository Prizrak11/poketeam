import { PokemonAbilitie, AbilitieAPI, transformApiToAbilitie } from './../types/abilities'

export const getAbilitieInfo = async (url: string): Promise<PokemonAbilitie> => {
  return await new Promise((resolve, reject) => {
    fetch(url)
      .then(async data => await data.json())
      .then((abilitie: AbilitieAPI) => resolve(transformApiToAbilitie(abilitie)))
      .catch(reject)
  })
}
