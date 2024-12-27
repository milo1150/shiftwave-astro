export const languages = {
  en: 'English',
  th: 'Thai',
} as const

export const defaultLang: keyof typeof languages = 'en'

export const ui = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
  },
  th: {
    'nav.home': 'บ้าน',
    'nav.about': 'เกี่ยวข้อง',
  },
} as const
