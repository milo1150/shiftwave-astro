import { Card, Rate } from 'antd'
import type React from 'react'
import '@src/style/custom-rate-el.css'
import { useState } from 'react'

type Props = {
  score: number
  remark: string
  timestamp: string
}

export const CustomerReviewCard: React.FC<Props> = ({
  score,
  remark,
  timestamp,
}) => {
  return (
    <>
      <Card className="rounded-xl border-slate-50">
        <Rate value={score} className="text-sm" disabled />
        {remark && <p className="text-md py-2">{remark}</p>}
        <p className="text-sm justify-self-end text-gray-400 font-thin">
          {timestamp}
        </p>
      </Card>
    </>
  )
}

export default CustomerReviewCard
