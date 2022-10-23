export const sanitizePokemon = (name: string): string => name.toLowerCase().trim().replace(/\s/g, '')
