import {
  Row,
  Select,
  Button,
  Drawer,
  Space,
  Switch,
  Typography,
  Input,
} from 'antd'
import { CheckOutlined, CloseOutlined, FilePdfTwoTone } from '@ant-design/icons'
import React, { useState } from 'react'

const { Text } = Typography

const ExportPDF: React.FC = () => {
  return (
    <>
      <Row className="w-full py-2 items-center justify-between">
        <Text className="text-base">Export PDF</Text>
        <Row>
          <Select
            className="mr-2"
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
          <Button type="primary" icon={<FilePdfTwoTone className="text-xl" />}>
            QRCode PDF
          </Button>
        </Row>
      </Row>
    </>
  )
}

const Management: React.FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [displayBranchForm, setDisplayBranchForm] = useState(false)
  const [branchName, setBranchName] = useState<string>()

  const showDrawer = () => {
    setOpenDrawer(true)
  }

  const onCloseDrawer = () => {
    setOpenDrawer(false)
    setBranchName('')
    setDisplayBranchForm(false)
  }

  const onClickNewBranch = () => {
    setDisplayBranchForm((v) => !v)
  }

  const onCancelCreateNewBranch = () => {
    setBranchName('')
    setDisplayBranchForm(false)
  }

  return (
    <>
      <Row className="w-full py-2 items-center justify-between">
        <Text className="text-base">Management</Text>
        <Button type="primary" onClick={showDrawer}>
          Edit
        </Button>
        <Drawer
          title="Branch Management"
          onClose={onCloseDrawer}
          open={openDrawer}
          destroyOnClose={true}
          width={450}
          maskClosable={false}
          extra={
            <Space>
              <Button type="primary" onClick={() => onClickNewBranch()}>
                New Branch
              </Button>
            </Space>
          }
        >
          {/* TODO: loop branches */}
          <Row className="justify-between">
            <Text className="text-lg">Platong</Text>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
            />
          </Row>

          {/* TODO: POST */}
          {displayBranchForm && (
            <Row className="justify-between pt-4 items-center">
              <Input
                placeholder="Branch name"
                className="w-44"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
              />
              <div>
                <Button
                  type="primary"
                  className="w-16 mr-2"
                  disabled={!branchName}
                >
                  Add
                </Button>
                <Button
                  type="primary"
                  className="w-16"
                  onClick={() => onCancelCreateNewBranch()}
                >
                  Cancel
                </Button>
              </div>
            </Row>
          )}
        </Drawer>
      </Row>
    </>
  )
}

const BranchMenu: React.FC = () => {
  return (
    <Row className="w-full">
      <ExportPDF />
      <Management />
    </Row>
  )
}

export default BranchMenu
