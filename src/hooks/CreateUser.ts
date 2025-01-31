import { createUser } from '@src/services/UserService'
import type { CreateUserPayload } from '@src/types/User'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

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
