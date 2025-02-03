import React from 'react'
import { Result } from 'antd'

const Error404: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
  />
)

export default Error404
