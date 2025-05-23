"use client";
import useI18n from "@store/i18n/useI18n";
import * as React from "react";
import { Menu } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { usePathname, useRouter } from "next/navigation";
import { ComponentToken } from "antd/es/menu/style";
import { AliasToken } from "antd/lib/theme/internal";
import { getColor } from "@src/utils/tailwind";
import {
  ClipboardDocumentListIcon,
  ArchiveBoxIcon,
  ArchiveBoxXMarkIcon,
  ServerStackIcon,
} from "@heroicons/react/24/outline";

type SectionMenuItem = {
  key: string;
  icon: React.ReactNode;
  children: NavigationMenuItem[];
};

type NavigationMenuItem = {
  key: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const isSectionMenuItem = (
  menuItem: SectionMenuItem | NavigationMenuItem,
): menuItem is SectionMenuItem =>
  (menuItem as SectionMenuItem).children !== undefined;

const iconStyle = { height: 20, width: 20 };

export const MenuStyles: Partial<ComponentToken> & Partial<AliasToken> = {
  itemHoverBg: getColor("secondary-purple"), // hover couleur background entrées menu
  itemSelectedColor: getColor("white"), // couleur font menu dont sous menu est sélectionné
  itemSelectedBg: getColor("secondary-purple"), // couleur fond menu/sous-menu sélectionné
  subMenuItemBg: getColor("main-purple"), // couleur background entrées sous-menu
  colorBgContainer: getColor("main-purple"), // couleur background entrées menu
  colorText: getColor("white"), // hover couleur font entrées menu navigables
  fontSize: 15,
  itemColor: getColor("white"), // couleur de la font
  activeBarBorderWidth: 0,
};

const MainMenu = () => {
  const i18n = useI18n();
  const router = useRouter();
  const pathName = usePathname();

  const [selectedSubmenu, setSelectedSubmenu] = React.useState("");
  const [selectedMenu, setSelectedMenu] = React.useState("");

  React.useEffect(() => {
    const selectedSubmenu = getMenu()
      .filter(isSectionMenuItem)
      .flatMap((item) => item?.children)
      .map((c) => c.key)
      .find((item) => pathName.includes("/" + item));

    const selectedMenu = selectedSubmenu
      ? getMenu()
          .filter(isSectionMenuItem)
          .find((m) => m.children.find((c) => c.key === selectedSubmenu))?.key
      : getMenu()
          .map((c) => c.key)
          .find((item) => pathName.startsWith("/" + item));

    setSelectedSubmenu(selectedSubmenu ?? "");
    setSelectedMenu(selectedMenu ?? "");
  }, [pathName]);

  const getSubMenuItem = (
    key: string,
    icon?: React.ReactNode,
    domain?: string,
  ): NavigationMenuItem =>
    ({
      label: i18n.t(`layout.menu.submenu.${key}`),
      key,
      icon: icon,
      onClick: () => {
        router.push(`${domain ? `/${domain}` : ""}/${key}`);
      },
    }) as NavigationMenuItem;

  const getSectionMenuItem = (
    key: string,
    icon: React.ReactNode,
    children: NavigationMenuItem[],
  ): SectionMenuItem =>
    ({
      key,
      icon,
      children,
      label: (
        <div className="font-semibold">
          {i18n.t(`layout.menu.items.${key}`)}
        </div>
      ),
    }) as SectionMenuItem;

  const getNavigationMenuItem = (
    key: string,
    icon: React.ReactNode,
  ): NavigationMenuItem =>
    ({
      label: (
        <div className="font-semibold">
          {i18n.t(`layout.menu.items.${key}`)}
        </div>
      ),
      key,
      icon,
      onClick: () => {
        // La page Home est référencée par /
        router.push(`/${key === "home" ? "" : key}`);
      },
    }) as NavigationMenuItem;

  const getMenu = () => [
    getNavigationMenuItem("home", <HomeOutlined style={iconStyle} />),
    getSectionMenuItem(
      "forms",
      <ClipboardDocumentListIcon style={iconStyle} />,
      [
        getSubMenuItem(
          "withoutAction",
          <ArchiveBoxXMarkIcon style={iconStyle} />,
          "forms",
        ),
        getSubMenuItem(
          "withAction",
          <ArchiveBoxIcon style={iconStyle} />,
          "forms",
        ),
      ],
    ),
    getNavigationMenuItem(
      "serverComponents",
      <ServerStackIcon style={iconStyle} />,
    ),
  ];

  return (
    <nav className="flex grow flex-col overflow-auto bg-main-purple px-4 py-12">
      <ul role="list" className="flex flex-1 flex-col justify-between">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            <Menu
              key={`${selectedMenu}_${selectedSubmenu}`}
              defaultOpenKeys={[selectedMenu]}
              mode="inline"
              items={getMenu()}
              selectedKeys={
                selectedSubmenu ? [selectedSubmenu] : [selectedMenu]
              }
            />
          </ul>
        </li>
      </ul>
    </nav>
  );
};
export default MainMenu;
