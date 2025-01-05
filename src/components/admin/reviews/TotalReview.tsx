import { Flex } from 'antd'

const TotalReview: React.FC = () => {
  return (
    <>
      <Flex justify="center" align="center" className="w-1/4" vertical>
        <p className="text-md pb-2">Total Reviews</p>
        <p className="text-3xl font-medium">10,000</p>
      </Flex>
    </>
  )
}
export default TotalReview
