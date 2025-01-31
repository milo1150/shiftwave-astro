import { transformUpdateUserPayload, transformUserDetail } from '@src/dto/User'
import { createUser, fetchUsers, updateUsers } from '@src/services/UserService'
import { useSettingStore } from '@src/store/store'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Divider, Input, Modal, Row, Select, Switch } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import type { DefaultOptionType } from 'antd/es/select'
import React, { useEffect, useState } from 'react'
import type { CreateUserPayload, TransformUserDetail } from '@src/types/User'

type UserFormProps = {
  userForm: TransformUserDetail[]
  setUserForm: React.Dispatch<React.SetStateAction<TransformUserDetail[]>>
  roleOptions: DefaultOptionType[]
}

const UserForm: React.FC<UserFormProps> = ({
  userForm,
  setUserForm,
  roleOptions,
}) => {
  const { branchOptions } = useSettingStore((state) => state)

  return (
    <div>
      {userForm?.map((user, rowIndex) => {
        return (
          <Row
            key={user.user_uuid}
            className="justify-between items-center pb-2"
          >
            <p>{user.username}</p>

            <div>
              <Switch
                className="mr-2"
                value={user.active_status}
                onChange={(v) => {
                  setUserForm((prev) => {
                    const updatedUsers = [...prev]
                    updatedUsers[rowIndex].active_status = v
                    return updatedUsers
                  })
                }}
              ></Switch>
              <Select
                mode="multiple"
                style={{ width: '200px' }}
                className="mr-2"
                placeholder="Select Item..."
                maxTagCount="responsive"
                options={branchOptions()}
                value={user.branches}
                onChange={(_, optionValues) => {
                  setUserForm((prev) => {
                    if (!optionValues) return prev
                    const updatedUsers = [...prev]
                    updatedUsers[rowIndex].branches =
                      optionValues as DefaultOptionType[]
                    return updatedUsers
                  })
                }}
              />
              <Select
                style={{ width: '100px' }}
                placeholder="Select Item..."
                options={roleOptions}
                value={user.role}
                onChange={(roleValue) => {
                  setUserForm((prev) => {
                    const updatedUsers = [...prev]
                    updatedUsers[rowIndex].role = roleValue
                    return updatedUsers
                  })
                }}
              />
            </div>
          </Row>
        )
      })}
    </div>
  )
}

type CreateUserProps = {
  createUserForm: CreateUserPayload
  setCreateUserForm: React.Dispatch<React.SetStateAction<CreateUserPayload>>
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  roleOptions: DefaultOptionType[]
  onCancel: () => void
  onConfirm: () => void
}
const CreateUser: React.FC<CreateUserProps> = ({
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

type UserMenuProps = {}

const UserMenu: React.FC<UserMenuProps> = () => {
  // Const
  const roleOptions: DefaultOptionType[] = [
    { label: 'admin', value: 'admin' },
    { label: 'user', value: 'user' },
  ]

  // Query
  const { data: userDatas, refetch: refetchUsers } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUsers,
  })
  const updateUsersMutation = useMutation({
    mutationFn: updateUsers,
    onSuccess: () => {
      refetchUsers()
    },
  })

  // Users form
  const [userForm, setUserForm] = useState<TransformUserDetail[]>([])
  const transformUsersForm = () => {
    userDatas && setUserForm(userDatas.map((v) => transformUserDetail(v)))
  }
  useEffect(() => {
    if (userDatas) {
      transformUsersForm()
    }
  }, [userDatas])

  // Create User form
  const defaultCreateUserForm: CreateUserPayload = {
    u: '',
    pwd: '',
    role: 'user',
    branches: [],
  } as const
  const [createUserForm, setCreateUserForm] = useState<CreateUserPayload>(
    defaultCreateUserForm
  )
  const [createUserFormModal, setCreateUserFormModal] = useState<boolean>(false)
  const onCancelCreateUser = (): void => {
    setCreateUserForm(defaultCreateUserForm)
    setCreateUserFormModal(false)
  }
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSettled: (status) => {
      if (status === 201) {
        onCancelCreateUser()
      }
    },
  })

  return (
    <>
      <UserForm
        userForm={userForm}
        setUserForm={setUserForm}
        roleOptions={roleOptions}
      />

      <Divider className="my-2" />

      <CreateUser
        createUserForm={createUserForm}
        setCreateUserForm={setCreateUserForm}
        modal={createUserFormModal}
        setModal={setCreateUserFormModal}
        roleOptions={roleOptions}
        onCancel={() => onCancelCreateUser()}
        onConfirm={() => createUserMutation.mutate(createUserForm)}
      />

      <Row className="justify-end pt-2">
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          className="mr-2"
          onClick={() => setCreateUserFormModal(true)}
        >
          Add User
        </Button>
        <Button
          type="primary"
          onClick={() =>
            updateUsersMutation.mutate(transformUpdateUserPayload(userForm))
          }
        >
          Save
        </Button>
      </Row>
    </>
  )
}
export default UserMenu
