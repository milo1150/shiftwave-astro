import '@src/style/global.css'
import '@src/style/tailwind.css'

import React, { useState, type ReactNode } from 'react'
import { MessageTwoTone } from '@ant-design/icons'
import { Layout, Menu, theme } from 'antd'

type Props = {
  children: ReactNode
}

const { Sider, Content } = Layout

const AdminLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, _setCollapsed] = useState(true)
  const {
    token: { borderRadiusLG },
  } = theme.useToken()

  return (
    <Layout style={{ height: '100vh' }}>
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
        <Content
          style={{
            // padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
