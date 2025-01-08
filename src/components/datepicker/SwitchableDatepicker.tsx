import { useEffect, useState } from 'react'
import type { DatePickerProps, TimePickerProps } from 'antd'
import { DatePicker, Select, Space } from 'antd'
import { match } from 'ts-pattern'
import dayjs, { Dayjs } from 'dayjs'

const { Option } = Select

export type DatePickerType = 'date' | 'week' | 'month' | 'year'

export type HandleOnChangeDateValueType = {
  type: DatePickerType
  value: string
}

type Props = {
  onChangeValueCallBack: (e: HandleOnChangeDateValueType) => void
}

const DatePickerWithType = ({
  type,
  onChange,
  value,
}: {
  type: DatePickerType
  onChange: TimePickerProps['onChange'] | DatePickerProps['onChange']
  value: Dayjs
}) => {
  return match(type)
    .with('date', () => (
      <DatePicker
        picker={'date'}
        onChange={onChange}
        format={'DD-MM-YYYY'}
        allowClear={false}
        value={value}
      />
    ))
    .with('month', () => (
      <DatePicker
        picker={'month'}
        onChange={onChange}
        format={'MMM-YYYY'}
        allowClear={false}
        value={value}
      />
    ))
    .otherwise(() => (
      <DatePicker
        picker={type}
        onChange={onChange}
        value={value}
        allowClear={false}
      />
    ))
}

const SwitchableDatepicker: React.FC<Props> = ({ onChangeValueCallBack }) => {
  const [dateType, setDateType] = useState<DatePickerType>('date')
  const [dateValue, setDateValue] = useState<Dayjs>(dayjs())

  useEffect(() => {
    onChangeValueCallBack({ type: dateType, value: dateValue.toString() })
  }, [dateType, dateValue])

  const onChangeDateValue = (value: dayjs.Dayjs) => {
    setDateValue(value)
  }

  const onChangeDateType = (value: DatePickerType) => {
    setDateType(value)
    setDateValue(dayjs())
  }

  return (
    <Space>
      <Select
        value={dateType}
        onChange={(value) => onChangeDateType(value)}
        allowClear={false}
      >
        <Option value="date">Date</Option>
        <Option value="week">Week</Option>
        <Option value="month">Month</Option>
        <Option value="year">Year</Option>
      </Select>
      <DatePickerWithType
        type={dateType}
        value={dateValue}
        onChange={(value) => onChangeDateValue(value)}
      />
    </Space>
  )
}

export default SwitchableDatepicker
