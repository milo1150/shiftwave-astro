import { Button, DatePicker, Divider, Input, InputNumber, Row } from 'antd'
import {
  FileExcelFilled,
  MinusOutlined,
  PlusOutlined,
  SaveFilled,
  SyncOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import {
  MAX_SHIFT_PER_SCHEDULE,
  MIN_SHIFT_PER_SCHEDULE,
  type ShiftList,
} from '@src/types/Schedule'

const ShiftListComponent: React.FC = () => {
  const [shiftList, setShiftList] = useState<ShiftList>([
    { description: '', duration: 1 },
  ])

  const onAddShift = (shiftList: ShiftList) => {
    console.log('add')
    if (shiftList.length >= MAX_SHIFT_PER_SCHEDULE) return
    setShiftList((prev) => {
      const newShiftList = [...prev]
      newShiftList.push({ description: '', duration: 1 })
      return newShiftList
    })
  }

  const onDeleteShift = (shiftList: ShiftList) => {
    if (shiftList.length <= MIN_SHIFT_PER_SCHEDULE) return
    setShiftList((prev) => {
      const newShiftList = [...prev]
      newShiftList.pop()
      return newShiftList
    })
  }

  return (
    <section className="flex items-center">
      <section className="flex items-center">
        {shiftList.map((shift, index) => {
          return (
            <div className="flex items-center mr-2" key={`shift-item-${index}`}>
              <Input className="w-16" />
              <span className="mx-1 text-lg">:</span>
              <InputNumber
                className="w-16"
                min={1}
                defaultValue={shift.duration}
              />
            </div>
          )
        })}
      </section>

      <section className="flex items-center">
        <Button
          className="mr-1"
          type="primary"
          shape="circle"
          size="small"
          icon={<PlusOutlined />}
          disabled={shiftList.length === MAX_SHIFT_PER_SCHEDULE}
          onClick={() => onAddShift(shiftList)}
        />
        <Button
          type="primary"
          shape="circle"
          size="small"
          icon={<MinusOutlined />}
          disabled={shiftList.length === MIN_SHIFT_PER_SCHEDULE}
          onClick={() => onDeleteShift(shiftList)}
        />
      </section>
    </section>
  )
}

export const ScheduleActionButtons: React.FC = () => {
  return (
    <Row className="items-center">
      <section>
        <Button
          className="mr-2"
          color="danger"
          variant="solid"
          icon={<SyncOutlined />}
        >
          Random
        </Button>
        <Button
          className="mr-2"
          color="cyan"
          variant="solid"
          icon={<SaveFilled />}
        >
          Save
        </Button>
        <Button color="blue" variant="solid" icon={<FileExcelFilled />}>
          Excel
        </Button>
      </section>

      <Divider className="mx-3 text-2xl  border-gray-300" type="vertical" />

      <section>
        <DatePicker
          className="w-40"
          picker="month"
          format={'MMMM YYYY'}
          allowClear={false}
        />
      </section>

      <Divider className="mx-3 text-2xl  border-gray-300" type="vertical" />

      <ShiftListComponent />
    </Row>
  )
}
