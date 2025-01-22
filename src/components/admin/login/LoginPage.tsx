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
import { trim } from 'lodash'

const queryClient = new QueryClient()

const LoginForm: React.FC = () => {
  const loginMutation = useMutation({
    retry: false,
    mutationFn: login,
    onSuccess: (res) => {
      setJwtCookie(res.token)
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
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
        className="pb-1"
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
        className="pb-1"
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

interface Props {}

const LoginPage: React.FC<Props> = () => {
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
    <QueryClientProvider client={queryClient}>
      <LoginPage {...props} />
    </QueryClientProvider>
  )
}

export default WrappedLoginPage
