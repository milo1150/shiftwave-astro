import {
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Pagination,
  Row,
  theme,
  Typography,
} from 'antd'
import _ from 'lodash'
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from '@tanstack/react-query'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { useState } from 'react'
import dayjs from 'dayjs'
import { match } from 'ts-pattern'

import type { DefaultPageProps } from '@src/types/DefaultType'
import type React from 'react'
import type { FetchReviewsQueryParams } from '@src/types/Review'

import TotalReview from '@src/components/admin/reviews/TotalReview'
import AverageRating from '@src/components/admin/reviews/AverageRating'
import BarRating from '@src/components/admin/reviews/BarRating'
import CustomerReviewCard from '@src/components/admin/reviews/CustomerReviewCard'
import SwitchableDatepicker, {
  type HandleOnChangeDateValueType,
} from '@src/components/datepicker/SwitchableDatepicker'
import { fetchReviews } from '@src/services/ReviewService'
import { DATE_FORMAT } from '@src/resources/date'
import { useAntdStore } from '@src/store/store'

dayjs.extend(weekOfYear)

const queryClient = new QueryClient()
const { Text } = Typography

const AdminReviewPage: React.FC<DefaultPageProps> = () => {
  const { darkTheme } = useAntdStore((state) => state)
  const [params, setParams] = useState<FetchReviewsQueryParams>({
    page: 1,
    page_size: 20,
    date_type: 'date',
    start_date: dayjs().format(DATE_FORMAT.API),
  })

  const { data: reviews } = useInfiniteQuery({
    queryKey: ['reviews', params],
    initialPageParam: params,
    queryFn: ({ pageParam }) => fetchReviews(pageParam),
    getNextPageParam: () => undefined,
    retry: false,
  })

  const handleOnChangeDateValue = (e: HandleOnChangeDateValueType) => {
    const startDate = match(e.type)
      .with('date', () => dayjs(e.startDate).format(DATE_FORMAT.API))
      .with('date_range', () => dayjs(e.startDate).format(DATE_FORMAT.API))
      .otherwise(() => undefined)

    const endDate = match(e.type)
      .with('date_range', () => dayjs(e.endDate).format(DATE_FORMAT.API))
      .otherwise(() => undefined)

    const month = match(e.type)
      .with('month', () => dayjs(e.startDate).month() + 1)
      .otherwise(() => undefined)

    const year = match(e.type)
      .with('year', () => dayjs(e.startDate).year())
      .otherwise(() => undefined)

    setParams((prev) => {
      return {
        ...prev,
        date_type: e.type,
        start_date: startDate,
        end_date: endDate,
        month,
        year,
      }
    })
  }

  const handleOnChangePaginate = (page: number, pageSize: number) => {
    setParams((prev) => {
      return { ...prev, page, page_size: pageSize }
    })
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: darkTheme ? theme.darkAlgorithm : [],
      }}
    >
      <Flex
        gap="middle"
        className="p-3"
        justify="center"
        align="center"
        vertical
      >
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
              <Text className="text-3xl font-bold">Reviews</Text>
              <SwitchableDatepicker
                onChangeValueCallBack={(e) => handleOnChangeDateValue(e)}
              />
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
            className="overflow-y-auto overflow-x-hidden content-start customer-review-container"
            style={{ height: '75vh' }}
          >
            {reviews?.pages.length
              ? (reviews?.pages[0].items).map((review, i) => {
                  return (
                    <Col md={12} xl={8} xxl={6} className="pt-3 h-fit" key={i}>
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
          <Pagination
            simple
            defaultCurrent={params.page}
            defaultPageSize={params.page_size}
            total={reviews?.pages[0].total_items || 0}
            onChange={(page, pageSize) =>
              handleOnChangePaginate(page, pageSize)
            }
          />
        </Flex>
      </Flex>
    </ConfigProvider>
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
