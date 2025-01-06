import { useState } from 'react'
import type { DatePickerProps, TimePickerProps } from 'antd'
import { DatePicker, Select, Space } from 'antd'
import { match } from 'ts-pattern'

const { Option } = Select

type PickerType = 'date' | 'week' | 'month' | 'quarter' | 'year'

const PickerWithType = ({
  type,
  onChange,
}: {
  type: PickerType
  onChange: TimePickerProps['onChange'] | DatePickerProps['onChange']
}) => {
  return match(type)
    .with('date', () => (
      <DatePicker picker={'date'} onChange={onChange} format={'DD-MM-YYYY'} />
    ))
    .with('month', () => (
      <DatePicker picker={'month'} onChange={onChange} format={'MMM-YYYY'} />
    ))
    .otherwise(() => <DatePicker picker={type} onChange={onChange} />)
}

const SwitchableDatepicker: React.FC = () => {
  const [type, setType] = useState<PickerType>('date')

  return (
    <Space>
      <Select value={type} onChange={setType}>
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="quarter">Quarter</Option>
        <Option value="year">Year</Option>
      </Select>
      <PickerWithType type={type} onChange={(value) => console.log(value)} />
    </Space>
  )
}

export default SwitchableDatepicker
