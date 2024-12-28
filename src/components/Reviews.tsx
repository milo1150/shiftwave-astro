import type { AvailableLanguage } from '@src/i18n/i18n'
import { useTranslations } from '@src/i18n/utils'
import { Button, Card, Rate } from 'antd'
import { z } from 'astro/zod'
import { useState } from 'react'

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful']

interface Props {
  lang: AvailableLanguage
}

export default function Reviews({ lang }: Props) {
  const t = useTranslations(lang)
  const [value, setValue] = useState<number>(5)

  return (
    <div className="flex text-center justify-center p-9 h-svh">
      <Card title="hello-world" className="w-1/3">
        <p>{t('nav.about')}</p>
        <div>
          <Rate
            tooltips={desc}
            onChange={setValue}
            value={value}
            className="text-4xl"
          />
        </div>
      </Card>

      {/* <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button> */}
    </div>
  )
}
