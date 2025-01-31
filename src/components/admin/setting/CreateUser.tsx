import { useSettingStore } from '@src/store/store'
import type { CreateUserPayload } from '@src/types/User'
import { Input, Modal, Select } from 'antd'
import type { DefaultOptionType } from 'antd/es/select'

type CreateUserProps = {
  createUserForm: CreateUserPayload
  setCreateUserForm: React.Dispatch<React.SetStateAction<CreateUserPayload>>
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  roleOptions: DefaultOptionType[]
  onCancel: () => void
  onConfirm: () => void
}

export const CreateUser: React.FC<CreateUserProps> = ({
  createUserForm,
  setCreateUserForm,
  modal,
  roleOptions,
  onCancel,
  onConfirm,
}) => {
  const { branchOptions } = useSettingStore((state) => state)

  return (
    <>
      <Modal
        title="Create User"
        open={modal}
        onOk={() => onConfirm()}
        onCancel={() => onCancel()}
      >
        <Input
          placeholder="username"
          className="mb-2"
          value={createUserForm.u}
          onChange={(e) => {
            setCreateUserForm((form) => {
              return { ...form, u: e.target.value }
            })
          }}
        />
        <Input.Password
          placeholder="password"
          className="mb-2"
          value={createUserForm.pwd}
          onChange={(e) => {
            setCreateUserForm((form) => {
              return { ...form, pwd: e.target.value }
            })
          }}
        />
        <Select
          placeholder="role"
          options={roleOptions}
          className="mb-2 w-full"
          value={createUserForm.role}
          onChange={(e) => {
            setCreateUserForm((form) => {
              return { ...form, role: e }
            })
          }}
        />
        <Select
          mode="multiple"
          className="mb-2 w-full"
          placeholder="branch"
          maxTagCount="responsive"
          options={branchOptions()}
          value={createUserForm.branches}
          onChange={(e) => {
            setCreateUserForm((form) => {
              return { ...form, branches: e }
            })
          }}
        />
      </Modal>
    </>
  )
}
