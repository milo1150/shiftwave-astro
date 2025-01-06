import { Flex, Rate } from 'antd'

const AverageRating: React.FC = () => {
  return (
    <>
      <Flex justify="center" align="center" className="w-1/3" vertical>
        <p className="text-md pb-2">Average Rating</p>
        <Flex justify="center " align="center">
          <p className="text-3xl mr-2">4.0</p>
          <Rate value={4} className="text-2xl" disabled></Rate>
        </Flex>
      </Flex>
    </>
  )
}
export default AverageRating
