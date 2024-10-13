"use client"
import useI18n from "@store/i18n/useI18n"
import * as React from "react"

// type MenuItem = { key: string; icon: React.ReactNode; children: SubMenuItem[] }

// type SubMenuItem = {
//   label: string
//   key: string
//   icon: React.ReactNode
//   onClick: () => void
// }

const MainMenu = () => {
  const i18n = useI18n()

  // const getSubMenuItem = (key: string, icon?: React.ReactNode, path?: string): SubMenuItem => ({
  //   label: i18n.t(`layout.menu.submenu.${key}`),
  //   key,
  //   icon: icon,
  //   onClick: () => go({ to: path ?? `/${key}` }),
  // })

  // const getMenuItem = (key: string, icon?: React.ReactNode, children?: SubMenuItem[]): MenuItem =>
  //   ({
  //     key,
  //     icon,
  //     children,
  //     label: <div className="font-semibold">{i18n.t(`layout.menu.items.${key}`)}</div>,
  //   }) as MenuItem

  return (
    <nav className="flex grow flex-col overflow-auto bg-main-purple px-4">
      <p>{i18n.t("layout.mainMenu.title")}</p>
    </nav>
  )
}
export default MainMenu
