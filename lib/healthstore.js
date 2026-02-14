// Simple store for health profile using localStorage
export const healthStore = {
  getProfile: () => {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem('healthProfile')
    return stored ? JSON.parse(stored) : null
  },

  setProfile: (profile) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('healthProfile', JSON.stringify(profile))
    }
  },

  clearProfile: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('healthProfile')
    }
  },
}