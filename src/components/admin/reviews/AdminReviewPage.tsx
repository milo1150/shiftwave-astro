import { Col, Divider, Flex, Pagination, Row } from 'antd'
import _ from 'lodash'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

import TotalReview from '@src/components/admin/reviews/TotalReview'
import AverageRating from '@src/components/admin/reviews/AverageRating'
import BarRating from '@src/components/admin/reviews/BarRating'
import CustomerReviewCard from '@src/components/admin/reviews/CustomerReviewCard'
import SwitchableDatepicker from '@src/components/datepicker/SwitchableDatepicker'
import { fetchReviews } from '@src/services/ReviewService'

import type { DefaultPageProps } from '@src/types/DefaultType'
import type React from 'react'

const queryClient = new QueryClient()

const AdminReviewPage: React.FC<DefaultPageProps> = () => {
  const { data: reviews, refetch: refetchReviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: fetchReviews,
  })

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
            <SwitchableDatepicker />
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
          {reviews?.items
            ? (reviews?.items).map((review, i) => {
                return (
                  <Col md={12} xl={8} xxl={6} className="pt-3" key={i}>
                    <CustomerReviewCard
                      score={review.score}
                      remark={review.remark}
                      timestamp={review.created_at}
                    />
                  </Col>
                )
              })
            : []}
        </Row>

        {/* Footer */}
        <Pagination simple defaultCurrent={2} total={50} />
      </Flex>
    </Flex>
  )
}

const WrappedAdminReviewPage: React.FC<DefaultPageProps> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminReviewPage {...props} />
    </QueryClientProvider>
  )
}

export default WrappedAdminReviewPage
