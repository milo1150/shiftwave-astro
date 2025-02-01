import { useSettingStore } from '@src/store/store'
import type { TransformUserDetail } from '@src/types/User'
import type { DefaultOptionType } from 'antd/es/select'
import { Row, Select, Switch } from 'antd'

type UserFormProps = {
  userForm: TransformUserDetail[]
  setUserForm: React.Dispatch<React.SetStateAction<TransformUserDetail[]>>
  roleOptions: DefaultOptionType[]
}

export const UserForm: React.FC<UserFormProps> = ({
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
                value={user.role === 'admin' ? true : user.active_status}
                disabled={user.role === 'admin'}
                onChange={(activeStatus) => {
                  setUserForm((prev) => {
                    const updatedUsers = [...prev]
                    updatedUsers[rowIndex].active_status = activeStatus
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
                disabled={user.role === 'admin'}
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
