import { Flex, Rate, Typography } from 'antd'

const { Text } = Typography

type Props = {
  value: number
}

const AverageRating: React.FC<Props> = ({ value }) => {
  return (
    <>
      <Flex justify="center" align="center" className="w-1/3" vertical>
        <Text className="text-lg pb-2">Average Rating</Text>
        <Flex justify="center " align="center">
          <Text className="text-3xl mr-2">{value}</Text>
          <Rate value={value} className="text-2xl" disabled allowHalf></Rate>
        </Flex>
      </Flex>
    </>
  )
}
export default AverageRating
