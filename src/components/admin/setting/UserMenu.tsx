import { transformUpdateUserPayload } from '@src/dto/User'
import { fetchUsers } from '@src/services/UserService'
import { useQuery } from '@tanstack/react-query'
import { Button, Divider, Row } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import type { DefaultOptionType } from 'antd/es/select'
import React, { useEffect } from 'react'
import { UserForm } from '@src/components/admin/setting/UserForm'
import { CreateUser } from '@src/components/admin/setting/CreateUser'
import { useCreateUser, useUserForm } from '@src/hooks/User'

type UserMenuProps = {
  componentKey: string
}

const roleOptions: DefaultOptionType[] = [
  { label: 'admin', value: 'admin' },
  { label: 'user', value: 'user' },
]

const UserMenu: React.FC<UserMenuProps> = ({ componentKey }) => {
  // Query
  const { data: userDatas, refetch: refetchUsers } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUsers,
  })

  // Users form
  const { userForm, setUserForm, transformUsersForm, updateUsersMutation } =
    useUserForm({
      userDatas,
      refetchUsers,
    })

  // Create User
  const {
    createUserForm,
    setCreateUserForm,
    createUserFormModal,
    setCreateUserFormModal,
    onCancelCreateUser,
    createUserMutation,
  } = useCreateUser({ createSuccessCallback: refetchUsers })

  // OnMount
  useEffect(() => {
    if (componentKey === 'user') {
      refetchUsers()
      transformUsersForm(userDatas || [])
    }
  }, [componentKey])

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
