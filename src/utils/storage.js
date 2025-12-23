// Utilitário para gerenciar dados no localStorage

export const StorageKeys = {
  VOTOS: 'mapa_eleitoral_votos',
  PASSEATAS: 'mapa_eleitoral_passeatas',
  CAMPANHAS: 'mapa_eleitoral_campanhas',
  GASTOS: 'mapa_eleitoral_gastos',
  PESQUISAS: 'mapa_eleitoral_pesquisas',
}

export const getStorageData = (key) => {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error(`Erro ao ler ${key}:`, error)
    return []
  }
}

export const setStorageData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
    return true
  } catch (error) {
    console.error(`Erro ao salvar ${key}:`, error)
    return false
  }
}

export const addStorageItem = (key, item) => {
  const data = getStorageData(key)
  const newItem = {
    ...item,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  data.push(newItem)
  setStorageData(key, data)
  return newItem
}

export const updateStorageItem = (key, id, updatedItem) => {
  const data = getStorageData(key)
  const index = data.findIndex(item => item.id === id)
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem, updatedAt: new Date().toISOString() }
    setStorageData(key, data)
    return data[index]
  }
  return null
}

export const deleteStorageItem = (key, id) => {
  const data = getStorageData(key)
  const filtered = data.filter(item => item.id !== id)
  setStorageData(key, filtered)
  return true
}

