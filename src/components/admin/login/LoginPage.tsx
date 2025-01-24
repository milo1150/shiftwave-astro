import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, ConfigProvider, theme } from 'antd'

import type { DefaultPageProps } from '@src/types/DefaultType'
import type React from 'react'
import { useAntdStore } from '@src/store/store'
import { login, setJwtCookie } from '@src/services/UserService'
import _, { trim } from 'lodash'
import { LoginGuard } from '@src/auth/AuthGuard'
import { reviewsUrl } from '@src/utils/location'
import { useState } from 'react'

const queryClient = new QueryClient()

const LoginForm: React.FC = () => {
  const [displayErrorMsg, setDisplayErrorMsg] = useState<boolean>(false)
  const [errorCount, setErrorCount] = useState<number>(0)

  const loginMutation = useMutation({
    retry: false,
    mutationFn: login,
    onSuccess: (res) => {
      // Handle error message
      setDisplayErrorMsg(false)
      setErrorCount(0)

      // Set login token in cookie
      setJwtCookie(res.token)

      // Redirect to main admin page
      window.location.href = reviewsUrl()
    },
    onError: () => {
      setDisplayErrorMsg(true)
      setErrorCount((prev) => (prev += 1))
    },
  })

  const onFinish = (values: { username: string; password: string }) => {
    const { username, password } = values
    const u = trim(username)
    const pwd = trim(password)

    if (u !== '' && pwd !== '') {
      loginMutation.mutate({ u: username, pwd: password })
    }
  }

  return (
    <Form
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      className="w-1/6"
    >
      {/* Username */}
      <Form.Item
        name="username"
        rules={[{ required: true, message: '' }]}
        className="mb-3"
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      {/* Password */}
      <Form.Item
        name="password"
        rules={[{ required: true, message: '' }]}
        className="mb-3"
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      {/* Error message */}
      {displayErrorMsg && (
        <p className="mb-2 text-red-500 text-center">
          try again ... ({errorCount !== 0 && errorCount})
        </p>
      )}

      {/* Login Button */}
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

const LoginPage: React.FC<DefaultPageProps> = () => {
  const { darkTheme } = useAntdStore((state) => state)
  return (
    <ConfigProvider
      theme={{
        algorithm: darkTheme ? theme.darkAlgorithm : [],
      }}
    >
      <div
        className={`flex h-full justify-center items-center ${darkTheme ? 'bg-black' : 'bg-gray-100'}`}
      >
        <LoginForm />
      </div>
    </ConfigProvider>
  )
}

const WrappedLoginPage: React.FC<DefaultPageProps> = (props) => {
  return (
    <LoginGuard>
      <QueryClientProvider client={queryClient}>
        <LoginPage {...props} />
      </QueryClientProvider>
    </LoginGuard>
  )
}

export default WrappedLoginPage
