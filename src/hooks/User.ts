import { transformUserDetail } from '@src/dto/User'
import { createUser } from '@src/services/UserService'
import type {
  CreateUserPayload,
  TransformUserDetail,
  UserDetail,
} from '@src/types/User'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const defaultCreateUserForm: CreateUserPayload = {
  u: '',
  pwd: '',
  role: 'user',
  branches: [],
} as const

type UseCreateUserProps = {
  createSuccessCallback: () => void
}

export const useCreateUser = ({
  createSuccessCallback,
}: UseCreateUserProps) => {
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
        createSuccessCallback()
      }
    },
  })

  return {
    createUserForm,
    setCreateUserForm,
    createUserFormModal,
    setCreateUserFormModal,
    onCancelCreateUser,
    createUserMutation,
  }
}

type UseUserFormProps = {
  userDatas: UserDetail[] | undefined
}

export const useUserForm = ({ userDatas }: UseUserFormProps) => {
  const [userForm, setUserForm] = useState<TransformUserDetail[]>([])

  const transformUsersForm = (datas: UserDetail[]) => {
    datas && setUserForm(datas.map((v) => transformUserDetail(v)))
  }

  useEffect(() => {
    if (userDatas) {
      transformUsersForm(userDatas)
    }
  }, [userDatas])

  return { userForm, setUserForm, transformUsersForm }
}
