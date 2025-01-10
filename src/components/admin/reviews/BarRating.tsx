import { Flex, Progress, Typography } from 'antd'
import { StarFilled } from '@ant-design/icons'
import type { AverageRatingResponse } from '@src/types/Review'

const { Text } = Typography

type SingleBarProps = {
  score: number
  percent: number
  count: number
}

const BarValue: React.FC<SingleBarProps> = ({ score, percent, count }) => {
  return (
    <>
      <Flex align="center" className="w-10/12 pl-6">
        <StarFilled className="pr-1 text-gray-300" />
        <Text className="pr-3 text-md w-4">{score}</Text>
        <Progress
          percent={percent}
          status="active"
          showInfo={false}
          size="small"
        />
        <Text
          className="pl-3 text-sm w-24
          text-gray-400"
        >
          {count}
        </Text>
      </Flex>
    </>
  )
}

const BarRating: React.FC<AverageRatingResponse> = (props) => {
  return (
    <>
      <Flex justify="center" className="w-1/3" vertical>
        <BarValue
          score={5}
          percent={props.five_star_percent}
          count={props.five_star_count}
        />
        <BarValue
          score={4}
          percent={props.four_star_percent}
          count={props.four_star_count}
        />
        <BarValue
          score={3}
          percent={props.three_star_percent}
          count={props.three_star_count}
        />
        <BarValue
          score={2}
          percent={props.two_star_percent}
          count={props.two_star_count}
        />
        <BarValue
          score={1}
          percent={props.one_star_percent}
          count={props.one_star_count}
        />
      </Flex>
    </>
  )
}
export default BarRating
