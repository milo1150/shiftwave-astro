import {
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Pagination,
  Row,
  Select,
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
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { match } from 'ts-pattern'

import type { DefaultPageProps } from '@src/types/DefaultType'
import type React from 'react'
import type { FetchReviewsQueryParams, Review } from '@src/types/Review'

import TotalReview from '@src/components/admin/reviews/TotalReview'
import AverageRating from '@src/components/admin/reviews/AverageRating'
import BarRating from '@src/components/admin/reviews/BarRating'
import CustomerReviewCard from '@src/components/admin/reviews/CustomerReviewCard'
import SwitchableDatepicker, {
  type HandleOnChangeDateValueType,
} from '@src/components/datepicker/SwitchableDatepicker'
import {
  fetchAverageRating,
  fetchReviews,
  sseReviews,
  webSocketReviews,
} from '@src/services/ReviewService'
import { DATE_FORMAT } from '@src/resources/date'
import { useAntdStore, useSettingStore } from '@src/store/store'
import { AdminGuard } from '@src/auth/AuthGuard'
import { useBranchQuery } from '@src/hooks/Branch'
import type { DefaultOptionType } from 'antd/es/select'

const { Text } = Typography

dayjs.extend(weekOfYear)

const queryClient = new QueryClient()

type ReviewPageFilterProps = {
  dateChangeCallback: (e: HandleOnChangeDateValueType) => void
  branchChangeCallback: (e: string) => void
  setParams: React.Dispatch<React.SetStateAction<FetchReviewsQueryParams>>
}

const ReviewPageFilter: React.FC<ReviewPageFilterProps> = ({
  dateChangeCallback,
  branchChangeCallback,
  setParams,
}) => {
  const { branches } = useBranchQuery()
  const { branchOptions } = useSettingStore((state) => state)
  const [branchUuid, setBrachUuid] = useState<string>(
    branches?.pages[0][0].name || ''
  )

  useEffect(() => {
    if (branches && branches?.pages[0].length > 0) {
      // TODO: should match user's branch
      console.log('branch inc', branches)
      setBrachUuid(branches?.pages[0][0].name)
      setParams((prev) => {
        return { ...prev, branch: branches?.pages[0][0].branch_uuid }
      })
    }
  }, [branches])

  return (
    <Row className="justify-center content-center">
      <Select
        style={{ width: '250px' }}
        options={branchOptions()}
        className="mr-2"
        value={branchUuid}
        onChange={(_, optionValues) => {
          if (!optionValues) return
          const branchOpt = optionValues as DefaultOptionType
          setBrachUuid(branchOpt.value as string)
          branchChangeCallback(branchOpt.value as string)
        }}
      />
      <SwitchableDatepicker
        onChangeValueCallBack={(e) => dateChangeCallback(e)}
      />
    </Row>
  )
}

const AdminReviewPage: React.FC<DefaultPageProps> = () => {
  const { darkTheme } = useAntdStore((state) => state)
  const [params, setParams] = useState<FetchReviewsQueryParams>({
    page: 1,
    page_size: 20,
    date_type: 'date',
    start_date: dayjs().format(DATE_FORMAT.API),
    branch: '',
  })

  const { data: reviews, refetch: refetchReviews } = useInfiniteQuery({
    queryKey: ['reviews', params],
    initialPageParam: params,
    queryFn: ({ pageParam }) => fetchReviews(pageParam),
    getNextPageParam: () => undefined,
    retry: 2,
    enabled: !!params.branch,
  })

  const { data: averageRating, refetch: refetchAverageRating } =
    useInfiniteQuery({
      queryKey: [
        'averageRating',
        params.start_date,
        params.end_date,
        params.month,
        params.year,
        params.branch,
      ],
      initialPageParam: params,
      queryFn: ({ pageParam }) => fetchAverageRating(pageParam),
      getNextPageParam: () => undefined,
      retry: 2,
      enabled: !!params.branch,
    })

  useEffect(() => {
    // SSE - realtime fetching review list
    sseReviews(refetchReviews, refetchAverageRating)

    // WebSocket - realtime fetching review list
    // webSocketReviews(refetchReviews, refetchAverageRating)
  }, [])

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
      .when(
        (type) => type === 'month' || type === 'year',
        () => dayjs(e.startDate).year()
      )
      .otherwise(() => undefined)

    // Trigger params change will automatic refetch apis
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

  const handleOnChangeBranch = (e: string) => {
    console.log('change branch', e)
    // Trigger params change will automatic refetch apis
    setParams((prev) => {
      return {
        ...prev,
        branch: e,
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

              {/* Filter */}
              <ReviewPageFilter
                dateChangeCallback={handleOnChangeDateValue}
                branchChangeCallback={handleOnChangeBranch}
                setParams={setParams}
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
            <TotalReview value={averageRating?.pages[0].total_review || 0} />
            <Divider className="border-gray-300 h-24" type="vertical" />
            <AverageRating
              value={averageRating?.pages[0].average_rating || 0}
            />
            <Divider className="border-gray-300 h-24" type="vertical" />
            <BarRating {...averageRating?.pages[0]!} />
          </Flex>

          {/* Card list */}
          <Divider className="border-gray-300 " type="horizontal" />
          <Row
            gutter={12}
            className="overflow-y-auto overflow-x-hidden content-start customer-review-container"
            style={{ height: '75vh' }}
          >
            {reviews?.pages[0].items.length
              ? (reviews?.pages[0].items).map((review, i) => {
                  return (
                    <Col md={12} xl={8} xxl={6} className="pt-3 h-fit" key={i}>
                      <CustomerReviewCard
                        score={review.score}
                        remark={review.remark}
                        timestamp={review.created_at}
                        remark_en={review.remark_en}
                        lang={review.lang}
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
    <AdminGuard>
      <QueryClientProvider client={queryClient}>
        <AdminReviewPage {...props} />
      </QueryClientProvider>
    </AdminGuard>
  )
}

export default WrappedAdminReviewPage
