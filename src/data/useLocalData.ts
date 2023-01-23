interface useLocalDataI<T> {
  getData: () => T | null
  setData: (data: T | Partial<T>) => void
}

export const useLocalData = <T>(key: string): useLocalDataI<T> => {
  const setLocal = (data: T | Partial<T>): void => localStorage.setItem(key, JSON.stringify(data))

  const getLocal = (): string | null => localStorage.getItem(key)

  const getData = (): T | null => {
    const currentData = getLocal()
    if (currentData == null) {
      return null
    }

    return JSON.parse(currentData)
  }

  const setData = (data: T | Partial<T>): void => {
    const currentData = getData()

    if (Array.isArray(currentData)) {
      return setLocal([...currentData,
        ...(Array.isArray(data) ? data : [data])
      ] as T)
    }

    // typeof null === 'object' 🫠
    if (currentData != null && typeof currentData === 'object') {
      setLocal({
        ...currentData,
        ...data
      })
      return
    }

    setLocal(data)
  }

  return {
    getData,
    setData
  }
}
