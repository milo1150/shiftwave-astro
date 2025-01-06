import type { DefaultPageProps } from '@src/types/DefaultType'
import type React from 'react'

import { Col, Divider, Flex, Row } from 'antd'
import TotalReview from '@src/components/admin/reviews/TotalReview'
import AverageRating from '@src/components/admin/reviews/AverageRating'
import BarRating from '@src/components/admin/reviews/BarRating'
import CustomerReviewCard from './CustomerReviewCard'
import _ from 'lodash'

const AdminReviewPage: React.FC<DefaultPageProps> = () => {
  return (
    <Flex gap="middle" className="p-3" justify="center" align="center" vertical>
      <Flex
        gap="small"
        className="w-3/5"
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

        {/* Summary */}
        <Flex
          gap="small"
          justify="center"
          align="center"
          className="w-full justify-between pt-5"
        >
          <TotalReview />
          <Divider className="border-gray-300 h-24" type="vertical" />
          <AverageRating />
          <Divider className="border-gray-300 h-24" type="vertical" />
          <BarRating />
        </Flex>

        {/* Card list */}
        <Divider className="border-gray-300 " type="horizontal" />
        <Row
          gutter={12}
          className="overflow-y-auto overflow-x-hidden customer-review-container"
          style={{ height: '75vh' }}
        >
          {_.times(40).map(() => {
            return (
              <Col md={12} xl={8} xxl={6} className="pt-3">
                <CustomerReviewCard />
              </Col>
            )
          })}
        </Row>
      </Flex>
    </Flex>
  )
}

export default AdminReviewPage
