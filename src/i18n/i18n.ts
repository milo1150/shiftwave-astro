export const languages = {
  en: 'English',
  th: 'Thai',
} as const
export type AvailableLanguage = keyof typeof languages

export const defaultLang: AvailableLanguage = 'en'

export const langJson = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
  },
  th: {
    'nav.home': 'บ้าน',
    'nav.about': 'เกี่ยวข้อง',
  },
} as const
