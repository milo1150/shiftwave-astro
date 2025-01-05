import type { DefaultPageProps } from '@src/types/DefaultType'
import type React from 'react'

import { Divider, Flex } from 'antd'
import TotalReview from '@src/components/admin/reviews/TotalReview'
import AverageRating from '@src/components/admin/reviews/AverageRating'
import BarRating from '@src/components/admin/reviews/BarRating'

const AdminReviewPage: React.FC<DefaultPageProps> = () => {
  return (
    <Flex gap="middle" className="p-3" justify="center" align="center" vertical>
      <Flex
        gap="small"
        className="w-1/2"
        justify="center"
        align="center"
        vertical
      >
        {/* Header */}
        <Flex gap="small" className="w-full">
          <Flex className="justify-between w-full">
            <p className="text-3xl font-bold">Reviews</p>
            <p>Filter</p>
          </Flex>
        </Flex>

        {/* Sub */}
        <Flex gap="small" className="w-full justify-between pt-5">
          <TotalReview />
          <Divider className="border-gray-300 h-36" type="vertical" />
          <AverageRating />
          <Divider className="border-gray-300 h-36" type="vertical" />
          <BarRating />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default AdminReviewPage
