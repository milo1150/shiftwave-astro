import React from 'react'
import { Result } from 'antd'

const Error500: React.FC = () => (
  <Result status="500" title="500" subTitle="Sorry, something went wrong." />
)

export default Error500
