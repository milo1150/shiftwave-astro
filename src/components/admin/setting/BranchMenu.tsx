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
import React, { useEffect, useState } from 'react'
import { generatePDF } from '@src/services/PdfService'
import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import {
  createBrach,
  fetchBranches,
  updateBrach,
} from '@src/services/BranchService'
import type { Branch } from '@src/types/Branch'
import { useBranchQuery } from '@src/hooks/Branch'

const { Text } = Typography

type ExportPdfProps = {
  branches: Branch[]
}

const ExportPDF: React.FC<ExportPdfProps> = ({ branches }) => {
  const [branchUuid, setBranchUuid] = useState<string>('')

  useEffect(() => {
    if (branches.length > 0) {
      setBranchUuid(branches[0].branch_uuid)
    }
  }, [branches])

  const generatePdfMutation = useMutation({
    mutationFn: generatePDF,
    retry: false,
  })

  return (
    <>
      <Row className="w-full py-2 items-center justify-between">
        <Text className="text-base">Export PDF</Text>
        <Row>
          <Select
            className="mr-2"
            value={branchUuid}
            style={{ width: 220 }}
            onChange={(uuid) => setBranchUuid(uuid)}
            options={branches?.map((branch) => {
              return { value: branch.branch_uuid, label: branch.name }
            })}
          />
          <Button
            type="primary"
            icon={<FilePdfTwoTone className="text-xl" />}
            onClick={() =>
              branchUuid && generatePdfMutation.mutate({ branchUuid })
            }
          >
            QRCode PDF
          </Button>
        </Row>
      </Row>
    </>
  )
}

type BranchManagementProps = {
  branches: Branch[]
  refetchBranch: any
}

const BranchManagement: React.FC<BranchManagementProps> = ({
  branches: branchesProp,
  refetchBranch,
}) => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [displayBranchForm, setDisplayBranchForm] = useState(false)
  const [branchName, setBranchName] = useState<string>('')
  const [branches, setBranches] = useState<Branch[]>([])

  useEffect(() => {
    if (branchesProp.length > 0) {
      setBranches([...branchesProp])
    }
  }, [branchesProp])

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

  const updateBranchStatusMutation = useMutation({
    mutationFn: updateBrach,
    retry: false,
    onSuccess: () => {
      refetchBranch()
    },
  })

  const onChangeBranchActiveStatus = (status: boolean, branchUuid: string) => {
    // Send PATCH request
    updateBranchStatusMutation.mutate({ isActive: status, branchUuid })
  }

  const createBranch = useMutation({
    mutationFn: createBrach,
    retry: false,
    onSuccess: () => {
      setBranchName('')
      setDisplayBranchForm(false)
      refetchBranch()
    },
  })

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
          {/* Toggle Branch Status */}
          {branches?.map((branch, index) => {
            return (
              <Row className="justify-between py-1" key={branch.name + index}>
                <Text className="text-lg">{branch.name}</Text>
                <Switch
                  onChange={(v, e) => {
                    e.preventDefault()
                    onChangeBranchActiveStatus(v, branch.branch_uuid)
                  }}
                  value={branch.is_active}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  defaultChecked
                />
              </Row>
            )
          })}

          {/* Create new branch form */}
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
                  onClick={() =>
                    createBranch.mutate({ branchName: branchName })
                  }
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
  const { branches, refetchBranch } = useBranchQuery()

  return (
    <Row className="w-full">
      <ExportPDF branches={branches?.pages[0] || []} />
      <BranchManagement
        branches={branches?.pages[0] || []}
        refetchBranch={refetchBranch}
      />
    </Row>
  )
}

export default BranchMenu
