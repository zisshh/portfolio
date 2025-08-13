"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, title }) => {
  const pathname = usePathname();
  const isActive =
    href === pathname ||
    (href.startsWith("/docs") && pathname.startsWith("/docs"));
  return (
    <Link
      href={href}
      className={`block py-2 pl-3 pr-4 sm:text-xl rounded md:pl-0 hover:text-white ${
        isActive ? "text-white" : "text-[#ADB7BE]"
      }`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
