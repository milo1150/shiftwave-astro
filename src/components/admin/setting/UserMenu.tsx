import {
  transformUpdateUserPayload,
  transformUserDetail,
  type TransformUserDetail,
} from '@src/dto/User'
import { fetchUsers, updateUsers } from '@src/services/UserService'
import { useSettingStore } from '@src/store/store'
import type { UserDetail } from '@src/types/User'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Button, Divider, Row, Select, Switch } from 'antd'
import type { DefaultOptionType } from 'antd/es/select'
import { useEffect, useState } from 'react'

type UserFormProps = {
  userDatas: UserDetail[]
  refetchUsers: () => unknown
}

const UserForm: React.FC<UserFormProps> = ({ userDatas, refetchUsers }) => {
  const [users, setUsers] = useState<TransformUserDetail[]>([])
  const { branchOptions } = useSettingStore((state) => state)
  const roleOptions: DefaultOptionType[] = [
    { label: 'admin', value: 'admin' },
    { label: 'user', value: 'user' },
  ]

  const updateUsersMutation = useMutation({
    mutationFn: updateUsers,
    onSuccess: () => {
      refetchUsers()
    },
  })

  useEffect(() => {
    if (userDatas) {
      setUsers(userDatas.map((v) => transformUserDetail(v)))
    }
  }, [userDatas])

  return (
    <div>
      {users?.map((user, rowIndex) => {
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
                  setUsers((prev) => {
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
                  setUsers((prev) => {
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
                  setUsers((prev) => {
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

      <Divider className="my-2" />

      <Row className="justify-end pt-2">
        <Button
          type="primary"
          onClick={() =>
            updateUsersMutation.mutate(transformUpdateUserPayload(users))
          }
        >
          Save
        </Button>
      </Row>
    </div>
  )
}

type UserMenuProps = {}

const UserMenu: React.FC<UserMenuProps> = () => {
  const { data: userDatas, refetch: refetchUsers } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUsers,
  })

  return (
    <>
      <UserForm userDatas={userDatas || []} refetchUsers={refetchUsers} />
    </>
  )
}
export default UserMenu
