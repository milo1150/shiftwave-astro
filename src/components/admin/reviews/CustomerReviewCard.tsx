import { Card, Rate } from 'antd'
import type React from 'react'
import '@src/style/custom-rate-el.css'
import { useState } from 'react'

export const CustomerReviewCard: React.FC = () => {
  const [{ remark, timestamp }] = useState<{
    remark: string
    timestamp: string
  }>({
    remark: `Lorem ipsum odor amet, consectetuer adipiscing elit. Ligula lectus
          maximus vehicula mi fames feugiat. Rhoncus phasellus maecenas
          ridiculus purus sodales lacus. Suspendisse pharetra montes tempor
          lobortis vestibulum enim fermentum quisque massa waja mamama.`,
    timestamp: '12/09/2025 15:30',
  })

  return (
    <>
      <Card className="rounded-xl border-slate-50">
        <Rate value={5} className="text-sm" disabled />
        <p className="text-md">{remark}</p>
        <p className="text-sm justify-self-end text-gray-400 font-thin">
          {timestamp}
        </p>
      </Card>
    </>
  )
}

export default CustomerReviewCard
