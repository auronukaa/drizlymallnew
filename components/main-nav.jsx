"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";

const MainNav = () => {
  const pathname = usePathname();
  const data = [
    {
      id: 1,
      href: "/produktet",
      title: "Produktet",
      active: pathname === `/produktet`,
    },
  ];
  return (
    <nav className="mx-8 hidden sm:flex items-center space-x-4 lg:space-x-6">
      {data.map((item) => {
        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-black",
              item.active ? "text-black" : "text-neutral-500"
            )}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default MainNav;
