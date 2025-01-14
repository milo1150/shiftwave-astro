export const languages = {
  en: 'English',
  th: 'Thai',
  my: 'Myanmar',
} as const
export type AvailableLanguage = keyof typeof languages

export const defaultLang: AvailableLanguage = 'en'

export const langJson = {
  en: {
    'rating.title': 'Rate Our Service',
    'rating.subtitle': 'How was your experience ?',
    'rating.placeholder': 'Add a comment...',
    'rating.submit': 'Submit',
  },
  th: {
    'rating.title': 'ช่วยให้คะแนนบริการของเรา',
    'rating.subtitle': 'คุณรู้สึกอย่างไรกับประสบการณ์ที่ได้รับ ?',
    'rating.placeholder': 'ความคิดเห็นเพิ่มเติม...',
    'rating.submit': 'บันทึก',
  },
  my: {
    'rating.title': 'ကျွန်ုပ်တို့၏ဝန်ဆောင်မှုကို အဆင့်သတ်မှတ်ပါ။',
    'rating.subtitle': 'မင်းရဲ့ အတွေ့အကြုံက ဘယ်လိုလဲ။',
    'rating.placeholder': 'မှတ်ချက်တစ်ခုထည့်ပါ။',
    'rating.submit': 'တင်ပြပါ။',
  },
} as const

export type LANG = 'TH' | 'EN' | 'MY'
