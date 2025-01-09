import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AntdStore = {
  darkTheme: boolean
  toggleDarkTheme: () => void
}

export const useAntdStore = create<AntdStore>()(
  persist(
    (set) => ({
      darkTheme: true,
      toggleDarkTheme: () => set((state) => ({ darkTheme: !state.darkTheme })),
    }),
    { name: 'sf-antd' }
  )
)
