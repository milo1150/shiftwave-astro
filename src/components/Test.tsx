import React from 'react'
import { Button } from 'antd'

export default function Test() {
  console.log('hello')
  return (
    <>
      Test
      <Button onSubmit={() => console.log('click')}>hello</Button>
    </>
  )
}
