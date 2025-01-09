import { Flex, Rate, Typography } from 'antd'

const { Text } = Typography

const AverageRating: React.FC = () => {
  return (
    <>
      <Flex justify="center" align="center" className="w-1/3" vertical>
        <Text className="text-lg pb-2">Average Rating</Text>
        <Flex justify="center " align="center">
          <Text className="text-3xl mr-2">4.0</Text>
          <Rate value={4} className="text-2xl" disabled></Rate>
        </Flex>
      </Flex>
    </>
  )
}
export default AverageRating
