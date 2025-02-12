import type { ScheduleTableDataType } from '@src/types/Schedule'
import { ScheduleActionButtons } from '@src/components/admin/schedule/ScheduleActionButton'
import { Button, Input, Table, type TableColumnsType } from 'antd'
import { useEffect, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import _ from 'lodash'
import { MinusCircleFilled } from '@ant-design/icons'

function generateNewScheduleTableRowData(
  rowIndex: number,
  month: Dayjs
): ScheduleTableDataType {
  const defaultScheduleTableRow: ScheduleTableDataType = {
    row: rowIndex,
    key: rowIndex,
    teamMemberName: '',
    month: month.month(),
    monthName: month.format('MMMM'),
  }
  const dayInMonthCollection = getDefaultDayInMonthCollection(month)
  return _.merge(defaultScheduleTableRow, dayInMonthCollection)
}

function getDefaultDayInMonthCollection(month: Dayjs): Record<number, string> {
  const dayInMonth = month.daysInMonth()
  const keyRange = _.range(1, dayInMonth)
  const valueRange = _.fill(Array(dayInMonth), '')
  const dayInMonthCollection = _.zipObject(keyRange, valueRange)
  return dayInMonthCollection
}

function setDefaultScheduleTableDateCollection(
  data: ScheduleTableDataType[],
  month: Dayjs
): ScheduleTableDataType[] {
  const dayInMonthCollection = getDefaultDayInMonthCollection(month)
  const newData = [...data].map((v) => _(v).merge(dayInMonthCollection).value())
  return newData
}

export const ScheduleTable: React.FC = () => {
  const [month, setMonth] = useState<Dayjs>(dayjs())
  const [scheduleTableData, setScheduleTableData] = useState<
    ScheduleTableDataType[]
  >([generateNewScheduleTableRowData(0, month)])

  useEffect(() => {
    console.log('DEBUG:', scheduleTableData)
  }, [scheduleTableData])

  useEffect(() => {
    const newScheduleTableData = setDefaultScheduleTableDateCollection(
      scheduleTableData,
      month
    )
    setScheduleTableData(newScheduleTableData)
  }, [month])

  const onAddNewMember = () => {
    const newMember = generateNewScheduleTableRowData(
      scheduleTableData.length,
      month
    )
    setScheduleTableData([...scheduleTableData, newMember])
  }

  const onDeleteMember = (rowIndex: number) => {
    if (scheduleTableData.length === 1) return
    const newScheduleTableData = scheduleTableData.filter(
      (v, index) => index !== rowIndex
    )
    setScheduleTableData(newScheduleTableData)
  }

  const onChangeMemberName = (rowIndex: number, value: string) => {
    setScheduleTableData((state) => {
      const newState = [...state]
      newState[rowIndex].teamMemberName = value
      return newState
    })
  }

  const onChangeShift = (rowIndex: number, date: number, value: string) => {
    setScheduleTableData((state) => {
      const newState = [...state]
      newState[rowIndex][date] = value
      return newState
    })
  }

  const columns: TableColumnsType<ScheduleTableDataType> = [
    {
      title: 'Name',
      dataIndex: 'teamMemberName',
      key: 'teamMemberName',
      width: 200,
      fixed: 'left',
      align: 'center',
      render(_, record, index) {
        return (
          <div className="flex items-center">
            <MinusCircleFilled
              className="text-red-400 mr-2 cursor-pointer"
              onClick={() => onDeleteMember(index)}
            />
            <Input
              className="justify-items-center"
              value={record.teamMemberName}
              onChange={(e) => onChangeMemberName(index, e.target.value)}
            />
          </div>
        )
      },
    },
    {
      title: 'Month', // should be month value
      key: 'monthName',
      // should be length of month
      children: Array.from({ length: 30 }).map((_, i) => {
        return {
          title: i + 1,
          key: 'dayOfWeek',
          width: 50,
          align: 'center',
          children: [
            {
              title: i + 1,
              dataIndex: i,
              key: 'shiftValue',
              width: 50,
              align: 'center',
              onCell: false,
              render(value: string, record, index) {
                return (
                  <Input className="justify-items-center" value={record.row} />
                )
              },
            },
          ],
        }
      }),
    },
  ]

  return (
    <>
      <ScheduleActionButtons
        addNewMember={onAddNewMember}
        month={month}
        setMonth={setMonth}
      />
      <Table<ScheduleTableDataType>
        columns={columns}
        dataSource={scheduleTableData}
        bordered
        size="middle"
        scroll={{ x: '1000', y: 'auto' }}
        pagination={false}
      />
    </>
  )
}
