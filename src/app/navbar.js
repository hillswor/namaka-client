"use client";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "./AppContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);

  const router = useRouter();

  const handleLogout = () => {
    fetch("https://namaka-server.onrender.com/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setUser(null);
        router.push("/");
      } else {
        throw new Error("Unable to logout");
      }
    });
  };

  //Styles

  const navbarContainerStyle =
    "flex justify-between sticky top-0 z-10 bg-slate-600 text-white py-2 px-4 shadow-xl";

  const ulStyle = "flex items-end space-x-6";
  const liStyle =
    "text-white text-md hover:text-red-500 transition duration-200 ease-in-out md:text-lg lg:text-xl xl:text-2xl";

  return user ? (
    <nav className={navbarContainerStyle}>
      <Image
        src="/namaka-logo.svg"
        alt="Nakama Logo"
        width={75}
        height={75}
        priority={true}
        placeholder="blur"
        blurDataURL="/namaka-transparent.svg"
      />
      <ul className={ulStyle}>
        <li className={liStyle}>
          <Link href="/">Home</Link>
        </li>
        <li className={liStyle}>
          <Link href={`/users/${user.id}`}>My Account</Link>
        </li>
        <li className={liStyle}>
          <Link href="/posts">Message Board</Link>
        </li>
        <li onClick={handleLogout} className={liStyle}>
          Logout
        </li>
      </ul>
    </nav>
  ) : (
    <nav className={navbarContainerStyle}>
      <Image
        src="/namaka-logo.svg"
        alt="Nakama Logo"
        width={100}
        height={100}
        className={
          "hover:opacity-80 transition duration-200 ease-in-out cursor-pointer"
        }
      />
      <ul className={ulStyle}>
        <li className={liStyle}>
          <Link href="/">Home</Link>
        </li>
        <li className={liStyle}>
          <Link href="/login">Login</Link>
        </li>
        <li className={liStyle}>
          <Link href="/signup">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}
