import { convertLangEnum, useTranslations } from '@src/i18n/utils'
import { Button, Card, Col, ConfigProvider, Input, Rate, Row } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { checkReviewRateLimit, createReview } from '@src/services/ReviewService'
import type { DefaultPageProps } from '@src/types/DefaultType'
import type { AxiosError } from 'axios'
import CompleteReview from './CompleteReview'

export interface Props extends DefaultPageProps {
  branchId: string | null
}

const UserReviewComponent: React.FC<Props> = ({ lang, branchId }) => {
  const t = useTranslations(lang)

  const [isRateLimit, setIsRateLimit] = useState<boolean>(true)
  const [reviewScore, setReviewScore] = useState<number>(0)
  const [remark, setRemark] = useState<string>('')

  const checkRateLimitMutation = useMutation({
    mutationFn: checkReviewRateLimit,
    retry: false,
    onSuccess: () => {
      setIsRateLimit(false)
    },
    onError: (err: AxiosError) => {
      console.log(err.status)
      if (err.status !== 429) {
        setIsRateLimit(true)
      }
    },
  })

  const createReviewMutation = useMutation({
    mutationFn: createReview,
    retry: false,
    onSuccess: () => {
      setIsRateLimit(true)
    },
  })

  const onClickCreate = () => {
    if (!branchId) {
      console.warn('branch required')
      return
    }

    createReviewMutation.mutate({
      branch: branchId,
      score: reviewScore,
      remark: remark,
      lang: convertLangEnum(lang),
    })
  }

  useEffect(() => {
    checkRateLimitMutation.mutate()
  }, [])

  if (checkRateLimitMutation.isPending) {
    return null
  }

  if (isRateLimit) {
    return (
      <div className="h-full content-center place-items-center font-bold">
        <CompleteReview lang={lang} />
      </div>
    )
  }

  return (
    <Row className="justify-center h-full">
      <Col
        xl={10}
        lg={18}
        xs={24}
        className="flex text-center justify-center p-2"
      >
        <div className="w-full h-full flex flex-col shadow-lg rounded-xl border-none p-5">
          <p className="text-xl font-bold">{t('rating.title')}</p>

          <p className="text-sm pt-2">{t('rating.subtitle')}</p>

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
                disabled={reviewScore === 0 && typeof branchId === 'number'}
                loading={createReviewMutation.status === 'pending'}
                onClick={() => onClickCreate()}
              >
                {t('rating.submit')}
              </Button>
            </ConfigProvider>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default UserReviewComponent
