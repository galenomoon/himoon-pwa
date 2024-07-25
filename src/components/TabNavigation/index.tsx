import React from "react";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BsBox2Heart, BsBox2HeartFill } from "react-icons/bs";
import {
  PiBell,
  PiBellFill,
  PiHeart,
  PiHeartFill,
  PiUserCircle,
  PiUserCircleFill,
} from "react-icons/pi";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TabNavigator() {
  const pathname = usePathname();

  const tabs = [
    {
      icon: {
        disabled: GoHome,
        active: GoHomeFill,
        props: {
          size: 28,
        },
      },
      label: "Início",
      href: pathname === "/buscar" ? "/" : "/buscar",
    },
    {
      icon: {
        disabled: PiHeart,
        active: PiHeartFill,
        props: {
          size: 28,
        },
      },
      label: "Favoritos",
      href: "/favoritos",
    },
    {
      icon: {
        disabled: BsBox2Heart,
        active: BsBox2HeartFill,
        props: {
          size: 22,
          className: "px-2",
        },
      },
      label: "Meus pedidos",
      href: "/pedidos",
    },
    {
      icon: {
        disabled: PiBell,
        active: PiBellFill,
        props: {
          size: 28,
        },
      },
      label: "Notificações",
      href: "/notificacoes",
    },
    {
      icon: {
        disabled: PiUserCircle,
        active: PiUserCircleFill,
        props: {
          size: 28,
        },
      },
      label: "Perfil",
      href: "/perfil",
    },
  ];

  return (
    <nav className="flex items-center shadow-2xl tabnavigation-shadow justify-around h-24 w-full fixed bottom-0 bg-white">
      {tabs.map((tab, index) => {
        const isActive =
          (pathname === "/buscar" || pathname === "/") &&
          (tab.href === "/" || tab.href === "/buscar")
            ? true
            : pathname === tab.href;
        const Icon = tab.icon[isActive ? "active" : "disabled"];
        const props = tab.icon.props;
        return (
          <Link
            key={index}
            href={tab.href}
            className="flex text-center h-full min-w-16 flex-col pt-2 pb-10 items-center justify-between"
          >
            <div className="h-12 flex items-center justify-center">
              <Icon {...props} className="flex-shrink-0" />
            </div>
            <span className="text-xs whitespace-nowrap">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
