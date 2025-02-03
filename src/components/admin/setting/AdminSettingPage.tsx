import type { DefaultPageProps } from '@src/types/DefaultType'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
  ConfigProvider,
  theme,
  Flex,
  Divider,
  Typography,
  type TabsProps,
  Tabs,
} from 'antd'
import type React from 'react'
import { useAntdStore } from '@src/store/store'
import BranchMenu from '@src/components/admin/setting/BranchMenu'
import { AdminGuard } from '@src/auth/AuthGuard'
import UserMenu from './UserMenu'
import { useState } from 'react'
import { useAdminRouteGuard } from '@src/hooks/RouteGuard'

const queryClient = new QueryClient()

const { Text } = Typography

const AdminSettingPage: React.FC<DefaultPageProps> = () => {
  const { darkTheme } = useAntdStore((state) => state)
  const [componentKey, setComponentKey] = useState<string>('')
  const [menus] = useState<TabsProps['items']>([
    {
      key: 'branch',
      label: 'Branch',
      children: <BranchMenu />,
    },
    {
      key: 'user',
      label: 'User',
      children: <UserMenu componentKey={componentKey} />,
    },
  ])

  // Guard
  useAdminRouteGuard()

  return (
    <ConfigProvider
      theme={{
        algorithm: darkTheme ? theme.darkAlgorithm : [],
      }}
    >
      <Flex
        gap="middle"
        className="p-3"
        justify="center"
        align="center"
        vertical
      >
        <Flex
          gap="small"
          className="w-2/5"
          justify="center"
          align="start"
          vertical
        >
          <Text className="text-3xl font-bold">Setting</Text>

          <Divider className="border-gray-300 mt-2 mb-2" type="horizontal" />

          <Tabs
            defaultActiveKey="branch"
            items={menus}
            className="w-full"
            size="large"
            onChange={(key) => {
              setComponentKey(key)
            }}
          />
        </Flex>
      </Flex>
    </ConfigProvider>
  )
}

const WrappedAdminSettingPage: React.FC<DefaultPageProps> = (props) => {
  return (
    <AdminGuard>
      <QueryClientProvider client={queryClient}>
        <AdminSettingPage {...props} />
      </QueryClientProvider>
    </AdminGuard>
  )
}

export default WrappedAdminSettingPage
