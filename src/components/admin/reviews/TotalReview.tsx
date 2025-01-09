import { Flex, Typography } from 'antd'

const { Text } = Typography

const TotalReview: React.FC = () => {
  return (
    <>
      <Flex justify="center" align="center" className="w-1/4" vertical>
        <Text className="text-lg pb-2">Total Reviews</Text>
        <Text className="text-3xl font-medium">10,000</Text>
      </Flex>
    </>
  )
}
export default TotalReview
