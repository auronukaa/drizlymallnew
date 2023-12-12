import Link from "next/link";
import MainNav from "./main-nav";
import { Playfair_Display } from "next/font/google";
import NavbarActions from "./navbar-actions";
import NavbarSidebar from "./navbar-sidebar";
import Image from "next/image";

const font = Playfair_Display({ subsets: ["latin"] });

const Navbar = () => {
  return (
    <div className="border-b fixed inset-0 z-[9999] bg-white h-[64.8px]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="relative h-16 flex items-center">
          <NavbarSidebar />
          <Link href="/" className="ml-auto sm:ml-4 flex lg:ml-0 gap-x-2">
            <p className={`font-bold text-2xl tracking-tight`}>
              drizly<span className="text-[#f96516]">mall</span>
            </p>
          </Link>
          <MainNav />
          <NavbarActions />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
