import { Flex, Progress, Typography } from 'antd'
import { StarFilled } from '@ant-design/icons'

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

const BarRating: React.FC = () => {
  return (
    <>
      <Flex justify="center" className="w-1/3" vertical>
        <BarValue score={5} percent={30} count={50000} />
        <BarValue score={4} percent={30} count={20} />
        <BarValue score={3} percent={40} count={200} />
        <BarValue score={2} percent={60} count={34} />
        <BarValue score={1} percent={90} count={1} />
      </Flex>
    </>
  )
}
export default BarRating
