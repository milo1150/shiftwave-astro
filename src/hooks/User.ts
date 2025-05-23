import { transformUserDetail } from '@src/dto/User'
import {
  createUser,
  getUserProfile,
  updateUsers,
} from '@src/services/UserService'
import { useUserStore } from '@src/store/store'
import type {
  CreateUserPayload,
  TransformUserDetail,
  UserDetail,
} from '@src/types/User'
import {
  useMutation,
  useQuery,
  type QueryObserverResult,
  type RefetchOptions,
} from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const defaultCreateUserForm: CreateUserPayload = {
  u: '',
  pwd: '',
  role: 'user',
  branches: [],
} as const

type UseCreateUserProps = {
  createSuccessCallback: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<UserDetail[], Error>>
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
  refetchUsers: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<UserDetail[], Error>>
}

export const useUserForm = ({ userDatas, refetchUsers }: UseUserFormProps) => {
  const [userForm, setUserForm] = useState<TransformUserDetail[]>([])

  const updateUsersMutation = useMutation({
    mutationFn: updateUsers,
    onSuccess: () => {
      refetchUsers()
    },
  })

  const transformUsersForm = (datas: UserDetail[]) => {
    datas && setUserForm(datas.map((v) => transformUserDetail(v)))
  }

  useEffect(() => {
    if (userDatas) {
      transformUsersForm(userDatas)
    }
  }, [userDatas])

  return { userForm, setUserForm, transformUsersForm, updateUsersMutation }
}

export const useUserProfile = () => {
  const { setUser } = useUserStore((state) => state)
  const { data: userProfile } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
  })

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile)
      console.log(userProfile)
    }
  }, [userProfile])

  return { userProfile }
}
