import { Flex, Typography } from 'antd'

const { Text } = Typography

type Props = {
  value: number
}

const TotalReview: React.FC<Props> = ({ value }) => {
  return (
    <>
      <Flex justify="center" align="center" className="w-1/4" vertical>
        <Text className="text-lg pb-2">Total Reviews</Text>
        <Text className="text-3xl font-medium">{value}</Text>
      </Flex>
    </>
  )
}
export default TotalReview
