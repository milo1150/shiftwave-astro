import { Button, DatePicker, Divider, Row } from 'antd'
import {
  CloudSyncOutlined,
  FileExcelFilled,
  SaveFilled,
  SyncOutlined,
} from '@ant-design/icons'

export const ScheduleActionButtons: React.FC = () => {
  return (
    <Row>
      <div>
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
      </div>

      <Divider className="mx-4 text-5xl " type="vertical" />

      <div>
        <DatePicker
          className="mr-2 w-40"
          picker="month"
          format={'MMMM YYYY'}
          allowClear={false}
        />
      </div>
    </Row>
  )
}
