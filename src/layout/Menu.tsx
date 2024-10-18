"use client"
import useI18n from "@store/i18n/useI18n"
import * as React from "react"
import { Menu } from "antd"
import { BgColorsOutlined, SettingOutlined } from "@ant-design/icons"
import { usePathname, useRouter } from "next/navigation"

type SectionMenuItem = { key: string; icon: React.ReactNode; children: NavigationMenuItem[] }

type NavigationMenuItem = {
  label: string
  key: string
  icon: React.ReactNode
  onClick: () => void
}

const isSectionMenuItem = (menuItem: SectionMenuItem | NavigationMenuItem): menuItem is SectionMenuItem =>
  (menuItem as SectionMenuItem).children !== undefined

const iconStyle = { height: 20, width: 20 }

const MainMenu = () => {
  const i18n = useI18n()
  const router = useRouter()
  const pathName = usePathname()

  const [selectedSubmenu, setSelectedSubmenu] = React.useState("")
  const [selectedMenu, setSelectedMenu] = React.useState("")

  React.useEffect(() => {
    const selectedSubmenu = getMenu()
      .filter(isSectionMenuItem)
      .flatMap((item) => item?.children)
      .map((c) => c.key)
      .find((item) => location.pathname.startsWith("/" + item))

    const selectedMenu = selectedSubmenu
      ? getMenu()
          .filter(isSectionMenuItem)
          .find((m) => m.children.find((c) => c.key === selectedSubmenu))?.key
      : getMenu()
          .map((c) => c.key)
          .find((item) => location.pathname.startsWith("/" + item))

    setSelectedSubmenu(selectedSubmenu ?? "")
    setSelectedMenu(selectedMenu ?? "")
  }, [pathName])

  const getSubMenuItem = (key: string, icon?: React.ReactNode, domain?: string): NavigationMenuItem => ({
    label: i18n.t(`layout.menu.submenu.${key}`),
    key,
    icon: icon,
    onClick: () => {
      router.push(`${domain ? `/${domain}` : ""}/${key}`)
    },
  })

  const getSectionMenuItem = (key: string, icon: React.ReactNode, children: NavigationMenuItem[]): SectionMenuItem =>
    ({
      key,
      icon,
      children,
      label: <div className="font-semibold">{i18n.t(`layout.menu.items.${key}`)}</div>,
    }) as SectionMenuItem

  const getNavigationMenuItem = (key: string, icon: React.ReactNode): NavigationMenuItem =>
    ({
      label: i18n.t(`layout.menu.submenu.${key}`),
      key,
      icon,
      onClick: () => {
        router.push(`/${key}`)
      },
    }) as NavigationMenuItem

  const getMenu = () => [
    getSectionMenuItem("forms", <SettingOutlined style={iconStyle} />, [
      getSubMenuItem("withoutAction", <BgColorsOutlined style={iconStyle} />, "forms"),
      getSubMenuItem("withAction", <BgColorsOutlined style={iconStyle} />, "forms"),
    ]),
    getNavigationMenuItem("serverComponents", <SettingOutlined style={iconStyle} />),
  ]

  return (
    <nav className="flex grow flex-col overflow-auto bg-main-purple px-4">
      <p>{i18n.t("layout.menu.title")}</p>
      <ul role="list" className="flex flex-1 flex-col justify-between">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            <Menu
              key={`${selectedMenu}_${selectedSubmenu}`}
              defaultOpenKeys={[selectedMenu]}
              mode="inline"
              items={getMenu()}
              selectedKeys={[selectedSubmenu]}
            />
          </ul>
        </li>
      </ul>
    </nav>
  )
}
export default MainMenu
