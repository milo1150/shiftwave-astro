import '@src/style/global.css'
import '@src/style/tailwind.css'

import React, { useState, type ReactNode } from 'react'
import { MessageTwoTone } from '@ant-design/icons'
import { Layout, Menu } from 'antd'

type Props = {
  children: ReactNode
}

const { Sider, Content } = Layout

const AdminLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, _setCollapsed] = useState(true)

  return (
    <Layout className="h-lvh">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width="170"
        collapsedWidth="60"
        style={{ background: '#ffffff' }}
      >
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['reviews']}
          style={{ fontFamily: 'Kanit', padding: '4px' }}
          items={[
            {
              key: 'reviews',
              icon: <MessageTwoTone />,
              label: 'Reviews',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content className="bg-gray-100">{children}</Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
