import '@src/style/global.css'
import '@src/style/tailwind.css'

import React, { useEffect, useState, type ReactNode } from 'react'
import { MessageFilled, SettingFilled } from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { match } from 'ts-pattern'
import { ROUTING, type ShiftwaveRoute } from '@src/react/route'
import type { AvailableLanguage } from '@src/i18n/i18n'

type Props = {
  children: ReactNode
  lang: AvailableLanguage
  routeMenu: ShiftwaveRoute
}

const { Sider, Content } = Layout

const AdminLayout: React.FC<Props> = ({ children, lang, routeMenu }) => {
  const [collapsed, _setCollapsed] = useState(true)
  const [selectedMenuKey, setSelectedMenuKey] = useState<ShiftwaveRoute[]>([
    routeMenu,
  ])

  useEffect(() => {
    console.log(selectedMenuKey, lang)
  }, [selectedMenuKey])

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
          selectedKeys={selectedMenuKey}
          style={{ fontFamily: 'Kanit' }}
          className="p-1 place-items-center"
          onClick={(e) => {
            match(e.key as ShiftwaveRoute)
              .with('reviews', () => {
                if (selectedMenuKey[0] === 'reviews') return
                window.location.href = `/${lang}/d/${ROUTING.reviews}`
                setSelectedMenuKey(['reviews'])
              })
              .with('setting', () => {
                if (selectedMenuKey[0] === 'setting') return
                window.location.href = `/${lang}/d/${ROUTING.setting}`
                setSelectedMenuKey(['setting'])
              })
              .run()
          }}
          items={[
            {
              key: 'reviews' as ShiftwaveRoute,
              icon: <MessageFilled />,
              label: 'Reviews',
            },
            {
              key: 'setting' as ShiftwaveRoute,
              icon: <SettingFilled />,
              label: 'Setting',
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
