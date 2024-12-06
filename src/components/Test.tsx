import React from 'react'
import { Button, Flex, Select, Space } from 'antd'

export default function Test() {
  const hello = () => console.log('hello')
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <Flex vertical gap="middle">
      <Space wrap className="bg-red-500">
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
            { value: 'disabled', label: 'Disabled', disabled: true },
          ]}
        />
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          disabled
          options={[{ value: 'lucy', label: 'Lucy' }]}
        />
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          loading
          options={[{ value: 'lucy', label: 'Lucy' }]}
        />
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          allowClear
          options={[{ value: 'lucy', label: 'Lucy' }]}
          placeholder="select it"
        />
      </Space>

      <Flex gap="middle" wrap>
        <Button color="default" variant="solid">
          Solid
        </Button>
        <Button color="default" variant="outlined">
          Outlined
        </Button>
        <Button color="default" variant="dashed">
          Dashed
        </Button>
        <Button color="default" variant="filled">
          Filled
        </Button>
        <Button color="default" variant="text">
          Text
        </Button>
        <Button color="default" variant="link">
          Link
        </Button>
      </Flex>
    </Flex>
  )
}
