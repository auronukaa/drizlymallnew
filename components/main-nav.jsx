"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";

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
    <nav className="items-center hidden mx-8 space-x-4 sm:flex lg:space-x-6">
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
      {/* <div className="flex items-center justify-center">
        <Input type="text" placeholder="Kerko Produktet ..." />
      </div> */}
    </nav>
  );
};

export default MainNav;
