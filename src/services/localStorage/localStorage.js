export default class Storage {
  static async set(key, data) {
    try {
      const value = JSON.stringify(data)
      await localStorage.setItem(key, value)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  static get(key) {
    try {
      const response = localStorage.getItem(key)
      const data = JSON.parse(response) || null
      return data
    } catch (err) {
      throw new Error(err.message)
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  static clear() {
    try {
      localStorage.clear()
    } catch {}
  }
}
