"use client";

import { AlignLeft, Instagram } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavbarSidebar = () => {
  const pathname = usePathname();
  const data = [
    {
      id: 1,
      href: "/",
      title: "Ballina",
      active: pathname === `/`,
    },
    {
      id: 2,
      href: "/produktet",
      title: "Produktet",
      active: pathname === `/produktet`,
    },
    {
      id: 3,
      href: "/shporta",
      title: "Shporta",
      active: pathname === `/shporta`,
    },
  ];

  return (
    <div className="flex sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <AlignLeft size={25} />
        </SheetTrigger>
        <SheetContent side="left">
          <div className="grid grid-cols-1 gap-y-5 my-10 h-full">
            <div className="flex flex-col gap-y-5">
              {data.map((item) => {
                return (
                  <SheetClose asChild key={item.id}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-2xl font-medium transition-colors hover:text-black",
                        item.active ? "text-black" : "text-neutral-500"
                      )}
                    >
                      {item.title}
                    </Link>
                  </SheetClose>
                );
              })}
            </div>
            <div className="flex flex-col justify-end h-[60%]">
              <div className="flex gap-x-2 items-center">
                <Link
                  href="https://www.instagram.com/drizlymall/"
                  target="_blank"
                  className="bg-neutral-200 rounded-full p-2"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="https://www.facebook.com/profile.php?id=100088688234176&mibextid=LQQJ4d
"
                  target="_blank"
                  className="bg-neutral-200 text-[20px] rounded-full p-2"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    stroke-width="0"
                    viewBox="0 0 512 512"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                  </svg>
                </Link>
              </div>
              <p className="text-left my-3 text-xs text-gray-600">
                &copy; 2023 Drizlymall, Inc. Të gjitha të drejtat të rezervuara
              </p>
              <p className={`font-bold text-2xl tracking-tight`}>
                drizly<span className="text-orange-500">mall</span>
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default NavbarSidebar;
