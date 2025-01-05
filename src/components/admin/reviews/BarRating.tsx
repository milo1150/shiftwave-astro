import { Flex, Progress } from 'antd'
import { StarFilled } from '@ant-design/icons'

type SingleBarProps = {
  score: number
  percent: number
  count: number
}

const BarValue: React.FC<SingleBarProps> = ({ score, percent, count }) => {
  return (
    <>
      <Flex align="center">
        <StarFilled className="pr-1 text-gray-300" />
        <p className="pr-3 text-md w-4">{score}</p>
        <Progress percent={percent} status="active" showInfo={false} />
        <p className="pl-3 text-sm w-4 text-gray-400">{count}</p>
      </Flex>
    </>
  )
}

const BarRating: React.FC = () => {
  return (
    <>
      <Flex justify="center" className="w-1/3" vertical>
        <BarValue score={5} percent={30} count={500} />
        <BarValue score={4} percent={30} count={20} />
        <BarValue score={3} percent={40} count={200} />
        <BarValue score={2} percent={60} count={34} />
        <BarValue score={1} percent={90} count={1} />
      </Flex>
    </>
  )
}
export default BarRating
