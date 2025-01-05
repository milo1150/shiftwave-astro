import { useTranslations } from '@src/i18n/utils'
import { Button, Card, ConfigProvider, Input, Rate } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { createReview, generatePDF } from '@src/services/ReviewService'
import type { DefaultPageProps } from '@src/types/DefaultType'

export interface Props extends DefaultPageProps {
  branchId: number | null
}

const ReviewComponent: React.FC<Props> = ({ lang, branchId }) => {
  const t = useTranslations(lang)

  const [reviewScore, setReviewScore] = useState<number>(0)
  const [remark, setRemark] = useState<string>('')

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    retry: false,
  })

  const generatePdfMutation = useMutation({
    mutationFn: generatePDF,
    retry: false,
  })

  return (
    <div className="flex text-center justify-center p-9 ">
      <Card className="w-1/3 shadow-lg rounded-xl border-none">
        <p className="text-2xl font-bold">{t('rating.title')}</p>

        <p className="text-md pt-2">{t('rating.subtitle')}</p>

        <div className="pb-6 pt-3">
          <Rate
            onChange={setReviewScore}
            value={reviewScore}
            className="text-4xl"
          />
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
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </ConfigProvider>
        </div>

        <div className="pt-1">
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
              disabled={reviewScore === 0 && typeof branchId === 'number'}
              loading={createReviewMutation.status === 'pending'}
              onClick={() =>
                branchId &&
                createReviewMutation.mutate({
                  branch: branchId,
                  remark,
                  score: reviewScore,
                })
              }
            >
              {t('rating.submit')}
            </Button>
          </ConfigProvider>

          <div className="pt-1">
            <Button
              style={{ height: 45 }}
              className="w-full rounded-xl"
              type="primary"
              loading={createReviewMutation.status === 'pending'}
              onClick={() =>
                branchId && generatePdfMutation.mutate({ branchId })
              }
            >
              example generate pdf
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ReviewComponent
