import { transformBranchOptions } from '@src/dto/Branch'
import type { Branch } from '@src/types/Branch'
import type { DefaultOptionType } from 'antd/es/select'
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

type SettingStore = {
  branches: Branch[]
  setBranches: (branches: Branch[]) => void
  branchOptions: () => DefaultOptionType[]
}

export const useSettingStore = create<SettingStore>()((set, get) => ({
  branches: [],
  setBranches: (items) => set(() => ({ branches: items })),
  branchOptions: () => transformBranchOptions(get().branches),
}))
