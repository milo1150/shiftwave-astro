import '@src/style/global.css'
import '@src/style/tailwind.css'

import React, { useState, type ReactNode } from 'react'
import {
  MessageFilled,
  SettingFilled,
  MoonFilled,
  LogoutOutlined,
  ScheduleFilled,
} from '@ant-design/icons'
import { Layout, Menu, ConfigProvider, theme } from 'antd'
import { match } from 'ts-pattern'
import { ROUTING, type ShiftwaveRoute } from '@src/resources/route'
import type { AvailableLanguage } from '@src/i18n/i18n'
import { useAntdStore, useUserStore } from '@src/store/store'
import { logout } from '@src/auth/AuthGuard'
import _ from 'lodash'

type Props = {
  children: ReactNode
  lang: AvailableLanguage
  routeMenu: ShiftwaveRoute
}

const { Sider, Content } = Layout

const AdminLayout: React.FC<Props> = ({ children, lang, routeMenu }) => {
  const userProfile = useUserStore((state) => state.userProfile)
  const { darkTheme, toggleDarkTheme } = useAntdStore((state) => state)
  const [collapsed, _setCollapsed] = useState(true)
  const [selectedMenuKey, setSelectedMenuKey] = useState<ShiftwaveRoute[]>([
    routeMenu,
  ])

  return (
    <ConfigProvider
      theme={{
        algorithm: darkTheme ? theme.darkAlgorithm : [],
      }}
    >
      <Layout className="h-lvh">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width="170"
          collapsedWidth="60"
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
                .with('schedule', () => {
                  if (selectedMenuKey[0] === 'schedule') return
                  window.location.href = `/${lang}/d/${ROUTING.schedule}`
                  setSelectedMenuKey(['schedule'])
                })
                .when(
                  (type) => type === 'darktheme',
                  () => toggleDarkTheme()
                )
                .when(
                  (type) => type === 'logout',
                  () => logout()
                )
                .run()
            }}
            items={_([
              {
                key: 'reviews',
                icon: <MessageFilled />,
                label: 'Reviews',
              },
              {
                key: 'schedule',
                icon: <ScheduleFilled />,
                label: 'Schedule',
              },
            ])
              .concat(
                userProfile?.role === 'admin'
                  ? [
                      {
                        key: 'setting',
                        icon: <SettingFilled />,
                        label: 'Setting',
                      },
                    ]
                  : []
              )
              .concat([
                {
                  key: 'darktheme',
                  icon: <MoonFilled />,
                  label: 'Dark theme',
                },
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: 'Logout',
                },
              ])
              .value()}
          />
        </Sider>
        <Layout>
          <Content className={`${darkTheme ? 'bg-black' : 'bg-gray-100'}`}>
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}

export default AdminLayout
