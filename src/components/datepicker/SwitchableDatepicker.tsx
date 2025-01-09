import { useEffect, useState } from 'react'
import type { DatePickerProps, TimePickerProps } from 'antd'
import { DatePicker, Select, Space } from 'antd'
import { match } from 'ts-pattern'
import dayjs, { Dayjs } from 'dayjs'
import { DATE_FORMAT } from '@src/resources/date'
import type { RangePickerProps } from 'antd/es/date-picker'

const { Option } = Select
const { RangePicker } = DatePicker

export type DatePickerType = 'date' | 'date_range' | 'month' | 'year'

export type HandleOnChangeDateValueType = {
  type: DatePickerType
  startDate: string
  endDate: string
}

type Props = {
  onChangeValueCallBack: (e: HandleOnChangeDateValueType) => void
}

const DatePickerWithType = ({
  type,
  onChange,
  value,
  dateRangeValue,
  onRangePickerChange,
}: {
  type: DatePickerType
  onChange: TimePickerProps['onChange'] | DatePickerProps['onChange']
  dateRangeValue: [Dayjs, Dayjs]
  value: Dayjs
  onRangePickerChange?: RangePickerProps['onChange']
}) => {
  return match(type)
    .with('date', () => (
      <DatePicker
        picker={'date'}
        onChange={onChange}
        format={DATE_FORMAT.DISPLAY}
        allowClear={false}
        value={value}
      />
    ))
    .with('date_range', () => (
      <RangePicker
        defaultValue={dateRangeValue}
        onChange={onRangePickerChange}
        format={DATE_FORMAT.DISPLAY}
        allowClear={false}
      />
    ))
    .with('month', () => (
      <DatePicker
        picker={'month'}
        onChange={onChange}
        format={'MMM YYYY'}
        allowClear={false}
        value={value}
      />
    ))
    .with('year', () => (
      <DatePicker
        picker={'year'}
        onChange={onChange}
        value={value}
        allowClear={false}
      />
    ))
    .exhaustive()
}

const SwitchableDatepicker: React.FC<Props> = ({ onChangeValueCallBack }) => {
  const [dateType, setDateType] = useState<DatePickerType>('date')
  const [dateValue, setDateValue] = useState<Dayjs>(dayjs())
  const [dateRangeValue, setDateRangeValue] = useState<[Dayjs, Dayjs]>([
    dayjs(),
    dayjs(),
  ])

  useEffect(() => {
    match(dateType)
      .with('date_range', () =>
        onChangeValueCallBack({
          type: 'date_range',
          startDate: dateRangeValue[0].toString(),
          endDate: dateRangeValue[1].toString(),
        })
      )
      .when(
        (type) => type === 'date' || type === 'month' || type === 'year',
        () =>
          onChangeValueCallBack({
            type: dateType,
            startDate: dateValue.toString(),
            endDate: '',
          })
      )
  }, [dateType, dateValue, dateRangeValue])

  const onChangeDateValue = (value: dayjs.Dayjs) => {
    setDateValue(value)
  }

  const onChangeDateType = (value: DatePickerType) => {
    setDateType(value)
    setDateValue(dayjs())
  }

  const onChangeDateRangeValue = (value: [Dayjs, Dayjs]) => {
    console.log('onChangeDateRangeValue', value)
    setDateRangeValue(value)
  }

  return (
    <Space>
      <Select
        value={dateType}
        onChange={(value) => onChangeDateType(value)}
        allowClear={false}
      >
        <Option value="date">Date</Option>
        <Option value="date_range">Range</Option>
        <Option value="month">Month</Option>
        <Option value="year">Year</Option>
      </Select>
      <DatePickerWithType
        type={dateType}
        value={dateValue}
        onChange={(value) => onChangeDateValue(value)}
        dateRangeValue={dateRangeValue}
        onRangePickerChange={(e) => onChangeDateRangeValue(e as [Dayjs, Dayjs])}
      />
    </Space>
  )
}

export default SwitchableDatepicker
