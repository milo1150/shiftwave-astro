import { Card, Rate, Tooltip } from 'antd'
import { TranslationOutlined } from '@ant-design/icons'
import type React from 'react'
import '@src/styles/custom-rate-el.css'
import { useState } from 'react'
import type { LANG } from '@src/i18n/i18n'

type Props = {
  score: number
  remark: string
  timestamp: string
  remark_en: string
  lang: LANG
}

export const CustomerReviewCard: React.FC<Props> = ({
  score,
  remark,
  timestamp,
  remark_en,
  lang,
}) => {
  const [useDefaultLang, setUseDefaultLang] = useState<boolean>(true)

  return (
    <>
      <Card className="rounded-xl border-slate-50 border-none">
        <div className="flex">
          <Rate value={score} className="text-sm" disabled />
          {remark_en && (
            <Tooltip title={`Switch to ${useDefaultLang ? 'EN' : lang}`}>
              <TranslationOutlined
                className="text-xl pl-3 cursor-pointer"
                onClick={() => setUseDefaultLang((v) => !v)}
              />
            </Tooltip>
          )}
        </div>

        {remark && (
          <p className="text-md py-2">
            {remark_en !== '' ? (useDefaultLang ? remark : remark_en) : remark}
          </p>
        )}

        <p className="text-sm justify-self-end text-gray-400 font-thin">
          {timestamp}
        </p>
      </Card>
    </>
  )
}

export default CustomerReviewCard
