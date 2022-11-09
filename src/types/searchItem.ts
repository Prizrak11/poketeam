export interface searchItemAPI {
  name: string
  url: string
}

export const sanitizeItem = (item: searchItemAPI): searchItemAPI => {
  const { name, ...rest } = item

  return { ...rest, name: name.replaceAll('-', ' ') }
}
