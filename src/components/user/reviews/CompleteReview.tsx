import React, { useMemo } from 'react'
import { Result } from 'antd'
import type { AvailableLanguage } from '@src/i18n/i18n'
import { match } from 'ts-pattern'

type CompleteReviewProps = {
  lang: AvailableLanguage
}

const CompleteReview: React.FC<CompleteReviewProps> = ({ lang }) => {
  const title = useMemo(() => {
    return match(lang)
      .with(
        'th',
        () =>
          'ขอบคุณสำหรับความคิดเห็น เราชื่นชมความเห็นของคุณและจะนำไปพัฒนาบริการของเรา'
      )
      .with(
        'en',
        () =>
          'Thank you for your feedback! We appreciate your thoughts and will use them to improve our service.'
      )
      .with(
        'my',
        () =>
          'သင့်တုံပြန်မှုအတွက် ကျေးဇူးတင်ပါသည်။ ကျွန်ုပ်တို့သည် သင့်အမြင်ကို တန်ဖိုးထားပြီး ၀န်ဆောင်မှုတိုးတက်စေရန် အသုံးချပါမည်။'
      )
      .otherwise(() => 'Thank you for submitting your review.')
  }, [lang])

  return <Result status="success" title={title} />
}

export default CompleteReview
