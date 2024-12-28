import type { AvailableLanguage } from '@src/i18n/i18n'
import { useTranslations } from '@src/i18n/utils'
import { Button, Card, ConfigProvider, Rate } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useState } from 'react'

interface Props {
  lang: AvailableLanguage
}

export default function Reviews({ lang }: Props) {
  const t = useTranslations(lang)
  const [value, setValue] = useState<number>(0)

  return (
    <div className="flex text-center justify-center p-9 ">
      <Card className="w-1/3 shadow-lg rounded-xl border-none">
        <p className="text-2xl font-bold">{t('rating.title')}</p>

        <p className="text-md pt-2">{t('rating.subtitle')}</p>

        <div className="pb-6 pt-3">
          <Rate onChange={setValue} value={value} className="text-4xl" />
        </div>

        <div>
          <ConfigProvider
            theme={{
              token: {
                fontFamily: 'kanit',
              },
            }}
          >
            <TextArea
              rows={1}
              maxLength={250}
              placeholder={t('rating.placeholder')}
              style={{ height: 120, resize: 'none' }}
              className="rounded-xl border-slate-200"
            />
          </ConfigProvider>
        </div>

        <div className="pt-3">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#38bdf8',
                colorBorder: 'none',
                fontFamily: 'kanit',
              },
            }}
          >
            <Button
              style={{ height: 45 }}
              className="w-full rounded-xl"
              type="primary"
              disabled={value === 0}
            >
              {t('rating.submit')}
            </Button>
          </ConfigProvider>
        </div>
      </Card>
    </div>
  )
}
